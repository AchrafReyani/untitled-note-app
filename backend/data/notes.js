const fs = require('node:fs/promises');
const path = require('node:path');

const NOTES_FILE = path.join(__dirname, 'notes.json');

async function getStoredNotes() {
  try {
    const rawFileContent = await fs.readFile(NOTES_FILE, { encoding: 'utf-8' });

    // If the file is empty (zero-length), initialize it
    if (!rawFileContent.trim()) {
      await fs.writeFile(NOTES_FILE, JSON.stringify({ notes: [] }));
      return [];
    }

    const data = JSON.parse(rawFileContent);
    return data.notes ?? [];

  } catch (err) {
    // If file doesn't exist, create it with empty array
    if (err.code === 'ENOENT') {
      await fs.writeFile(NOTES_FILE, JSON.stringify({ notes: [] }));
      return [];
    } else {
      throw err; // rethrow other unexpected errors
    }
  }
}

function storeNotes(notes) {
  return fs.writeFile(NOTES_FILE, JSON.stringify({ notes: notes || [] }));
}

exports.getStoredNotes = getStoredNotes;
exports.storeNotes = storeNotes;
