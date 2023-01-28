import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { Badge, Button, Container, OverlayTrigger, Spinner, Table, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deletePostById, fetchCurrentPostById, setCurrentPost, setOpenCreateOrUpdatePostModal } from "../../app/cms-slices/cms-posts.slice";
import { CMS_POST_LIMIT } from "../../utils/config";
import ConfirmDialog from "../ConfirmDialog";
import CustomPagination from "../CustomPagination";
import DeleteFilled from "../icons/DeleteFilled";
import EditFilled from "../icons/EditFilled";
import CreateOrUpdatePostModal from "./CreateOrUpdatePostModal";
import "./style.scss";

const CMSPostView = () => {
  const { currentPost, openCreateOrUpdatePostModal, posts, loading, total, page, mapPost } = useSelector((state) => state.cmsPostState);
  const categories = useSelector((state) => state.cmsCategoryState.categories);
  const dispatch = useDispatch();
  const router = useRouter();

  const openModal = useMemo(() => !!currentPost && openCreateOrUpdatePostModal, [currentPost, openCreateOrUpdatePostModal]);

  const [triggeredDelete, setTriggeredDelete] = useState(null);

  const handleClickCreate = () => {
    dispatch(setCurrentPost({}));
    dispatch(setOpenCreateOrUpdatePostModal(true));
  }

  const handleClickEditPost = (postId) => {
    if (mapPost[postId]) {
      dispatch(setCurrentPost(mapPost[postId]));
      dispatch(setOpenCreateOrUpdatePostModal(true));
    } else {
      dispatch(fetchCurrentPostById({ id: postId, showEditModal: true }));
    }
  }

  const handleCloseModal = () => {
    dispatch(setCurrentPost(null));
    dispatch(setOpenCreateOrUpdatePostModal(false));
  }

  const handleDeletePost = (id) => {
    dispatch(deletePostById(id));
    toast("Deleted!", { type: "info" });
    setTriggeredDelete(null);
  }

  const renderPagination = useCallback(() => {
    console.log("render");
    return <div className="post-pagination">
      <CustomPagination
        count={total}
        page={page}
        itemsPerPage={CMS_POST_LIMIT}
        onChangePage={(page) => {
          router.push({
            pathname: "/cms",
            query: { page }
          })
        }}
      />
    </div>
  }, [total, page, CMS_POST_LIMIT])

  return <Container id="cms-post-view">
    {loading
      ? <Spinner />
      : <>
        <div className="post-menu">
          <OverlayTrigger overlay={<Tooltip>Create new post!</Tooltip>}>
            <Button variant="dark" onClick={handleClickCreate}>Create</Button>
          </OverlayTrigger>
        </div>

        {renderPagination()}

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Scope</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Modified At</th>
              <th style={{ width: "100px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post, i) => {
              const category = categories.find((c) => c._id === post.category);
              return <tr key={post._id}>
                <td>{(page - 1) * CMS_POST_LIMIT + i + 1}</td>
                <td>{post.title}</td>
                <td>{post.slug}</td>
                <td>
                  <Badge bg={post.isPrivate ? "danger" : "success"}>{post.isPrivate ? "Private" : "Public"}</Badge>
                </td>
                <td>
                  {category?.title || "Uncategorized"}
                </td>
                <td>{moment(new Date(post.createdAt)).format("YYYY-MM-DD HH:mm:ss")}</td>
                <td>{moment(new Date(post.updatedAt)).format("YYYY-MM-DD HH:mm:ss")}</td>
                <td style={{ display: "flex", columnGap: "4px" }}>
                  <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                    <Button size="sm" variant="light"
                      onClick={() => handleClickEditPost(post._id)}
                    >
                      <EditFilled />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                    <ConfirmDialog
                      show={triggeredDelete === post._id}
                      popoverId={`confirm-delete-${post._id}`}
                      title="Confirm Delete?"
                      body={<p>Are you sure to delete post: <b>{post.title}</b>?</p>}
                      onClose={() => {
                        setTriggeredDelete(null);
                      }}
                      onConfirm={() => {
                        handleDeletePost(post._id)
                      }}
                    >
                      <Button size="sm" variant="light" onClick={() => {
                        setTriggeredDelete(post._id);
                      }}><DeleteFilled /></Button>
                    </ConfirmDialog>
                  </OverlayTrigger>
                </td>
              </tr>
            })}
          </tbody>
        </Table>

        {renderPagination()}

        {openModal && <CreateOrUpdatePostModal
          show
          onHide={handleCloseModal}
        />}
      </>}
  </Container>;
}

export default CMSPostView;