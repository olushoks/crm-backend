const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (password) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(password, saltRounds));
  });
};

const comparePassword = (password, passwordFromDB) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordFromDB, function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = { hashPassword, comparePassword };
