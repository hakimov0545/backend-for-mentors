export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Server error";

  console.error(`Error: ${status} - ${message}`);

  res.status(status).json({
    status,
    message,
    timestamp: new Date().toISOString(),
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Route not found",
    path: req.originalUrl,
  });
};
