import React, { useState, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";

const initialTask = {
	label: "",
	is_done: false
};

const URLBASE = "https://playground.4geeks.com/todo";

const Home = () => {
	const [task, setTask] = useState(initialTask);
	const [todos, setTodos] = useState([]);

	const handleChange = (event) => {
		setTask({
			...task,
			[event.target.name]: event.target.value
		});
	};

	const addTask = async (event) => {
		try {
			if (event.key === "Enter") {
				if (task.label.trim() !== "") {
					const response = await fetch(`${URLBASE}/todos/viridiana1999`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(task)
					});
					if (response.ok) {
						getAllTask();
						setTask(initialTask);
					} else {
						console.log("Error al añadir la tarea");
					}
				}
			}
		} catch (error) {
			console.log("Error en la solicitud:", error);
		}
	};

	const deleteTask = (id) => {
		fetch(`${URLBASE}/todos/${id}`, {
			method: "DELETE"
		})
			.then((response) => getAllTask())
			.catch((error) => console.log("Error en la solicitud:", error));
	};

	const getAllTask = async () => {
		try {
			let response = await fetch(`${URLBASE}/users/viridiana1999`);
			let data = await response.json();

			if (response.status === 404) {
				createUser();
			} else {
				setTodos(data.todos);
			}
			console.log(response);
		} catch (error) {
			console.log("Error en la solicitud:", error);
		}
	};

	const createUser = async () => {
		try {
			let response = await fetch(`${URLBASE}/users/viridiana1999`, {
				method: "POST"
			});
			console.log(response);
		} catch (error) {
			console.log("Error en la solicitud:", error);
		}
	};

	useEffect(() => {
		getAllTask();
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-7">
					<h1>To-Do List</h1>
					<form onSubmit={(event) => event.preventDefault()}>
						<input
							type="text"
							className="form-control"
							placeholder="Ingresa tus tareas"
							name="label"
							value={task.label}
							onChange={handleChange}
							onKeyDown={addTask}
						/>
					</form>
					{todos.map((item) => (
						<div key={item.id} className="d-flex justify-content-between">
							<div>{item.label}</div>
							<button className="btn btn-danger" onClick={() => deleteTask(item.id)}>Borrar</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
