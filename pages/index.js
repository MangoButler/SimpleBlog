import { Fragment } from "react";
import Hero from "../components/home-page/Hero";
import FeaturedPosts from "../components/home-page/FeaturedPosts";
import { getFeaturedPosts } from "../helpers/post-utils";
import Head from "next/head";

function HomePage(props) {
  if (!props.posts || props.posts.length === 0) {
    return <h1>No posts at the moment!</h1>;
  }

  return (
    <Fragment>
      <Head>
        <title>Simple Blog | Home</title>
        <meta
          name="description"
          content="See all the featured Posts on a variety of topics, something to read when theres nothing else to do."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: { posts: featuredPosts },
    revalidate: 3600,
  };
}

export default HomePage;
