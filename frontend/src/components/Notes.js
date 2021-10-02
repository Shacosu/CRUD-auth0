import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

export default function Notes({
	refresh,
	setNotes,
	setRefresh,
	name,
	notes,
	isLoading,
}) {
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleClose = () => {
		setRefresh(!refresh);
		setShow(false)
	};

	const handleDelete = async (id) => {
		await axios.delete(`http://localhost:3001/notes/delete/${id}`);
		setRefresh(!refresh);
	};

	const saveBtn = () => {
		setRefresh(!refresh);
		setShow(false);
	};

	const handleEdit = async (id) => {
		setShow(true);
		if (title !== "" && content !== "") {
			await axios.put("http://localhost:3001/notes/update", {
				id,
				title,
				content,
			});

			setTitle("");
			setContent("");
		}
	};

	useEffect(() => {
		const request = async () => {
			const getAllNotes = await axios.get(
				`http://localhost:3001/notes/${name}`
			);
			setNotes(getAllNotes.data);
		};
		request();
	}, [refresh, name, isLoading]);
	return (
		<div>
			<h1 className="w-50 rounded p-2 mx-auto bg-success text-center text-white my-4">
				Notas
			</h1>
			{notes.map((note) => (
				<div key={note._id} className="d-inline-flex inline-block w-25 mt-4">
					<div className="card bg-dark text-white w-100 mx-2">
						<div className="card-body">
							<h3 className="card-title">{note.title}</h3>
							<p className="card-text">
								<b>Contenido:</b> {note.content}
							</p>
							<p className="card-text float-end bg-light text-dark p-2 rounded">
								<span className="fw-bolder">Usuario: {note.name}</span>
							</p>
							<button
								className="btn btn-primary"
								onClick={() => handleEdit(note._id)}
							>
								Editar
							</button>
							<button
								className="btn btn-danger mx-2"
								onClick={() => handleDelete(note._id)}
							>
								Eliminar
							</button>
						</div>
					</div>
				</div>
			))}
			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header>
					<Modal.Title>Editando Nota </Modal.Title>
				</Modal.Header>
				<Modal.Body className="d-flex flex-column">
					<label htmlFor="">Titulo</label>
					<input
						type="text"
						className="p-1 my-2"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<label htmlFor="">Contenido</label>
					<textarea
						type="text"
						rows="4"
						className="p-1 my-2"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					></textarea>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Salir
					</Button>
					<Button variant="primary" onClick={saveBtn}>
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
