const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserByEmail,
  getUserById,
} = require("../model/user/User_Model");
const { hashPassword, comparePassword } = require("../helpers/hash_password");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt");
const { userAuth } = require("../middleware/auth");

router.all("/", (req, res, next) => {
  // res.json({ message: "return user from route" });
  next();
});

// get user profile
router.get("/", userAuth, async (req, res) => {
  const _id = req.userId;

  const userProfile = await getUserById(_id);
  res.json({ user: userProfile });

  //3. extract userid
  //4. get profle based on user
});

// create new user route
router.post("/", async (req, res) => {
  const { name, company, address, phone, email, password } = req.body;
  try {
    //  hash password
    const hashedPass = await hashPassword(password);
    //update req body with hashed password
    const newUserObj = { ...req.body, password: hashedPass };
    const result = await createUser(newUserObj);
    console.log(result);
    res.json({ message: "user created", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

// user sign in route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ status: "error", message: "Invalid form submission" });
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return res.json({ status: "error", message: "invalid credentials" });
  }

  // const passwordFromDB = user && user._id ? user.password : null;
  const passwordFromDB = user.password;
  const isValid = await comparePassword(password, passwordFromDB);

  if (!isValid) {
    return res.json({ status: "error", message: "invalid credentials" });
  }

  const accessJWT = await createAccessJWT(user.email, `${user._id}`);
  const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);

  res.json({
    status: "success",
    message: "Login successfull!",
    accessJWT,
    refreshJWT,
  });
});

module.exports = router;
