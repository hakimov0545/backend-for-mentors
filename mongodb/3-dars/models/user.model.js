import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
	{
		name: { type: String, required: true, minLength: 3 },
		email: {
			type: String,
			required: true,
			unique: true,
			match: /^\S+@\S+\.\S+$/,
		},
		password: { type: String, required: true, minLength: 6 },
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user",
		},
	},
	{ timestamps: true },
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcryptjs.genSalt(10);
	this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcryptjs.compare(enteredPassword, this.password);
};

export default model("User", userSchema);
