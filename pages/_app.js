import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/Layout";
import { NotificationContextProvider } from "../store/notification-context";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <title>Simple Blog</title>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <meta
              name="description"
              content="Just a small blog page, simple but charming."
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
