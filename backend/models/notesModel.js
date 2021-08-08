import mongoose from "mongoose";

const Notes = mongoose.Schema({
		title: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);


const Note = mongoose.model('Note', Notes);

export default Note;