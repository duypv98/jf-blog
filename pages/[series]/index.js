import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../app/slices/post.slice";
import categoryServices from "../../backend/services/category";
import postServices from "../../backend/services/post";
import CustomPagination from "../../components/CustomPagination";
import PageLayout from "../../components/PageLayout";
import PostContent from "../../components/PostContent";
import PostPreview from "../../components/PostPreview";
import { mapSeriesName } from "../../utils/config";

const SeriesPage = (props) => {
  const {
    isPost,
    post,
    category
  } = props;

  const loading = useSelector((state) => state.postState.loading);
  const posts = useSelector((state) => state.postState.posts);
  const total = useSelector((state) => state.postState.total);
  const page = useSelector((state) => state.postState.page);

  const dispatch = useDispatch();
  const router = useRouter();
  const _pageQuery = router.query.page;
  const pageQuery = useMemo(() => (typeof _pageQuery === "string" && !isNaN(+_pageQuery)
    ? (+_pageQuery || 1)
    : 1), [_pageQuery]);

  useEffect(() => {
    if (!isPost) {
      dispatch(fetchPosts({
        page: pageQuery,
        category: category?._id
      }));
    }
  }, [pageQuery, isPost, category?._id]);

  return isPost ? <PageLayout
    headerTitle={post?.title}
    headerSubTitle={post?.excerpt}
    headerMeta={moment(post?.createdAt).format("MMMM DD, YYYY")}
  >
    <PostContent content={post?.content} />
  </PageLayout> : <PageLayout
    headerTitle={category?.title}
    headerSubTitle={category?.tag}
  >
    <Container>
      <h2>Posts List</h2>
      {loading
        ? <Spinner />
        : <>
          <Row>
            {posts.map((post) => {
              return <Col sm={6} key={post._id}>
                <PostPreview post={post} />
              </Col>
            })}
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <CustomPagination
              count={total}
              page={page}
              onChangePage={(page) => {
                router.push({
                  pathname: `/${category.slug}`,
                  query: {
                    page
                  }
                })
              }}
            />
          </div>
        </>}
    </Container>
  </PageLayout>
}

/**
 *
 * @param {import("next").GetStaticPathsContext} context
 * @returns {import("next").GetStaticPathsResult}
 */
export const getStaticPaths = async (context) => {
  const series = Object.keys(mapSeriesName);
  const paths = [];
  series.forEach((s) => {
    context.locales.forEach((locale) => {
      paths.push({ params: { series: s }, locale })
    })
  })
  return {
    fallback: "blocking",
    paths
  };
}

/**
 *
 * @param {import("next").GetStaticPropsContext} context
 * @returns {import("next").GetStaticPropsResult}
 */
export const getStaticProps = async (context) => {
  const series = context.params.series;
  let isPost = true;
  let post = null;
  let category = null;
  if (Object.keys(mapSeriesName).includes(series)) {
    isPost = false;
    category = await categoryServices.getBySlug(series);
  } else {
    post = await postServices.getBySlug(series);
  }
  return {
    props: {
      isPost,
      post,
      category
    }
  }
}

export default SeriesPage;