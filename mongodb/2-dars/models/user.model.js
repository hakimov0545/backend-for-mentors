import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		fullName: { type: String, required: true, minLength: 3 },
		email: {
			type: String,
			required: true,
			unique: true,
			match: /^\S+@\S+\.\S+$/,
		},
		age: { type: Number, min: 6 },
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
	},
	{ timestamps: true },
);

export default model("User", userSchema);
