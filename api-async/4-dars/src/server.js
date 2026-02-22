import dotenv from "dotenv";
dotenv.config();
import express from "express";
import emailRoutes from "./routes/email.routes.js";
import { requireEnv } from "./utils/env.js";

const app = express();

app.use(express.json());

try {
	requireEnv("GMAIL_USER");
	requireEnv("GMAIL_PASS");
	console.log("Env muvaffaqiyatli yuklandi");
} catch (error) {
	console.error("✗ ", error.message);
	process.exit(1);
}

app.use("/send-email", emailRoutes);

app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: "Endpoint topilmadi",
	});
});

app.use((err, req, res, next) => {
	console.error("Server error:", err);
	res.status(500).json({
		success: false,
		message: "Server error",
		error: err.message,
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`✓ Server ishga tushdi: http://localhost:${PORT}`);
	console.log(
		`POST http://localhost:${PORT}/send-email - Email yuborish uchun`,
	);
});
