import express from 'express';
const app = express.Router();

import { getAllNotes, addNewNote, deleteNote } from '../controllers/notesController.js';


app.get("/", getAllNotes);

app.post("/", addNewNote);

app.delete('/delete/:id', deleteNote);

export default app;