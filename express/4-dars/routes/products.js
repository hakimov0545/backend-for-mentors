import express from "express";

const router = express.Router();

let products = [
	{ id: 1, title: "Mouse", price: 100 },
	{ id: 2, title: "Keyboard", price: 200 },
];

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const product = products.find((p) => p.id == id);

	if (!product) {
		return res.status(404).json({ message: "product not found" });
	}

	res.json(product);
});

router.post("/", (req, res) => {
	const { title, price } = req.body;

	if (!title || !price) {
		return res
			.status(400)
			.json({ message: "title and price required" });
	}

	const newProduct = {
		id: Date.now(),
		title,
		price,
	};

	products.push(newProduct);
	res.status(201).json({
		message: "product created",
		success: true,
		product: newProduct,
	});
});

router.put("/:id", (req, res) => {
	const id = req.params.id;
	const { title, price } = req.body;

	const product = products.find((p) => p.id == id);
	if (!product) {
		return res.status(404).json({ message: "product not found" });
	}
	products = products.map((p) =>
		p.id == id ? { ...product, title, price } : p
	);

	res.status(200).json({
		message: "product updated",
		success: true,
		products,
	});
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;
	products = products.filter((p) => p.id != id);

	res.status(200).json({ message: "product deleted" });
});

router.get("/error/test", (req, res, next) => {
	next(new Error("Products error example"));
});

export default router;
