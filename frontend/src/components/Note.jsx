import { Link } from 'react-router-dom';

import classes from './Note.module.css';

function Note({id, author, text}) {
    return (
        <li className={classes.post}>
            <Link to={id}>
                <p className={classes.author}>{author}</p>
                <p className={classes.text}>{text}</p>
            </Link>
        </li>
    );
}

export default Note;