const Joi = require("joi");

const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ["com", "net", "org"] },
});

const pin = Joi.number().min(10000).max(999999).required();

const newPassword = Joi.string().alphanum().min(3).max(30).required();

const subject = Joi.string().min(5).max(50).required();
const message = Joi.string().min(5).max(1000).required();
const opened_on = Joi.date();

const resetPassReqValidation = (req, res, next) => {
  const schema = Joi.object({ email });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const updatePassValidation = (req, res, next) => {
  const schema = Joi.object({ email, pin, newPassword });
  const value = schema.validate(req.body);
  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const createNewTicketValidattion = (req, res, next) => {
  const schema = Joi.object({ subject, message, opened_on });
  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

const replyMessageValidation = (req, res, next) => {
  const schema = Joi.object({ message });
  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({ status: "error", message: value.error.message });
  }
  next();
};

module.exports = {
  resetPassReqValidation,
  updatePassValidation,
  createNewTicketValidattion,
  replyMessageValidation,
};
