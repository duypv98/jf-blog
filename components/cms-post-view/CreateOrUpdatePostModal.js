import { unwrapResult } from "@reduxjs/toolkit";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createPost, updatePostById } from "../../app/cms-slices/cms-posts.slice";
import { getSlug } from "../../utils/format";
import CKEditor from "../editor/CKEditor4";
import RadioForm from "../form/RadioForm";
/**
 *
 * @param {{
 *  show: boolean;
 *  onHide?: () => void;
 * }} props
 */
const CreateOrUpdatePostModal = (props) => {
  const { show, onHide = () => { } } = props;
  const currentPost = useSelector((state) => state.cmsPostState.currentPost);
  const categories = useSelector((state) => state.cmsCategoryState.categories);
  const { register, handleSubmit, getValues, setValue, reset, control } = useForm({ defaultValues: { ...currentPost, category: currentPost.category || "null" } });
  const dispatch = useDispatch();

  const [mapChanged, setMapChanged] = useState({});

  useEffect(() => {
    return () => {
      setMapChanged({});
      reset();
    }
  }, []);

  const markChanged = (key) => {
    setMapChanged((prev) => ({ ...prev, [key]: true }));
  }

  const handleSave = (post) => {
    const postData = {
      ...post,
      category: post.category === "null" ? null : post.category,
    }
    if (currentPost._id) {
      // Update
      const update = _.pickBy(postData, (_, key) => !!mapChanged[key]);
      if (_.isEmpty(update)) {
        toast("Successfully!", { type: "success" });
        onHide();
      } else {
        dispatch(updatePostById({
          _id: currentPost._id,
          ...update
        }))
          .then(unwrapResult)
          .then((data) => {
            if (data) {
              toast("Successfully!", { type: "success" });
            } else {
              toast("Can't update!", { type: "error" })
            }
          })
          .finally(() => {
            onHide();
          })
      }
    } else {
      // Create
      dispatch(createPost(postData))
        .then(unwrapResult)
        .then((data) => {
          if (data) {
            toast("Successfully!", { type: "success" });
          } else {
            toast("Can't create!", { type: "error" })
          }
        })
        .finally(() => {
          onHide();
        });
    }
  }

  return <Modal
    show={show}
    onHide={onHide}
    centered
    dialogClassName="create-or-update-post-modal"
    enforceFocus={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>{currentPost._id ? "Edit" : "Create"}</Modal.Title>
    </Modal.Header>

    <Form onSubmit={handleSubmit(handleSave)}>
      <Modal.Body>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="post-title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text" required placeholder="Post title..."
                {...register("title", { required: true })}
                onChange={(e) => {
                  setValue("slug", getSlug(e.target.value));
                  markChanged("title");
                  markChanged("slug");
                }}
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="post-slug">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                {...register("slug")}
                onChange={() => {
                  markChanged("slug");
                }}
              />
            </Form.Group>
          </Col>

          <Col sm={12}>
            <Form.Group>
              <Form.Label>Excerpt</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={3}
                placeholder="Post Excerpt"
                {...register("excerpt")}
                onChange={() => {
                  markChanged("excerpt");
                }}
              />
            </Form.Group>
          </Col>

          <Col sm={12}>
            <Form.Group>
              <Form.Label>Content</Form.Label>
              <Controller
                control={control}
                name="content"
                defaultValue={currentPost.content}
                render={({ field }) => <CKEditor
                  value={field.value}
                  ref={field.ref}
                  onChange={(value) => {
                    markChanged("content");
                    field.onChange(value);
                  }}
                />}
              />
            </Form.Group>
          </Col>

        </Row>

        <Row>
          <Col sm={6}>
            <Form.Group controlId="post-scope">
              <Form.Label>Scope</Form.Label>
              <Controller
                control={control}
                name="isPrivate"
                defaultValue={!!currentPost.isPrivate}
                render={({ field }) => <RadioForm
                  defaultChecked={JSON.stringify((currentPost.isPrivate || false))}
                  options={[
                    { label: "Public", value: "false" },
                    { label: "Private", value: "true" }
                  ]}
                  onChange={(checked) => {
                    markChanged("isPrivate");
                    const _checked = !!JSON.parse(checked);
                    field.onChange(_checked);
                    if (_checked) {
                      // Private
                      setValue("slug", ""); // Clear Slug
                    } else {
                      const title = getValues("title");
                      setValue("slug", getSlug(title))
                    }
                    markChanged("slug");
                  }}
                />}
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group controlId="post-category">
              <Form.Label>Category</Form.Label>
              <Form.Select {...register("category")} onChange={() => {
                markChanged("category");
              }}>
                <option value="null">Uncategorized</option>
                {categories.map((c) => <option key={c._id} value={c._id}>
                  {c.title}
                </option>)}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
}

export default CreateOrUpdatePostModal;