const CustomErrorHandler = require("../services/CustomErrorHandler");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  let statusCode = 500;
  let data = {
    message: "Internal server error",
  };

  if (err instanceof CustomErrorHandler) {
    (statusCode = err.status),
      (data = {
        message: err.message,
      });
  }

  return res.status(statusCode).json(data);
};

module.exports = errorHandler;
