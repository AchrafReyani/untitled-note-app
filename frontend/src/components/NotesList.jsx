import { useLoaderData } from 'react-router-dom';

import Note from './Note';

import classes from './NotesList.module.css';

function NotesList() {
    const notes = useLoaderData();

    return (
        <>
        {notes.length > 0 && (
        <ul className={classes.notes}>
            {notes.map((note) => <Note key={note.id} id={note.id} author={note.author} text={note.body} />)}
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

export default NotesList;