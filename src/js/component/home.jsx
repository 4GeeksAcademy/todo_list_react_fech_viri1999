import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const initialTask = {
	label: "",
	done: false

}
//create your first component
const Home = () => {
	const [task, setTask] = useState(initialTask)
	const [todos, setTodos] = useState([])

	const handleChange = (event) => {
		setTask({
			...task,
			[event.target.name]: event.target.value
		})
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-7">
					<h1>To-Do List</h1>
					<form>
						<input
							type="text"
							className="form-control"
							placeholder="Ingresa tus tareas"
							name="label"
							value={task.value}
							onChange={handleChange}
						/>
					</form>
				</div>
			</div>
		</div >
	);
};

export default Home;
