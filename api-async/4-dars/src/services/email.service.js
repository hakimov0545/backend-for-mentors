import nodemailer from "nodemailer";
import { requireEnv } from "../utils/env.js";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: requireEnv("GMAIL_USER"),
		pass: requireEnv("GMAIL_PASS"),
	},
});

export async function sendWithLogging(to, subject, text, html) {
	try {
		const mailOptions = {
			from: requireEnv("MAIL_FROM"),
			to,
			subject,
			text,
		};

		if (html) {
			mailOptions.html = html;
		}

		const info = await transporter.sendMail(mailOptions);

		console.log("✓ Email yuborildi:");
		console.log(`  messageId: ${info.messageId}`);
		console.log(`  accepted: ${info.accepted}`);
		console.log(`  rejected: ${info.rejected}`);

		return {
			messageId: info.messageId,
			accepted: info.accepted,
			rejected: info.rejected,
		};
	} catch (error) {
		console.error("✗ Email yuborishda xato:", error.message);
		throw error;
	}
}
