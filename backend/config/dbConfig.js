const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, {
    dbName: process.env.DTABASE_NAME,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((error) => {
    console.log(error);
    console.log("Mongodb connection faield");
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});
mongoose.connection.on("error", (error) => {
  console.log(error.message);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
