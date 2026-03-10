import OrderService from "../services/order.service.js";

class OrderController {
	async create(req, res) {
		try {
			const { customer, status, total, itemsCount } = req.body;

			if (!customer || !total || !itemsCount) {
				return res.status(400).json({
					message:
						"customer, total, and itemsCount are required",
				});
			}

			const order = await OrderService.create({
				customer,
				status: status || "pending",
				total,
				itemsCount,
			});

			res.status(201).json({
				message: "Order created successfully",
				data: order,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getAll(req, res) {
		try {
			const orders = await OrderService.getAll();
			res.json({
				message: "Orders fetched successfully",
				data: orders,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getById(req, res) {
		try {
			const { id } = req.params;
			const order = await OrderService.getById(id);
			res.json({
				message: "Order fetched successfully",
				data: order,
			});
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params;
			const { customer, status, total, itemsCount } = req.body;

			const order = await OrderService.update(id, {
				customer,
				status,
				total,
				itemsCount,
			});

			res.json({
				message: "Order updated successfully",
				data: order,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.params;
			const order = await OrderService.delete(id);
			res.json({
				message: "Order deleted successfully",
				data: order,
			});
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	}

	async getStatusStatistics(req, res) {
		try {
			const statistics =
				await OrderService.getStatusStatistics();
			res.json({
				message: "Status statistics fetched successfully",
				data: statistics,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getStatusStatisticsWithTotal(req, res) {
		try {
			const statistics =
				await OrderService.getStatusStatisticsWithTotal();
			res.json({
				message: "Status statistics with total fetched",
				data: statistics,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getCustomerOrderStats(req, res) {
		try {
			const stats = await OrderService.getCustomerOrderStats();
			res.json({
				message:
					"Customer order statistics fetched successfully",
				data: stats,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	async getMonthlyOrderTrend(req, res) {
		try {
			const trend = await OrderService.getMonthlyOrderTrend();
			res.json({
				message: "Monthly order trend fetched successfully",
				data: trend,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
}

export default new OrderController();
