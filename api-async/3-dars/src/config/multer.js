import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../../uploads/images");

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		const timestamp = Date.now();
		const originalName = file.originalname
			.replace(/\s+/g, "_")
			.replace(/[^a-zA-Z0-9._-]/g, "");
		const filename = `${timestamp}_${originalName}`;
		cb(null, filename);
	},
});

const fileFilter = (req, file, cb) => {
	const allowedMimes = [
		"image/jpeg",
		"image/png",
		"image/gif",
		"image/webp",
	];

	cb(null, true);
};

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
});

export default upload;
