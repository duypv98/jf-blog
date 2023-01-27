import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategory } from "../../app/cms-slices/cms-category.slice";
import { getSlug } from "../../utils/format";

/**
 *
 * @param {{
 *  show: boolean;
 *  onHide?: () => void;
 * }} props
 */
const CreateOrUpdateCategoryModal = (props) => {
  const { show, onHide } = props;
  const currentCategory = useSelector((state) => state.cmsCategoryState.currentCategory);
  const { register, handleSubmit, setValue, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      reset();
    }
  }, []);

  const handleSave = (category) => {
    dispatch(createCategory(category))
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
      })
  }

  return <Modal
    show={show}
    onHide={onHide}
  >
    <Modal.Header closeButton>
      <Modal.Title>{currentCategory._id ? "Edit" : "Create"}</Modal.Title>
    </Modal.Header>

    <Form onSubmit={handleSubmit(handleSave)}>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="category-title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" required placeholder="Example Title" {...register("title", { required: true })}
            onChange={(e) => {
              setValue("slug", getSlug(e.target.value));
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category-slug">
          <Form.Label>Slug</Form.Label>
          <Form.Control type="text" required placeholder="Slug" {...register("slug", { required: true })} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category-tag">
          <Form.Label>Tag</Form.Label>
          <Form.Control type="text" placeholder="Tags..." {...register("tag")} />
        </Form.Group>
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

export default CreateOrUpdateCategoryModal;