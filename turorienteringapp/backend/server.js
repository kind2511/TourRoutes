const mongoose = require("mongoose");
const dotenv = require("dotenv");

//specifies path to config.env file
dotenv.config({ path: "./config.env" });

const app = require("./app");

// Connecting to DB
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB connection successfull!");
  })
  .catch(() => {
    console.error("Error connecting to the database");
  });

// Sets port to PORT variable in config.env
const port = process.env.PORT || 8000;

// Listen to incoming requests from clients
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
