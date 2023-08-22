import { useContext } from "react";
import classes from "./DeleteUserForm.module.css";
import NotificationContext from "../../store/notification-context";
import { deleteUser } from "../../helpers/user-utils";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Modal from "../ui/Modal";

function DeleteUserForm(props) {
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();
    notificationCtx.showNotification({
      title: "Stand by",
      message: "Deleting user...",
      status: "pending",
    });
    try {
      const result = await deleteUser();
      signOut();
      notificationCtx.showNotification({
        title: "Success",
        message: result.message,
        status: "success",
      });
      router.replace("/auth");
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }

  return (
    <Modal onClose={props.onClose}>
    <form className={classes.form} onSubmit={submitHandler}>
      <h2>Are you sure?</h2>
      <button type="submit" className={classes.deleteButton}>Proceed</button>
    </form>
    </Modal>
  );
}

export default DeleteUserForm;
