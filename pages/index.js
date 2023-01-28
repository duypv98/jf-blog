import postServices from "../backend/services/post";
import HomePageView from "../components/home-view";
import PageLayout from '../components/PageLayout';
import useTrans from '../hooks/useTrans';

/**
 *
 * @param {{
 *  posts: Array<import("../app/apis/post.api").Post>
 * }} props
 * @returns
 */
const Index = (props) => {
  const trans = useTrans();
  const { posts } = props;

  return (
    <PageLayout
      headerTitle={trans.index.title}
      headerSubTitle={trans.index.subTitle}
      isSiteHeader
    >
      <HomePageView latestPosts={posts} />
    </PageLayout>
  );
}

export const getStaticProps = async () => {
  const { data: posts } = await postServices.getList({
    skip: 0, limit: 4,
    sortBy: "createdAt", asc: false
  });
  return {
    props: {
      posts
    }
  }
}

export default Index;
