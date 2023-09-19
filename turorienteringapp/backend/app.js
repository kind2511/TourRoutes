const express = require("express");
const app = express();
const port = 3000;

// Creating a simple rout.
app.get("/", (req, res) => {
  res.status(200).json({ message: "First Express Route" });
});

// Listen to incoming requests from clients
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
