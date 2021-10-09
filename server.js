const express = require("express");
const app = express();
const { DB_URL, LOCAL_DB } = require("./config");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/authRoute");
const errorHandler = require("./middlewares/errorHandler");
const productRouter = require("./routes/productRoute");
const uploadRouter = require("./routes/uploadRoute");
const orderRouter = require("./routes/orderRoute");
const path = require("path");

mongoose.set("bufferCommands", false);

//DATABASE CONNECTION
(async () => {
  await mongoose.connect(
    // LOCAL_DB,
    // "mongodb://127.0.0.1:27017/veg_store",
    DB_URL,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log("connection un successfull");
        console.log(err);
      } else {
        console.log("database connected succesffuly");
      }
    }
  );
})();

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
app.use("/api/stripe", require("./routes/stripe"));

//Error Handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}----`);
});
