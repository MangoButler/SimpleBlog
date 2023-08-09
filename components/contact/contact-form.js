import classes from "./contact-form.module.css";
import { useContext, useEffect, useState } from "react";
import { validateEmail, validateMessage } from "../../helpers/validators";
import NotificationContext from "../../store/notification-context";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const notificationCtx = useContext(NotificationContext);

  async function sendMessageHandler(event) {
    event.preventDefault();
    if (
      !enteredEmail ||
      !validateEmail(enteredEmail) ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredMessage ||
      !validateMessage(enteredMessage)
    ) {
      setIsInvalid(true);
      return;
    }
    notificationCtx.showNotification({
      title: "Sending",
      message: "Message is being sent",
      status: "pending",
    });

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });

      notificationCtx.showNotification({
        title: "Success",
        message: "Message sent successfully",
        status: "success",
      });
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error",
        message: error.message || "Something went wrong",
        status: "error",
      });
    }
    setIsInvalid(false);
  }

  return (
    <section className={classes.contact}>
      <h1>Feel free to reach out!</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            rows={5}
            required
            id="message"
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          />
        </div>
        {isInvalid && (
          <p className={classes.error}>
            Please enter a valid email, name and real message.
          </p>
        )}
        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;

// function sendMessageHandler(event) {
//     event.preventDefault();
//     if (
//       !enteredEmail ||
//       !validateEmail(enteredEmail) ||
//       !enteredName ||
//       enteredName.trim() === "" ||
//       !enteredMessage ||
//       !validateMessage(enteredMessage)
//     ) {
//       setIsInvalid(true);
//       return;
//     }
//     notificationCtx.showNotification({
//       title: "Sending",
//       message: "Message is being sent",
//       status: "pending",
//     });

//     fetch("/api/contact", {
//       method: "POST",
//       body: JSON.stringify({
//         email: enteredEmail,
//         name: enteredName,
//         message: enteredMessage,
//       }),
//       headers: {
//         "Content-type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         return response.json().then((data) => {
//           throw new Error(data.message || "something went wrong");
//         });
//       })
//       .then((data) => {
//         notificationCtx.showNotification({
//           title: "Success",
//           message: "Message sent successfully",
//           status: "success",
//         });
//         setEnteredEmail("");
//         setEnteredName("");
//         setEnteredMessage("");
//       })
//       .catch((error) => {
//         notificationCtx.showNotification({
//           title: "Error",
//           message: error.message || "Something went wrong",
//           status: "error",
//         });
//       });
