import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import { BackendStatusContext } from './BackendStatusContext';
import classes from './Note.module.css';

function Note({ id, author, text }) {
    const navigate = useNavigate();
    const { isBackendOnline } = useContext(BackendStatusContext);

    async function handleDelete(e) {
        e.preventDefault();

        if (!isBackendOnline) return;

        const confirmed = window.confirm('Are you sure you want to delete this note?');
        if (!confirmed) return;

        try {
            const response = await fetch(`http://localhost:8080/notes/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete note');
            }

            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to delete note.');
        }
    }

    return (
        <li className={classes.post}>
            <Link to={id}>
                <p className={classes.author}>{author}</p>
                <p className={classes.text}>{text}</p>
            </Link>
            <button
                onClick={handleDelete}
                disabled={!isBackendOnline}
                className={`${classes.deleteButton} ${!isBackendOnline ? classes.disabled : ''}`}
                title={!isBackendOnline ? 'Backend offline' : 'Delete note'}
            >
                ✖
            </button>
        </li>
    );
}

export default Note;
