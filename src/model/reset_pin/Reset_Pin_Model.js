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

const verifyEmailAndResetPin = (email, pin) => {
  return new Promise((resolve, reject) => {
    try {
      ResetPinSchema.findOne({ email, pin }, (error, data) => {
        if (error) {
          console.log(error);
          resolve(false);
        }
        resolve(data);
      });
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};

const deleteResetPin = (email, pin) => {
  try {
    ResetPinSchema.findOneAndDelete({ email, pin }, (error, data) => {
      if (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setPasswordResetPin,
  verifyEmailAndResetPin,
  deleteResetPin,
};
