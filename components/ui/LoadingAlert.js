import classes from './LoadingAlert.module.css';
import Loader from './Loader';

const LoadingAlert = () => {
    return <div className={classes.alert}>
        <h2>Loading...</h2>
        <Loader />
    </div>
};

export default LoadingAlert;