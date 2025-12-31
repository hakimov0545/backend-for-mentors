import express from "express";

const router = express.Router();

let users = [
	{ id: 1, name: "Ali", age: 12 },
	{ id: 2, name: "Vali", age: 15 },
];

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const user = users.find((u) => u.id == id);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	res.json(user);
});

router.post("/", (req, res) => {
	const { name, age } = req.body;

	if (!name || !age) {
		return res
			.status(400)
			.json({ message: "Name and age required" });
	}

	const newUser = {
		id: Date.now(),
		name,
		age,
	};

	users.push(newUser);
	res.status(201).json({
		message: "User created",
		success: true,
		user: newUser,
	});
});

router.put("/:id", (req, res) => {
	const id = req.params.id;
	const { name, age } = req.body;

	const user = users.find((u) => u.id == id);
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	users = users.map((u) =>
		u.id == id ? { ...user, name, age } : u
	);

	res.status(200).json({
		message: "User updated",
		success: true,
		users,
	});
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;
	users = users.filter((u) => u.id != id);

	res.status(200).json({ message: "User deleted" });
});

router.get("/error/test", (req, res, next) => {
	next(new Error("Users error example"));
});

export default router;
