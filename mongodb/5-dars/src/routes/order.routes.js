import express from "express";
import OrderController from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", OrderController.create.bind(OrderController));
router.get("/", OrderController.getAll.bind(OrderController));
router.get(
	"/stats/status",
	OrderController.getStatusStatistics.bind(OrderController),
);
router.get(
	"/stats/status-total",
	OrderController.getStatusStatisticsWithTotal.bind(
		OrderController,
	),
);
router.get(
	"/stats/customer",
	OrderController.getCustomerOrderStats.bind(OrderController),
);
router.get(
	"/stats/monthly",
	OrderController.getMonthlyOrderTrend.bind(OrderController),
);
router.get("/:id", OrderController.getById.bind(OrderController));
router.put("/:id", OrderController.update.bind(OrderController));
router.delete("/:id", OrderController.delete.bind(OrderController));

export default router;
