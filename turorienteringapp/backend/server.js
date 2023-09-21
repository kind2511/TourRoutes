const app = require("./app");

const port = 3000;

// Listen to incoming requests from clients
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
