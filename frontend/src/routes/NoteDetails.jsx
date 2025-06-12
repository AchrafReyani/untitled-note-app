import { useLoaderData, Link, useNavigate, useRevalidator } from 'react-router-dom';
import { useState, useContext } from 'react';

import Modal from '../components/Modal';
import { BackendStatusContext } from '../components/BackendStatusContext';
import classes from './NoteDetails.module.css';

function NoteDetails() {
  const note = useLoaderData();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();
  const { isBackendOnline } = useContext(BackendStatusContext);

  const [editedText, setEditedText] = useState(note?.body || '');
  const [editedAuthor, setEditedAuthor] = useState(note?.author || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  if (!note) {
    return (
      <Modal>
        <main className={classes.form}>
          <h1>Note not found</h1>
          <p>
            <Link to=".." className={classes.actions}>Okay</Link>
          </p>
        </main>
      </Modal>
    );
  }

  async function handleSave(e) {
    e.preventDefault();

    if (!isBackendOnline) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/notes/${note.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: editedText, author: editedAuthor }),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      revalidate();
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      setError('Saving failed. Try again.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Modal>
      <form className={classes.form} onSubmit={handleSave}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea
            id="body"
            name="body"
            required
            rows={3}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            disabled={!isBackendOnline || isSaving}
          />
        </p>
        <p>
          <label htmlFor="name">Title</label>
          <input
            type="text"
            id="name"
            name="author"
            required
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
            disabled={!isBackendOnline || isSaving}
          />
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p className={classes.actions}>
          <Link to=".." type="button">Cancel</Link>
          <button disabled={!isBackendOnline || isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </p>
      </form>
    </Modal>
  );
}

export default NoteDetails;

export async function loader({ params }) {
  const response = await fetch('http://localhost:8080/notes/' + params.id);
  const resData = await response.json();
  return resData.note;
}
