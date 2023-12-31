import { Fragment, useContext, useEffect, useState } from "react";
import Head from "next/head";
import PostContent from "../../components/posts/post-detail/PostContent";
import { getPostData, getPostsFiles } from "../../helpers/post-utils";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingAlert from "../../components/ui/LoadingAlert";
import NotificationContext from "../../store/notification-context";

function PostDetailPage(props) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth");
        notificationCtx.showNotification({
          title: "Login required",
          message: 'Please log in to see this content',
          status: "error",
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <LoadingAlert />;
  }
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: { post: postData },
    revalidate: 1800,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();
  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
