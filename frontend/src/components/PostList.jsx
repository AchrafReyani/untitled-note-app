import { useLoaderData } from 'react-router-dom';

import Post from './Post';

import classes from './PostList.module.css';

function PostList() {
    const notes = useLoaderData();

    return (
        <>
        {notes.length > 0 && (
        <ul className={classes.notes}>
            {notes.map((note) => <Post key={note.id} id={note.id} author={note.author} text={note.body} />)}
        </ul>
        )}
        {notes.length === 0 && (
            <div style={{textAlign: 'center'}}>
                <p>there are no notes here </p>
            </div>            
        )}
        </>
    )
}

export default PostList;