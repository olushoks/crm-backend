const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

const setJWT = (key, value) => {
  return new Promise((response, reject) => {
    try {
      client.set(key, value, (err, res) => {
        if (err) reject(err);
        response(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getJWT = (key) => {
  return new Promise((response, reject) => {
    try {
      client.get(key, (err, res) => {
        if (err) reject(err);
        response(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  setJWT,
  getJWT,
};
