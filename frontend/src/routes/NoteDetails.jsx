import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './NoteDetails.module.css';

function NoteDetails() {
  const note = useLoaderData();

  if (!note) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find note</h1>
          <p>Unfortunately, the requested note could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{note.author}</p>
        <p className={classes.text}>{note.body}</p>
      </main>
    </Modal>
  );
}

export default NoteDetails;

export async function loader({params}) {
    const response = await fetch('http://localhost:8080/notes/' + params.id);
    const resData = await response.json();
    return resData.note;
};