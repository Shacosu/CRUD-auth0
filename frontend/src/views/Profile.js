import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Notes from "../components/Notes";
import axios from "axios";
import Loading from "../components/Loading";

export default function Profile() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [notes, setNotes] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [error, setError] = useState(false);
	const [title, setTitle] = useState("");
	const [name, setName] = useState("");
	const [content, setContent] = useState("");

	const newNote = {
		title,
		name,
		content,
	};
	if (user && name === "") {
		setName(user.nickname);
	}

	const addNewNote = async () => {
		try {
			if (title !== "" && name !== "" && content !== "") {
				await axios.post(`http://localhost:3001/notes`, newNote);
				setContent("");
				setTitle("");
				setName("");
				setRefresh(!refresh);
				setError(false);
			} else {
				setError(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			{isAuthenticated ? (
				<div>
					<div className="w-25 mx-auto bg-dark mt-4 text-white w-25 p-3 rounded">
						<div className="d-flex flex-column w-75 mx-auto">
							<h1 className="border-bottom w-75 border-danger border-2">
								Formulario{" "}
							</h1>
							{error && (
								<p className="alert alert-danger">
									Son necesario todos los campos!
								</p>
							)}
							<label htmlFor="">Titulo</label>
							<input
								type="text"
								value={title}
								placeholder="Titulo..."
								className="p-1 my-2"
								onChange={(e) => setTitle(e.target.value)}
							/>

							<label htmlFor="">Contenido</label>
							<textarea
								type="text"
								value={content}
								placeholder="Contenido..."
								className="p-1 my-2"
								onChange={(e) => setContent(e.target.value)}
								rows="3"
							></textarea>
							<button
								className="btn btn-primary m-4 fw-bolder "
								onClick={() => addNewNote()}
							>
								Agregar Nota
							</button>
						</div>
					</div>
					<Notes
						refresh={refresh}
						name={name}
						notes={notes}
						setRefresh={setRefresh}
						setNotes={setNotes}
						setTitle={setTitle}
						setContent={setContent}
						isLoading={isLoading}
					/>
				</div>
			) : (
				<h1>Debes estar logeado para guardar notas!</h1>
			)}
		</>
	);
}
