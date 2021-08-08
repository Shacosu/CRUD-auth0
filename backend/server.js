import express from 'express';
import cors from 'cors';
const app = express();

import notesRoutes from './routes/notes.routes.js';
import myConnection from './configuration/db.js';

import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

myConnection();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send('Servidor Funcionando!')
});

app.use("/notes", notesRoutes);


app.listen(3001, () => console.log("Server iniciado en puerto 3001"))