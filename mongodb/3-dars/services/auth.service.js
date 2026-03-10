import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

class AuthService {
	generateToken(userId) {
		return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
	}

	async register(userData) {
		const { name, email, password } = userData;

		const userExists = await User.findOne({ email });
		if (userExists) {
			throw new Error("User already exists");
		}

		const user = new User({ name, email, password });
		await user.save();

		return {
			id: user._id,
			name: user.name,
			email: user.email,
		};
	}

	async login(credentials) {
		const { email, password } = credentials;

		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("Invalid email or password");
		}

		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			throw new Error("Invalid email or password");
		}

		const token = this.generateToken(user._id);

		return { token };
	}

	async getUserById(userId) {
		const user = await User.findById(userId).select("-password");
		if (!user) {
			throw new Error("User not found");
		}
		return user;
	}

	async getPrivateData(userId) {
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}
		return { ok: true, message: "Protected route works" };
	}
}

export default new AuthService();
