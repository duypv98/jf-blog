import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../app/cms-slices/cms-category.slice";
import { loadPosts, setPostListPage, setTotalPosts } from "../../app/cms-slices/cms-posts.slice";
import postServices from "../../backend/services/post";
import CMSPostView from "../../components/cms-post-view";
import { CMS_POST_LIMIT } from "../../utils/config";

const CMSLayout = dynamic(() => import("../../components/CMSLayout"), { ssr: false });

const CMSMainPage = (props) => {
  const { total, page, posts } = props;
  const categoryLoading = useSelector((state) => state.cmsCategoryState.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts(posts));
    dispatch(setTotalPosts(total));
    dispatch(setPostListPage(page));
  }, []);

  useEffect(() => {
    if (categoryLoading) {
      dispatch(fetchCategories());
    }
  }, [categoryLoading]);

  return <CMSLayout>
    <CMSPostView />
  </CMSLayout>
}

export const getServerSideProps = async ({ query }) => {
  const _pageQuery = query.page;
  const pageQuery = typeof _pageQuery === "string" && !isNaN(+_pageQuery)
    ? (+_pageQuery || 1)
    : 1;

  const {
    data: posts,
    total
  } = await postServices.getList({
    skip: (pageQuery - 1) * CMS_POST_LIMIT,
    limit: CMS_POST_LIMIT,
    sortBy: "createdAt",
    asc: false
  });

  const maxPages = Math.ceil(total / CMS_POST_LIMIT) || 1;
  if (pageQuery > maxPages) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      total,
      page: pageQuery,
      posts
    }
  }
}

export default CMSMainPage;