const fs = require('node:fs/promises');
const path = require('node:path');

const POSTS_FILE = path.join(__dirname, 'posts.json');

async function getStoredPosts() {
  try {
    const rawFileContent = await fs.readFile(POSTS_FILE, { encoding: 'utf-8' });

    // If the file is empty (zero-length), initialize it
    if (!rawFileContent.trim()) {
      await fs.writeFile(POSTS_FILE, JSON.stringify({ posts: [] }));
      return [];
    }

    const data = JSON.parse(rawFileContent);
    return data.posts ?? [];

  } catch (err) {
    // If file doesn't exist, create it with empty array
    if (err.code === 'ENOENT') {
      await fs.writeFile(POSTS_FILE, JSON.stringify({ posts: [] }));
      return [];
    } else {
      throw err; // rethrow other unexpected errors
    }
  }
}

function storePosts(posts) {
  return fs.writeFile(POSTS_FILE, JSON.stringify({ posts: posts || [] }));
}

exports.getStoredPosts = getStoredPosts;
exports.storePosts = storePosts;
