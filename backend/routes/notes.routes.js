import express from 'express';
const app = express.Router();

import { getAllNotes, addNewNote, deleteNote, updateNotes } from '../controllers/notesController.js';


app.post("/", addNewNote);

app.get("/:nickname", getAllNotes);

app.put('/update', updateNotes);

app.delete('/delete/:id', deleteNote);

export default app;