const express = require('express');
const bodyParser = require('body-parser');

const { getStoredNotes, storeNotes } = require('./data/notes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/notes', async (req, res) => {
  const storedNotes = await getStoredNotes();
  res.json({ notes: storedNotes });
});

app.get('/notes/:id', async (req, res) => {
  const storedNotes = await getStoredNotes();
  const note = storedNotes.find((note) => note.id === req.params.id);
  res.json({ note });
});

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

app.listen(8080);
