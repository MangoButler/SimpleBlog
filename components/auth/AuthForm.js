import { useContext, useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import { validatePassword, validateEmail } from "../../helpers/validators";
import { createUser } from "../../helpers/user-utils";
import NotificationContext from "../../store/notification-context";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [inputError, setInputError] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

  function toggleLoginHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (
      !enteredEmail ||
      !enteredPassword ||
      !validateEmail(enteredEmail) ||
      !validatePassword(enteredPassword)
    ) {
      setInputError("Provide valid email and Password!");
      return;
    }
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      if (!result.error) {
        router.replace("/");
        console.log("successfully logged in");
        return;
      }
      setInputError(result.error || "Something went wrong");
      return;
    } else {
      const confrimationPassword = confirmPasswordRef.current.value;
      if (confrimationPassword !== enteredPassword) {
        setInputError("Passwords do not match!");
        return;
      }
      notificationCtx.showNotification({
        title: "Stand by",
        message: "Creating user...",
        status: "pending",
      });

      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
        const loginReq = await signIn("credentials", {
            redirect: false,
            email: enteredEmail,
            password: enteredPassword,
          });
          if (!loginReq.error) {
            router.replace("/");
            console.log("successfully logged in");
            notificationCtx.showNotification({
                title: "Success!",
                message: result.message,
                status: "success",
              });
            return;
          }
          setInputError(loginReq.error || "Something went wrong");
          return;
      } catch (error) {
        console.log(error);
        notificationCtx.showNotification({
          title: "Error",
          message: error.message,
          status: "error",
        });
      }
    }
    setInputError(false);
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    confirmPasswordRef.current.value = "";
  }

  return (
    <section className={classes.login}>
      <h1>{isLogin ? "Login with existing account" : "Create new User"}</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Enter Your Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="password">Enter Password</label>
            <input type="password" id="password" ref={passwordInputRef} />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="password">Confirm Password</label>
              <input type="password" id="password" ref={confirmPasswordRef} />
            </div>
          )}
        </div>

        <div className={classes.actions}>
          {inputError && <p>{inputError}</p>}
          <button type="submit">{isLogin ? "Login" : "Create User"}</button>
          <button
            type="button"
            onClick={toggleLoginHandler}
            className={classes.btnSec}
          >
            {isLogin ? "Sign Up?" : "Login?"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
