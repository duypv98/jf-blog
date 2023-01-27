import { useMemo } from "react";
import { Button, Container, OverlayTrigger, Spinner, Table, Tooltip } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCategory, setOpenCreateOrUpdateCategoryModal } from "../../app/cms-slices/cms-category.slice";
import CreateOrUpdateCategoryModal from "./CreateOrUpdateCategoryModal";
import "./style.scss";

const CMSCategoryView = () => {
  const { currentCategory, openCreateOrUpdateCategoryModal, categories, loading } = useSelector((state) => state.cmsCategoryState);
  const dispatch = useDispatch();

  const openModal = useMemo(() => !!currentCategory && openCreateOrUpdateCategoryModal, [currentCategory, openCreateOrUpdateCategoryModal]);

  const handleClickCreate = () => {
    dispatch(setCurrentCategory({}));
    dispatch(setOpenCreateOrUpdateCategoryModal(true));
  }

  const handleCloseModal = () => {
    dispatch(setCurrentCategory(null));
    dispatch(setOpenCreateOrUpdateCategoryModal(false));
  }

  return <Container id="cms-category-view">
    {loading
      ? <Spinner />
      : <>
        <div className="category-menu">
          <OverlayTrigger placement="auto" overlay={<Tooltip>Create new category</Tooltip>}>
            <Button variant="dark" onClick={handleClickCreate}>Create</Button>
          </OverlayTrigger>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Tag</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Uncategorized</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            {categories.map((category, i) => {
              return <tr key={i}>
                <td>{i + 2}</td>
                <td>{category.title}</td>
                <td>{category.slug}</td>
                <td>{category.tag}</td>
              </tr>
            })}
          </tbody>
        </Table>

        {openModal && <CreateOrUpdateCategoryModal
          show
          onHide={handleCloseModal}
        />}
      </>}
  </Container>
}

export default CMSCategoryView;