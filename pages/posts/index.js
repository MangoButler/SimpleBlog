import { Fragment } from "react";
import AllPosts from "../../components/posts/AllPosts";
import { getAllposts } from "../../helpers/post-utils";
import Head from "next/head";

function AllPostsPage(props) {
  if (!props.posts || props.posts.length === 0) {
    return <h1>No posts at the moment!</h1>;
  }

  return (
    <Fragment>
      <Head>
        <title>Simple Blog | All Posts</title>
        <meta name="description" content="Browse our Posts!" />
      </Head>

      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const allPosts = getAllposts();

  return {
    props: { posts: allPosts },
    revalidate: 3600,
  };
}

export default AllPostsPage;
