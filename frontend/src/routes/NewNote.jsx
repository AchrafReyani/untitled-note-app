import { Link, Form, redirect } from 'react-router-dom';


import classes from './NewNote.module.css';
import Modal from '../components/Modal';

function NewNote() {
  
  return (
    <Modal>
      <Form method='post' className={classes.form} >
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3} />
        </p>
        <p>
          <label htmlFor="name">Title</label>
          <input type="text" id="name" name="author" required />
        </p>
        <p className={classes.actions}>
          <Link to='..' type='button'>Cancel</Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewNote;

export async function action({request}) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  await fetch('http://localhost:8080/notes', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
        'Content-Type': 'application/json'
    }
  });
  
  return redirect('..');
}