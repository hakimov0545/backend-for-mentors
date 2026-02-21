import express from "express";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/single", upload.single("image"), (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				success: false,
				message: "Rasm fayli tanlanmadi",
			});
		}

		const file = req.file;
		const fileUrl = `http://${req.get("host")}/uploads/${file.filename}`;

		res.status(201).json({
			success: true,
			message: "Rasm muvaffaqiyatli yuklandi",
			file: {
				filename: file.filename,
				path: file.path,
				url: fileUrl,
				size: file.size,
				mimetype: file.mimetype,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server xatosi",
			error: error.message,
		});
	}
});

router.post("/multiple", upload.array("images", 5), (req, res) => {
	try {
		if (!req.files || req.files.length === 0) {
			return res.status(400).json({
				success: false,
				message: "Hech qanday rasm fayli tanlanmadi",
			});
		}

		const files = req.files.map((file) => ({
			filename: file.filename,
			path: file.path,
			url: `http://${req.get("host")}/uploads/${file.filename}`,
			size: file.size,
			mimetype: file.mimetype,
		}));

		res.status(201).json({
			success: true,
			message: `${files.length} ta rasm muvaffaqiyatli yuklandi`,
			files: files,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server xatosi",
			error: error.message,
		});
	}
});

export default router;
