const express = require("express");
const router = express.Router();
const createUser = require("../model/user/User_Model");
const hashPassword = require("../helpers/hash_password");

router.all("/", (req, res, next) => {
  // console.log(error);
  // res.json({ message: "return user from route" });
  next();
});

router.post("/", async (req, res) => {
  const { name, company, address, phone, email, password } = req.body;
  try {
    //  hash password
    const hashedPass = await hashPassword(password);
    //update req body with hashed password
    const newUserObj = { ...req.body, password: hashedPass };
    const result = await createUser(newUserObj);
    console.log(result);
    res.json({ user: result });
    // res.json({ message: "user created", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
