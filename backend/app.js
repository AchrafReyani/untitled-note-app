const express = require('express');
const bodyParser = require('body-parser');

const { getStoredNotes, storeNotes } = require('./data/notes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// CREATE
app.post('/notes', async (req, res) => {
  const existingNotes = await getStoredNotes();
  const noteData = req.body;
  const newNote = {
    ...noteData,
    id: Math.random().toString(),
  };
  const updatedNotes = [newNote, ...existingNotes];
  await storeNotes(updatedNotes);
  res.status(201).json({ message: 'Stored new note.', note: newNote });
});

// READ
app.get('/notes', async (req, res) => {
  const storedNotes = await getStoredNotes();
  res.json({ notes: storedNotes });
});

app.get('/notes/:id', async (req, res) => {
  const storedNotes = await getStoredNotes();
  const note = storedNotes.find((note) => note.id === req.params.id);
  res.json({ note });
});

// UPDATE
app.put('/notes/:id', async (req, res) => {
  const noteId = req.params.id;
  const updatedNoteData = req.body;

  const storedNotes = await getStoredNotes();
  const noteIndex = storedNotes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found.' });
  }

  const updatedNote = { ...storedNotes[noteIndex], ...updatedNoteData };
  storedNotes[noteIndex] = updatedNote;

  await storeNotes(storedNotes);

  res.status(200).json({ message: 'Note updated.', note: updatedNote });
});

// DELETE
app.delete('/notes/:id', async (req, res) => {
  const noteId = req.params.id;

  const storedNotes = await getStoredNotes();
  const noteIndex = storedNotes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found.' });
  }

  storedNotes.splice(noteIndex, 1);

  await storeNotes(storedNotes);

  res.status(200).json({ message: 'Note deleted.' });

});

app.listen(8080);
