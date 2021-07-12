const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("./redis");
const { storeRefreshJWT } = require("../model/user/User_Model");

const createAccessJWT = async (email, _id) => {
  try {
    const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_TOKEEN, {
      expiresIn: "15m",
    });

    await setJWT(accessJWT, _id);
    return Promise.resolve(accessJWT);
  } catch (err) {
    return Promise.reject(err);
  }
};

const createRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "30d",
    });

    await storeRefreshJWT(refreshJWT, _id);
    return Promise.resolve(refreshJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

const verifyAccessJWT = (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_TOKEEN));
  } catch (error) {
    return Promise.resolve(error);
  }
};

module.exports = {
  createAccessJWT,
  createRefreshJWT,
  verifyAccessJWT,
};
