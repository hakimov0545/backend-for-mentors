import userModel from "../models/user.model.js";

class UserService {
	async getAll() {
		try {
			return await userModel.find();
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	}

	async getById(id) {
		try {
			return await userModel.findById(id);
		} catch (error) {
			console.error("Error fetching user:", error);
		}
	}

	async create(userData) {
		try {
			return await userModel.create(userData);
		} catch (error) {
			console.error("Error creating user:", error);
		}
	}

	async update(id, data) {
		try {
			return await userModel.findByIdAndUpdate(id, data, {
				new: true,
			});
		} catch (error) {
			console.error("Error updating user:", error);
		}
	}

	async delete(id) {
		try {
			return await userModel.findByIdAndDelete(id);
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	}
}

export default new UserService();
