// src/components/NotesApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import header from './Header1';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container"
import Header1 from './Header1';
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom"
const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error.message);
    }
  };

  const addNote = async () => {
    try {
      await axios.post('http://localhost:8000/api/notes', newNote);
      setNewNote({ title: '', content: '' });
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  return (

    <>
      <Header1 />
 
      
      <Container className="w-50" style={{ marginTop: "8rem", backgroundColor:"#EEE7DA" , borderRadius:'20px' }}>
      <Card
        className="p-3 justify-content-center"
        style={{  textAlign:"center" ,margin: "auto",backgroundColor:"#EEE7DA"  }}
      >
         <h3>Notes App</h3>
        <Form>
           
        <textarea
         
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />

        <textarea
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        ></textarea>
        <br/>
        <button className='add-note' onClick={addNote}>Add Note</button>
        </Form>
        </Card>
    </Container>
      {/* <ul>
        {notes.map((note) => (
          <li key={note.ID}>
            {note.title} - {note.content}
            <button onClick={() => deleteNote(note.ID)}>Delete</button>
          </li>
        ))}
      </ul> */}

      <Container
      style={{ width: "200rem", margin: "2rem", height: "90%"}}
      className="p-0 card-zoom d-flex flex-wrap my-5"
    >
      
        {notes.map((note)=>(
        <Col key={note.ID} md={4} className="mb-3">
        <Card style={{backgroundColor:"#EEE7DA",borderRadius:'12px' }}>
        <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.content}</Card.Text>
        
          <button onClick={() => deleteNote(note.ID)}>Delete</button>
         
      </Card.Body>
        
       
      </Card>
     
      
  
      </Col>
          ))}

      </Container>
    
    </>
  );
};

export default NotesApp;
