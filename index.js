const express = require("express"),
  server = express(),
  routes = require("./routes");
server.use("/api/posts", routes);
server.use("/api/", (req, res) => {
  res.send("API is running");
});
server.listen(9000, () => {
  console.log("API is running at localhost:9000");
});
