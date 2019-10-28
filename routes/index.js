const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  const hobbits = ["Bilbo", "Sam", "Frodo", "Gimgee", "Tooke"];
  res.status(200).json(hobbits);
});
module.exports = router;
