const express = require("express");
const app = express();
const { DB_URL } = require("./config");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/authRoute");
const errorHandler = require("./middlewares/errorHandler");
const productRouter = require("./routes/productRoute");
const uploadRouter = require("./routes/uploadRoute");
const orderRouter = require("./routes/orderRoute");
const path = require("path");

//DATABASE CONNECTION

mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log("connection un successfull");
    }
    console.log("database connected succesffuly");
  }
);

global.appRoot = path.resolve(__dirname);

//GLOBAL MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

//ROUTES MIDDLEWARE
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/uploads", uploadRouter);
app.use("/api/order", orderRouter);

//Error Handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}----`);
});
