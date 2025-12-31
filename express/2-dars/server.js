import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));

let users = ["Ali", "Vali", "Abbos"];

const renderPage = (message = "") => {
	const list = users.map((u) => `<li>${u}</li>`).join("");

	return `
    <!DOCTYPE html>
<html lang="uz">
	<head>
		<meta charset="UTF-8" />
		<title>Users</title>
		<style>
			body {
				font-family: Arial;
				padding: 40px;
			}
			ul {
				margin-bottom: 20px;
			}
			.msg {
				color: green;
			}
			.error {
				color: red;
			}
		</style>
	</head>
	<body>
		<h2>Users ro'yxati</h2>

		${message}

		<ul>
			${list}
		</ul>

		<button onclick="location.reload()">Yangilash</button>

		<h3>Yangi user qo'shish</h3>
		<form method="POST" action="/users">
			<input
				type="text"
				name="name"
				placeholder="Ism kiriting"
			/>
			<button type="submit">Qo'shish</button>
		</form>
	</body>
</html>`;
};

app.get("/users", (req, res) => {
	res.send(renderPage());
});

app.post("/users", (req, res) => {
	const name = req.body.name?.trim();

	if (!name) {
		return res
			.status(400)
			.send(renderPage(`<p class="error">Name required</p>`));
	}

	if (name.length < 3) {
		return res
			.status(400)
			.send(renderPage(`<p class="error">Min 3 chars</p>`));
	}

	if (users.includes(name)) {
		return res
			.status(400)
			.send(renderPage(`<p class="error">Already exists</p>`));
	}

	users.push(name);
	res.send(renderPage(`<p class="msg">Qo'shildi</p>`));
});

app.listen(3000, () => {
	console.log("Server running: http://localhost:3000/users");
});
