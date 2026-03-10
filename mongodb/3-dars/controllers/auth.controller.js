import authService from "../services/auth.service.js";

class AuthController {
	async register(req, res) {
		try {
			const { name, email, password } = req.body;

			if (!name || !email || !password) {
				return res
					.status(400)
					.json({ message: "All fields are required" });
			}

			const user = await authService.register({
				name,
				email,
				password,
			});
			res.status(201).json(user);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({
					message: "Email and password are required",
				});
			}

			const result = await authService.login({
				email,
				password,
			});
			res.json(result);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getMe(req, res) {
		try {
			const user = await authService.getUserById(req.userId);
			res.json(user);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getPrivate(req, res) {
		try {
			const data = await authService.getPrivateData(req.userId);
			res.json(data);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
}

export default new AuthController();
