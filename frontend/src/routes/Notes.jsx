import { Outlet } from "react-router-dom";

import NotesList from "../components/NotesList";

function Notes() {

  return (
    <>
    <Outlet />
    <main>
      <NotesList />
    </main>
    </>
  );
}

export default Notes;

export async function loader() {
  try {
    const response = await fetch('http://localhost:8080/notes');

    if (!response.ok) {
      throw new Response('Failed to fetch notes.', {status: 500});
    }

    const resData = await response.json();
    return resData.notes;

  } catch (err) {
    throw new Response('Could not connect to the backend.', {status: 503});
  }

}