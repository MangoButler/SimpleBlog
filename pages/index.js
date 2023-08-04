import { Fragment } from "react";
import Hero from "../components/home-page/Hero";
import FeaturedPosts from "../components/home-page/FeaturedPosts";
import { getAllposts } from "../dummyPosts";


const dummyPosts = getAllposts();

function HomePage() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={dummyPosts} />
    </Fragment>
  );
}

export default HomePage;
