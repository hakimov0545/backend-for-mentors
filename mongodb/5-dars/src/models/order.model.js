import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		customer: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["paid", "pending", "canceled"],
			default: "pending",
		},
		total: {
			type: Number,
			required: true,
		},
		itemsCount: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Order", orderSchema);
