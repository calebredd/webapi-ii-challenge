const express = require("express"),
  server = express(),
  routes = require("./routes");
server.use("/hobbits", routes);
server.use("/", (req, res) => {
  res.send("API is running");
});
server.listen(9000, () => {
  console.log("API is running at localhost:9000");
});
