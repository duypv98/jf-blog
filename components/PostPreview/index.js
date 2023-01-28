import moment from "moment";
import Link from "next/link";
import "./style.scss";

/**
 *
 * @param {import("react").PropsWithoutRef<{ post: import("../../app/apis/post.api").Post }>} props
 */
const PostPreview = (props) => {
  const { post } = props;

  return <div className="post-preview">
    <Link href={`/${post.slug}`} passHref>
      <a>
        <h2 className="post-title">{post.title}</h2>
        <h3 className="post-subtitle dot-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        <p className="post-meta">
          {moment(new Date(post.createdAt)).format("[on] MMMM DD, YYYY")}
        </p>
      </a>
    </Link>
  </div>
}

export default PostPreview;