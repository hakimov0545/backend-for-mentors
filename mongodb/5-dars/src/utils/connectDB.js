import mongoose from "mongoose";

export const connectDB = async (DB_URI) => {
	try {
		await mongoose.connect(DB_URI);
		console.log("Database connected successfully");
	} catch (error) {
		console.error("Database connection error:", error.message);
		process.exit(1);
	}
};
