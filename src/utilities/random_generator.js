const randomPinNumber = (length) => {
  let pin = [];
  pin.length = length;
  pin.fill("");
  pin = pin.map(() => Math.floor(Math.random() * 10));

  return pin.join("");
};

module.exports = { randomPinNumber };
