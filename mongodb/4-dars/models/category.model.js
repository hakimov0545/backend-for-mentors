import { Schema, model } from "mongoose";

const categorySchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

export default model("Category", categorySchema);
