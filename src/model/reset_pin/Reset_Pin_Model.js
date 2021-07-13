const { ResetPinSchema } = require("./Reset_Pin_Schema");
const { randomPinNumber } = require("../../utilities/random_generator");

const setPasswordResetPin = (email) => {
  const pinLength = 6;
  const resetPin = randomPinNumber(pinLength);

  const resetObj = { email, pin: resetPin };
  return new Promise((resolve, reject) => {
    ResetPinSchema(resetObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

module.exports = { setPasswordResetPin };
