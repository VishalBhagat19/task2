const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notesdb',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log('Connected to database as ID ' + db.threadId);
});


// Create a new note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
  db.query(sql, [title, content], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Get all notes
app.get('/api/notes', (req, res) => {
  const sql = 'SELECT * FROM notes';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


// Delete a note
app.delete('/api/notes/:id', (req, res) => {

  const sql = 'DELETE FROM notes WHERE ID = ?';
  const noteId = req.params.id;
  db.query(sql, [noteId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
