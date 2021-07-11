const express = require("express");
const router = express.Router();
const createUser = require("../model/user/User_Model");

router.all("/", (req, res, next) => {
  // console.log(error);
  // res.json({ message: "return user from route" });
  next();
});

router.post("/", async (req, res) => {
  try {
    const result = await createUser(req.body);
    console.log(result);
    res.json({ message: "user created", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
