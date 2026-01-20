import express from "express";
import productsRouter from "./routes/products.routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());

app.use("/products", productsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
