import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsPath = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsPath));

app.use("/uploads", uploadRoutes);

app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: "Endpoint topilmadi",
	});
});

app.use((err, req, res, next) => {
	console.error(err);

	if (err.code === "LIMIT_FILE_SIZE") {
		return res.status(400).json({
			success: false,
			message:
				"Fayl hajmi juda katta. Maksimal 2 MB ruxsat berilgan",
		});
	}

	if (err.code === "LIMIT_FILE_COUNT") {
		return res.status(400).json({
			success: false,
			message:
				"Juda ko'p fayl. Maksimal 5 ta rasm yuklash mumkin",
		});
	}

	if (err.message.includes("Fayl formati noto'g'ri")) {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server: http://localhost:${PORT}`);
});
