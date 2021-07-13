const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

const setJWT = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      client.set(key, value, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getJWT = (key) => {
  return new Promise((resolve, reject) => {
    try {
      client.get(key, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteJWT = (key) => {
  try {
    client.del(key);
  } catch (error) {
    console.log(err);
  }
};

module.exports = {
  setJWT,
  getJWT,
  deleteJWT,
};
