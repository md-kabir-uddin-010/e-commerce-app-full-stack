const express = require("express");

//internal import
require("dotenv").config();
require("./config/dbConfig");
require("./config/passportConfig");

const globalMiddleware = require("./middlewares/global/gobalMiddleware");
const googleAuthRoute = require("./routes/googleAuthRoute");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/usersRoute");
const ordrerRoute = require("./routes/orderRoute");
const publicProduct = require("./routes/publicRoute");
const { NotFound, errorHandler } = require("./middlewares/errors/errorHandler");

const app = express();

//all global middleware
app.use(globalMiddleware);

//use routes
app.use("/auth", googleAuthRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", publicProduct);
app.use("/api/v1", ordrerRoute);
//404 not found handler
app.use(NotFound);
//global handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
