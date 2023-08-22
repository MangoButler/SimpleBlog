import { useContext, useRef, useState } from "react";
import classes from "./PasswordChangeForm.module.css";
import { validatePassword } from "../../helpers/validators";
import NotificationContext from "../../store/notification-context";
import { updatePassword } from "../../helpers/user-utils";
import DeleteUserForm from "./DeleteUserForm";

function PasswordChangeForm() {
  const [isInvalid, setIsInvalid] = useState(false);
  const oldPassworInputRef = useRef();
  const newPasswordInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredOldPassword = oldPassworInputRef.current.value;
    const enteredNewPassword = newPasswordInputRef.current.value;

    if (
      !enteredNewPassword ||
      !enteredOldPassword ||
      !validatePassword(enteredNewPassword) ||
      !validatePassword(enteredOldPassword)
    ) {
      setIsInvalid(true);
      return;
    }

    //call update password
    notificationCtx.showNotification({
      title: "Stand by",
      message: "Updating password...",
      status: "pending",
    });

    try {
      const result = await updatePassword(
        enteredOldPassword,
        enteredNewPassword
      );
      notificationCtx.showNotification({
        title: "Success",
        message: result.message,
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error",
        message: error.message,
        status: "error",
      });
    }
    oldPassworInputRef.current.value = "";
    newPasswordInputRef.current.value = "";

    setIsInvalid(false);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h1>Change Password</h1>
      <div className={classes.control}>
        <label htmlFor="oldPassword">Old Password</label>
        <input type="password" id="oldPassword" ref={oldPassworInputRef} />
      </div>

      <div className={classes.control}>
        <label htmlFor="newPassword">New Password</label>
        <input type="password" id="newPassword" ref={newPasswordInputRef} />
      </div>
      {isInvalid && (
        <p className={classes.error}>Please enter valid Passwords!</p>
      )}
      <div className={classes.actions}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
}

export default PasswordChangeForm;
