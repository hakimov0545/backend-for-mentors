import express from "express";

const app = express();
app.use(express.json());

let users = [
	{ id: 1, name: "Ali", age: 20 },
	{ id: 2, name: "Vali", age: 25 },
	{ id: 3, name: "Abbos", age: 30 },
];

app.get("/users", (req, res) => {
	let { minAge, maxAge } = req.query;
	let result = [...users];

	if (minAge) {
		result = result.filter((u) => u.age >= Number(minAge));
	}
	if (maxAge) {
		result = result.filter((u) => u.age <= Number(maxAge));
	}

	res.status(200).json(result);
});

app.get("/users/:id", (req, res) => {
	const id = req.params.id;
	const user = users.find((u) => u.id == id);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	res.status(200).json(user);
});

app.post("/users", (req, res) => {
	const { name, age } = req.body;

	if (!name || !age) {
		return res.status(400).json({
			message: "Name and age are required",
		});
	}

	const newUser = {
		id: Date.now(),
		name,
		age,
	};

	users.push(newUser);
	res.status(201).json({
		message: "Success creating user",
		success: true,
		user: newUser,
	});
});

app.put("/users/:id", (req, res) => {
	const id = Number(req.params.id);
	const { name, age } = req.body;

	const user = users.find((u) => u.id === id);
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	users = users.map((u) =>
		u.id == id ? { name, age, ...user } : u
	);

	res.status(200).json({
		message: "Success updating user",
		success: true,
		users,
	});
});

app.delete("/users/:id", (req, res) => {
	const id = Number(req.params.id);

	if (!id) {
		return res.status(404).json({ message: "User not found" });
	}
	users = users.filter((u) => u.id != id);

	res.status(200).json({
		message: "User deleted",
		success: true,
		users,
	});
});

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
