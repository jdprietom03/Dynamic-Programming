import classes from "./Loader.module.css";

const LoaderPage = () => {
    return (
        <div className={classes.loader_page}>
            <div className={classes.spinner}></div>
            <span>Loading</span>
        </div>
    );
}

export default LoaderPage;