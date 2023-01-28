import { Col, Container, Row } from "react-bootstrap";
import PostPreview from "../PostPreview";
import Link from "next/link";
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
          return <Col key={post._id} xs={12} md={6} className="mb-3">
            <PostPreview post={post} />
          </Col>
        })}
      </Row>

      <div className="page-link-center d-flex justify-content-center mt-3">
        <Link href="/all-posts">&gt;&gt;&gt;&nbsp;View all</Link>
      </div>
    </Container>
  </div>
}

export default HomePageView;