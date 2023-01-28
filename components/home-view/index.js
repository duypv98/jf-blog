import moment from "moment";
import { Col, Container, Row } from "react-bootstrap";
import PostPreview from "../PostPreview";
import "./style.scss";

/**
 *
 * @param {{
 *  latestPosts: Array<import("../../app/apis/post.api").Post>;
 * }} props
 */
const HomePageView = (props) => {
  const { latestPosts } = props;
  return <div id="index">
    <Container>
      <div className="page-heading">Latest Posts</div>
      <Row>
        {latestPosts.map((post) => {
          return <Col xs={12} className="mb-3">
            <PostPreview post={post} />
          </Col>
        })}
      </Row>
    </Container>
  </div>
}

export default HomePageView;