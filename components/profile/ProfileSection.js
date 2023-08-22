import { useState } from "react";
import PasswordChangeForm from "./PasswordChangeForm";
import classes from "./ProfileSection.module.css";
import DeleteUserForm from "./DeleteUserForm";

function ProfileSection() {
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  function showDeleteFormHandler() {
    setShowDeleteForm(true);
  }

  function hideDeleteFormHandler() {
    setShowDeleteForm(false);
  }
  return (
    <section className={classes.profile}>
      <PasswordChangeForm />
      <div className={classes.actions}>
        <button
          onClick={showDeleteFormHandler}
        >
          Delete Account?
        </button>
      </div>

      {showDeleteForm && <DeleteUserForm onClose={hideDeleteFormHandler} />}
    </section>
  );
}

export default ProfileSection;
