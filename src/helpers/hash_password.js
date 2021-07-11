const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (password) => {
  return new Promise((resolve) => {
    resolve(bcrypt.hashSync(password, saltRounds));
  });
};

module.exports = hashPassword;
