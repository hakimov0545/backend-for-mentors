import Order from "../models/order.model.js";

class OrderService {
	async create(data) {
		try {
			const order = new Order(data);
			const saved = await order.save();
			return saved;
		} catch (error) {
			throw new Error(`Error creating order: ${error.message}`);
		}
	}

	async getAll() {
		try {
			const orders = await Order.find();
			return orders;
		} catch (error) {
			throw new Error(
				`Error fetching orders: ${error.message}`,
			);
		}
	}

	async getById(id) {
		try {
			const order = await Order.findById(id);
			if (!order) {
				throw new Error("Order not found");
			}
			return order;
		} catch (error) {
			throw new Error(`Error fetching order: ${error.message}`);
		}
	}

	async update(id, data) {
		try {
			const order = await Order.findByIdAndUpdate(id, data, {
				new: true,
				runValidators: true,
			});
			if (!order) {
				throw new Error("Order not found");
			}
			return order;
		} catch (error) {
			throw new Error(`Error updating order: ${error.message}`);
		}
	}

	async delete(id) {
		try {
			const order = await Order.findByIdAndDelete(id);
			if (!order) {
				throw new Error("Order not found");
			}
			return order;
		} catch (error) {
			throw new Error(`Error deleting order: ${error.message}`);
		}
	}

	async getStatusStatistics() {
		try {
			const statistics = await Order.aggregate([
				{
					$group: {
						_id: "$status",
						count: { $sum: 1 },
						totalAmount: { $sum: "$total" },
					},
				},
				{
					$sort: { _id: 1 },
				},
			]);
			return statistics;
		} catch (error) {
			throw new Error(
				`Error fetching status statistics: ${error.message}`,
			);
		}
	}

	async getStatusStatisticsWithTotal() {
		try {
			const statistics = await Order.aggregate([
				{
					$group: {
						_id: "$status",
						count: { $sum: 1 },
						avgtotal: { $avg: "$total" },
					},
				},
				{
					$sort: { _id: 1 },
				},
			]);
			return statistics;
		} catch (error) {
			throw new Error(
				`Error fetching statistics: ${error.message}`,
			);
		}
	}

	async getCustomerOrderStats() {
		try {
			const stats = await Order.aggregate([
				{
					$group: {
						_id: "$customer",
						orderCount: { $sum: 1 },
						totalSpent: { $sum: "$total" },
						avgOrderValue: { $avg: "$total" },
					},
				},
				{
					$sort: { totalSpent: -1 },
				},
			]);
			return stats;
		} catch (error) {
			throw new Error(
				`Error fetching customer stats: ${error.message}`,
			);
		}
	}

	async getMonthlyOrderTrend() {
		try {
			const trend = await Order.aggregate([
				{
					$group: {
						_id: {
							year: { $year: "$createdAt" },
							month: { $month: "$createdAt" },
						},
						count: { $sum: 1 },
						totalRevenue: { $sum: "$total" },
					},
				},
				{
					$sort: { "_id.year": 1, "_id.month": 1 },
				},
			]);
			return trend;
		} catch (error) {
			throw new Error(
				`Error fetching monthly trend: ${error.message}`,
			);
		}
	}
}

export default new OrderService();
