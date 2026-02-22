import express from "express";
import { sendWithLogging } from "../services/email.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
	const { to, subject, text, html } = req.body;

	if (!to || !subject) {
		return res.status(400).json({
			success: false,
			message: "to va subject majburiy",
		});
	}

	if (!text && !html) {
		return res.status(400).json({
			success: false,
			message:
				"text yoki html dan kamida bittasi bo'lishi majburiy",
		});
	}

	try {
		const result = await sendWithLogging(to, subject, text, html);

		res.status(200).json({
			success: true,
			message: "Email muvaffaqiyatli yuborildi",
			data: result,
		});
	} catch (error) {
		console.error("Email yuborishda xato:", error);

		res.status(500).json({
			success: false,
			message: "Email yuborishda xato",
			error: error.message,
		});
	}
});

export default router;
