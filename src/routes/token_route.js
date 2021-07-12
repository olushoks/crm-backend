const express = require("express");
const router = express.Router();
const { verifyResfreshJWT, createAccessJWT } = require("../helpers/jwt");
const { getUserByEmail } = require("../model/user/User_Model");

router.get("/new-access-jwt", async (req, res, next) => {
  const { authorization } = req.headers;
  const decoded = await verifyResfreshJWT(authorization);

  if (decoded.email) {
    const userProfile = await getUserByEmail(decoded.email);

    if (userProfile._id) {
      let tokenExp = userProfile.refreshJWT.added_at;
      tokenExp = tokenExp.setDate(
        tokenExp.getDate() + +process.env.JWT_REFRESH_TOKEN_EXP_IN
      );

      const today = new Date();
      if (tokenExp < today) {
        return res.status(403).json({ message: "Forbidden: Kindly sign in" });
      }

      const accessJWT = await createAccessJWT(
        decoded.email,
        userProfile._id.toString()
      );

      return res.json({ status: "success", accessJWT });
    }
  }
  res.status(403).json({ message: "Forbidden" });
});

module.exports = router;
