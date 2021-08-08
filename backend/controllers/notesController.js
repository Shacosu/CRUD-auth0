import Note from "../models/notesModel.js";

const getAllNotes = async (req, res) => {
	try {
        const allNotes = await Note.find({});
        res.send(allNotes);
    } catch (error) {
        throw new Error(error);
    }
};

const addNewNote = async (req, res) => {
    try {
        const { title, name, content } = req.body;
        const noteData = {
            title,
            name,
            content,
        };
        const note = new Note(noteData);
        await note.save();
        res.send(note);
        
    } catch (error) {
        throw new Error(error);
        next(error);
    }
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        await Note.findByIdAndDelete(id);
        res.send('Nota Eliminada');
    } catch (error) {
        console.log(error);
    }
}



export { getAllNotes, addNewNote, deleteNote };
