import { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from 'react-dom';


function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
}

function Modal(props) {
  return ReactDOM.createPortal((
    <Fragment>
      <div className={classes.modal}>
        <div className={classes.contents}>{props.children}</div>
        <button onClick={props.onClose}>Dismiss</button>
      </div>
      <Backdrop onClose={props.onClose} />
    </Fragment>
  )
  , document.getElementById('modals'));
}

export default Modal;
