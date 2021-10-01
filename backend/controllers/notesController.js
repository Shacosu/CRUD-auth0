import Note from "../models/notesModel.js";

const getAllNotes = async (req, res) => {
    const {nickname} = req.params;
	try {
        const allNotes = await Note.find({ name: nickname});
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

const updateNotes = async (req, res) => {
    const { id, title, content } = req.body;
    console.log(title, content, id)
    try {
        await Note.findByIdAndUpdate(id, {
            title: title,
            content: content
        });
        res.send('Tarea actualizada');
    } catch (error) {
        console.log(error)
    }
}



export { getAllNotes, addNewNote, deleteNote, updateNotes };
