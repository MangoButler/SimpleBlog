import AllPosts from "../../components/posts/AllPosts";
import { getAllposts } from "../../dummyPosts";

function AllPostsPage() {
  const allPosts = getAllposts();

  if (!allPosts || allPosts.length === 0) {
    return <h1>No posts at the moment!</h1>
  }

  return <AllPosts  posts={allPosts}/>;
}

export default AllPostsPage;
