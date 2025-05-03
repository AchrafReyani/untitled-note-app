import { useRouteError } from "react-router-dom";
import classes from './NotesError.module.css';

function NotesError() {
    const error = useRouteError();

    return (
        <main className={classes.container}>
            <h2>Oops!</h2>
            <p>{error.status === 503 ? 'Could not load notes. Please try again later.' : 'An unexpected Error occurred.'}</p>
        </main>
    )
}

export default NotesError;