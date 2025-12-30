import http from "http";

let students = [
	{ id: 1, name: "Ali", age: 15 },
	{ id: 2, name: "Laylo", age: 14 },
];

let idCounter = 2;

let totalRequests = 0;
let lastRequestTime = null;

function handleRequestStart(method, pathname) {
	totalRequests++;
	lastRequestTime = new Date().toISOString();
	console.log(`[REQUEST] ${method} ${pathname}`);
}

function sendJSONResponse(res, statusCode, data) {
	res.writeHead(statusCode, { "Content-Type": "application/json" });
	res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
	handleRequestStart(req.method, req.url);

	if (req.method === "GET" && req.url === "/students") {
		setTimeout(() => {
			console.log("[GET /students] timeout callback");
			sendJSONResponse(res, 200, students);
		}, 500);
	} else if (req.method === "POST" && req.url === "/students") {
		let body = "";

		req.on("data", (chunk) => (body += chunk));
		req.on("end", () => {
			try {
				const data = JSON.parse(body);

				idCounter++;
				const newStudent = { id: idCounter, ...data };
				students.push(newStudent);

				setImmediate(() => {
					console.log("[POST /students]");
					sendJSONResponse(res, 200, students);
				});
			} catch (error) {
				sendJSONResponse(res, 400, { error: "Invalid JSON" });
			}
		});
	} else if (req.method === "GET" && req.url === "/stats") {
		sendJSONResponse(res, 200, {
			studentsCount: students.length,
			lastRequestTime,
			totalRequests,
		});
	} else {
		sendJSONResponse(res, 404, { error: "Not Found" });
	}
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
