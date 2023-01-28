import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import categoryServices from "../backend/services/category";
import postServices from "../backend/services/post";
import CustomPagination from "../components/CustomPagination";
import PostPreview from "../components/PostPreview";
import { CMS_POST_LIMIT, mapSeriesName, Router } from "../utils/config";

const PageLayout = dynamic(() => import("../components/PageLayout"), { ssr: false });
/**
 *
 * @param {{
 *  total: number;
 *  posts: Array<import("../app/apis/post.api").Post>;
 *  page: number;
 *  category: string;
 * }} props
 */
const AllPostsPage = (props) => {
  const {
    total,
    posts,
    page,
    category
  } = props;

  const router = useRouter();

  const handleChangeCategory = (c) => {
    const query = {};
    if (c) query.category = c;
    router.push({
      pathname: Router.POSTS,
      query: { category: c }
    })
  }

  return <PageLayout disableHeader>
    <Container className="mt-3">
      <Row>
        <Col md={3}>
          <Stack className="d-flex flex-column" gap={2}>
            <Button
              variant={!category ? "secondary" : "light"} className="width-100pc border"
              onClick={() => handleChangeCategory(null)}
            >
              <b>All Posts</b>
            </Button>
            {Object.keys(mapSeriesName).map((slug, i) => <Button
              key={i} variant={category === slug ? "secondary" : "light"}
              onClick={() => handleChangeCategory(slug)}
            >
              {mapSeriesName[slug]}
            </Button>)}
            <Button
              variant={category === "uncategorized" ? "secondary" : "light"} className="width-100pc"
              onClick={() => handleChangeCategory("uncategorized")}
            >
              Uncategorized
            </Button>
          </Stack>
        </Col>

        <Col md={9}>
          <h1 className="mt-2">Posts List</h1>
          {posts.length
            ? <>
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
                    /** @type {*} */
                    const query = {};
                    if (category) query.category = category;
                    query.page = page;
                    router.push({
                      pathname: Router.POSTS,
                      query
                    })
                  }}
                />
              </div>
            </>
            : <>No Data</>}
        </Col>
      </Row>
    </Container>
  </PageLayout>
}

export const getServerSideProps = async ({ query }) => {
  const {
    page: _pageQuery,
    category: _category
  } = query;
  const pageQuery = typeof _pageQuery === "string" && !isNaN(+_pageQuery)
    ? (+_pageQuery || 1)
    : 1;
  const categorySlug = typeof _category === "string" && Object.keys(mapSeriesName).includes(_category)
    ? _category
    : (_category === "uncategorized" ? _category : undefined);

  const categories = await categoryServices.getAll();
  let category = null;
  if (categorySlug && categorySlug !== "uncategorized") {
    category = categories.find((c) => c.slug === categorySlug);
    if (!category) {
      return {
        notFound: true
      }
    }
  }

  const {
    data: posts,
    total
  } = await postServices.getList({
    skip: (pageQuery - 1) * CMS_POST_LIMIT,
    limit: CMS_POST_LIMIT,
    sortBy: "createdAt",
    asc: false,
    category: categorySlug === "uncategorized" ? null : category?._id
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
      posts,
      category: categorySlug || null
    }
  }
}

export default AllPostsPage;
