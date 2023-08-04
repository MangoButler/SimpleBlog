import { getAllposts } from "../../../dummyPosts";
import PostHeader from "./PostHeader";
import classes from './PostContent.module.css';

function PostContent() {
  const post = getAllposts()[0];
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      {post.content}
    </article>
  );
}
export default PostContent;
