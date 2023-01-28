import moment from "moment";
import postServices from "../../backend/services/post";
import PageLayout from "../../components/PageLayout";
import PostContent from "../../components/PostContent";

const SeriesPage = (props) => {
  const {
    isPost,
    post
  } = props;

  return isPost ? <PageLayout
    headerTitle={post?.title}
    headerSubTitle={post?.excerpt}
    headerMeta={moment(post?.createdAt).format("MMMM DD, YYYY")}
  >
    <PostContent content={post?.content} />
  </PageLayout>
    : <>SERIES</>
}

/**
 *
 * @param {import("next").GetStaticPathsContext} context
 * @returns {import("next").GetStaticPathsResult}
 */
export const getStaticPaths = async (context) => {
  const series = ["fe", "be", "devops"];
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
  if (["fe, be, devops"].includes(series)) {
    isPost = false;
  } else {
    post = await postServices.getBySlug(series);
  }
  return {
    props: {
      isPost,
      post
    }
  }
}

export default SeriesPage;