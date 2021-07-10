const express = require("express");
const router = express.Router();

router.all("/", (req, res, next) => {
  // console.log(error);
  res.json({ message: "return user from route" });
  next();
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = router;
