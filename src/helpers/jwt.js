const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("./redis");

const createAccessJWT = async (email, id) => {
  try {
    const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_TOKEEN, {
      expiresIn: "15m",
    });

    await setJWT(accessJWT, id);
    return Promise.resolve(accessJWT);
  } catch (err) {
    return Promise.reject(err);
  }
};

const createRefreshJWT = async (payload) => {
  const refreshJWT = jwt.sign({ payload }, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "30d",
  });

  return Promise.resolve(refreshJWT);
};

module.exports = {
  createAccessJWT,
  createRefreshJWT,
};
