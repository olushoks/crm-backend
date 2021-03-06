const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserByEmail,
  getUserById,
  updatePassword,
  storeRefreshJWT,
  verifyNewUser,
} = require("../model/user/User_Model");
const { hashPassword, comparePassword } = require("../helpers/hash_password");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt");

const { emailProcessor } = require("../helpers/email_sender");
const { userAuth } = require("../middleware/auth");
const {
  setPasswordResetPin,
  verifyEmailAndResetPin,
  deleteResetPin,
} = require("../model/reset_pin/Reset_Pin_Model");
const {
  resetPassReqValidation,
  updatePassValidation,
  newUserRegistration,
} = require("../middleware/form_validation_middleware");
const { deleteJWT } = require("../helpers/redis");

const verificationLink = "http://localhost:3000/new-user-verification/";

/*===================================*
        END OF IMPORTS
*===================================*/

router.all("/", (req, res, next) => {
  // res.json({ message: "return user from route" });
  next();
});

// get user profile
router.get("/", userAuth, async (req, res) => {
  const _id = req.userId;

  const { name, email } = await getUserById(_id);

  res.json({ user: { _id, name, email } });
});

// verify new user
router.patch("/verify", async (req, res) => {
  try {
    const { _id, email } = req.body;
    const result = await verifyNewUser(_id, email);

    if (result && result._id) {
      return res.json({
        status: "success",
        message: "Your account has been activated, you may sign in now",
      });
    }
    res.json({
      status: "error",
      message: "Invalid request!",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "error", message: "Invalid request!" });
  }
});

// create new user route
router.post("/", newUserRegistration, async (req, res) => {
  const { password } = req.body;
  try {
    //  hash password
    const hashedPass = await hashPassword(password);
    //update req body with hashed password
    const newUserObj = { ...req.body, password: hashedPass };

    const result = await createUser(newUserObj);

    await emailProcessor({
      email: req.body.email,
      type: "new-user-verification",
      verificationLink: `${verificationLink}${result._id}/${result.email}`,
    });

    res.json({
      status: "success",
      message: "user created",
      result: { _id: result._id, name: result.name, email: result.email },
    });
  } catch (error) {
    let message = "unable to create new user at this time";
    if (error.message.includes("duplicate key error collection")) {
      message = "An existing account found with this email";
    }
    console.log(error);
    res.json({ status: "error", message });
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
    return res.json({ status: "error", message: "Invalid email or password" });
  }

  if (!user.isVerified) {
    return res.json({
      status: "error",
      message:
        "This account has not been verified.\nPlease use the verification link sent to the email provided",
    });
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

// reset password
router.post("/reset-password", resetPassReqValidation, async (req, res) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);

  if (user && user._id) {
    const newPin = await setPasswordResetPin(email);
    await emailProcessor({
      email,
      pin: newPin.pin,
      type: "request-new-password",
    });
  }

  res.json({
    status: "success",
    message:
      "If email exist in database, password reset pin will be sent shortly",
  });
});

router.patch("/reset-password", updatePassValidation, async (req, res) => {
  const { email, pin, newPassword } = req.body;
  const getPin = await verifyEmailAndResetPin(email, pin);

  if (getPin?.added_at) {
    const pinResetDate = getPin.added_at;
    let expiryDate = pinResetDate.setDate(pinResetDate.getDate() + 1);
    const today = new Date();

    if (today > expiryDate) {
      return res.json({ status: "error", message: "invalid or expired pin" });
    }
    const hashedNewPass = await hashPassword(newPassword);
    const user = await updatePassword(email, hashedNewPass);

    if (user._id) {
      await emailProcessor({ email, type: "update-password-success" });
      deleteResetPin(email, pin);
      return res.json({
        status: "success",
        message: "password has been succesfully updated",
      });
    }
  }

  res.json({
    status: "error",
    message: "unable to update your password, try again later",
  });
});

// user logout <--> JWT invalidaton
router.delete("/logout", userAuth, async (req, res) => {
  const { authorization } = req.headers;
  const _id = req.userId;

  deleteJWT(authorization);
  const result = await storeRefreshJWT("", _id);

  if (result._id) {
    return res.json({ status: "success", message: "Logged out succesfully" });
  }

  res.json({ status: "error", message: "Error logging out!" });
});

module.exports = router;
