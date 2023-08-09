import Head from "next/head";
import ContactForm from "../components/contact/contact-form";
import { Fragment } from "react";

function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Simple Blog | Contact</title>
        <meta name="description" content="Got questions? Feel free to ask!" />
      </Head>
      <ContactForm />
    </Fragment>
  );
}

export default ContactPage;
