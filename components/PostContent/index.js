import { Col, Container, Row } from "react-bootstrap";
import "./style.scss";

/**
 *
 * @param {import("react").PropsWithoutRef<{ content: string; }>} props
 */
const PostContent = (props) => {
  const { content } = props;

  return <article className="mb-4 post-content">
    <Container className="px-4 px-lg-5">
      <Row className="gx-4 gx-lg-5 justify-content-center">
        <Col md={10} lg={8} xl={7} dangerouslySetInnerHTML={{ __html: content }} />
      </Row>
    </Container>
  </article>
}

export default PostContent;