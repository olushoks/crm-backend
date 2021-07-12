const { verifyAccessJWT } = require("../helpers/jwt");
const { getJWT } = require("../helpers/redis");

const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  //1. verify is jwt is valid
  const decoded = await verifyAccessJWT(authorization);
  if (decoded.email) {
    const userId = await getJWT(authorization);

    if (!userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.userId = userId;
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
};

module.exports = {
  userAuth,
};
