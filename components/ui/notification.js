import ReactDOM from 'react-dom';

import classes from './notification.module.css';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import Loader from './Loader';

function Notification(props) {
  const { title, message, status } = props;
  const notificationCtx = useContext(NotificationContext);

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal((
    <div className={cssClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      {status === 'pending' && <Loader/>}
      <p>{message}</p>
    </div>
  ), document.getElementById('notifications'));
}

export default Notification;
