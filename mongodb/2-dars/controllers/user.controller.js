import userService from "../services/user.service.js";

class UserController {
	async getAll(req, res) {
		const users = await userService.getAll();
		res.json(users);
	}

	async getById(req, res) {
		const user = await userService.getById(req.params.id);
		if (!user) {
			return res
				.status(404)
				.json({ message: "User not found" });
		}
		res.json(user);
	}

	async create(req, res) {
		const newUser = await userService.create(req.body);
		res.status(201).json({
			message: "User created",
			data: newUser,
		});
	}

	async update(req, res) {
		const updated = await userService.update(
			req.params.id,
			req.body,
		);
		if (!updated) {
			return res
				.status(404)
				.json({ message: "User not found" });
		}
		res.json({
			message: "User updated",
			data: updated,
		});
	}

	async delete(req, res) {
		const deleted = await userService.delete(req.params.id);
		if (!deleted) {
			return res
				.status(404)
				.json({ message: "User not found" });
		}
		res.json({
			message: "User deleted",
			data: deleted,
		});
	}
}

export default new UserController();
