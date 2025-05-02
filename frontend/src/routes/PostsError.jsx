import { useRouteError } from "react-router-dom";
import classes from './PostsError.module.css';

function PostsError() {
    const error = useRouteError();

    return (
        <main className={classes.container}>
            <h2>Oops!</h2>
            <p>{error.status === 503 ? 'Could not load posts. Please try again later.' : 'An unexpected Error occurred.'}</p>
        </main>
    )
}

export default PostsError;