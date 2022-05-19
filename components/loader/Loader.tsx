import classes from "./Loader.module.css";

const Loader:React.FC = () => {

    return <span className={classes.loader}>
        <span className={classes.loader_dot}></span>
    </span>
}

export default Loader;
