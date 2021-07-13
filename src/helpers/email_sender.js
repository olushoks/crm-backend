const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const send = (info) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await transporter.sendMail(info);

      console.log("Message sent: %s", result.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
      resolve(result);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};

const emailProcessor = ({ email, pin, type }) => {
  let info = null;

  switch (type) {
    case "request-new-password":
      info = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: "Reset Password Request",
        text: `Here is your password reset pin: ${pin}\nIt expires in 1 day`,
        html: `
            <b>Hello</b>
            <p>Here is your passwordreset pin: ${pin}</p>
            <hr />
            <b>Kindly note it expires in 1 day</b>`,
      };
      send(info);
      break;
    case "update-password-success":
      info = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: "Password Updatedd",
        text: `Your password has been succesfully updated. .You may sign in using the new password`,
        html: `
            <b>Hello</b>
            <p>Your password has been succesfully updated. .You may sign in using the new password</p>`,
      };
      send(info);
      break;
    default:
      break;
  }
};

module.exports = {
  emailProcessor,
};
