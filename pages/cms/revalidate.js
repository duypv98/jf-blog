import dynamic from "next/dynamic";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { revalidate } from "../../app/cms-slices/cms-revalidate.slice";

const CMSLayout = dynamic(() => import("../../components/CMSLayout"), { ssr: false });

const CMSRevalidatePage = () => {
  const { handleSubmit, reset, register } = useForm();
  const dispatch = useDispatch();
  const revalidating = useSelector((state) => state.cmsRevalidateState.revalidating);

  const clickRevalidate = (data) => {
    /** @type {string} */
    const _path = data.path;
    if (!_path) return;
    const path = _path.startsWith("/") ? _path : `/${_path}`;
    dispatch(revalidate(path));
    reset();
  }

  return <CMSLayout>
    <Container>
      <Form onSubmit={handleSubmit(clickRevalidate)}>
        <Form.Group controlId="revalidate-path">
          <Form.Label>Revalidate Path</Form.Label>
          <div className="d-flex align-items-center" style={{ columnGap: "10px" }}>
            <Form.Control
              type="text"
              placeholder="/path"
              {...register("path")}
            />
            <Button type="submit" disabled={revalidating}>Revalidate</Button>
          </div>
        </Form.Group>
      </Form>
    </Container>
  </CMSLayout>
}

export default CMSRevalidatePage;