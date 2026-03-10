import express from "express";
import { connectDB } from "./utils/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
	console.error("DB_URI is not defined in environment variables");
	process.exit(1);
}

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

connectDB(DB_URI).then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
