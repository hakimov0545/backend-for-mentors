import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_FILE_PATH = path.join(__dirname, "logs.txt");

export function log(message) {
	try {
		const timestamp = new Date().toISOString();
		const logEntry = `${timestamp} - ${message}\n`;

		fs.appendFileSync(LOG_FILE_PATH, logEntry, "utf8");
	} catch (error) {
		console.error("Log yozishda xatolik: ", error.message);
	}
}

export function readLogs() {
	try {
		const logs = fs.readFileSync(LOG_FILE_PATH, "utf8");
		return logs;
	} catch (error) {
		console.error("Log faylni oqishda xatolik: ", error.message);
		return "";
	}
}
