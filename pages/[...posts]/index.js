/**
 *
 * @param {{
 *  root: string | undefined;
 *  category: string | undefined;
 *  post: string | undefined
 * }} props
 * @returns
 */
const PostPage = (props) => {
  const { root, category, post } = props;
  return (
    <div>Post</div>
  )
}

/**
 *
 * @param {import('next').GetServerSidePropsContext} context
 */
export const getServerSideProps = (context) => {
  const [root = null, category = null, post = null] = Array.from(context.query.posts);

  return {
    props: {
      root, category, post
    }
  }
}

export default PostPage;
