import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'
import Notes, { loader as notesLoader } from './routes/Notes.jsx'
import NewNote, { action as newNoteAction } from './routes/NewNote.jsx'
import NoteDetails , { loader as noteDetailsLoader } from './routes/NoteDetails.jsx'
import NotesError from './routes/NotesError.jsx'
import RootLayout from './routes/RootLayout.jsx'
import { BackendStatusProvider } from './components/BackendStatusContext.jsx'

const router = createBrowserRouter([
  { 
    path: '/',
    element: <RootLayout />, 
    children: [
      { 
        path: '/',
        element: <Notes />,
        loader: notesLoader,
        errorElement: <NotesError />,
        children:  [ 
          { path: 'create-post', element: <NewNote />, action: newNoteAction },
          { path: ':id', element: <NoteDetails />, loader: noteDetailsLoader }
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BackendStatusProvider>
      <RouterProvider router={router} />
    </BackendStatusProvider>
  </StrictMode>,
)
