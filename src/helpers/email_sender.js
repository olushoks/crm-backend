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
    } catch (error) {
      console.log(error);
    }
  });
};

const emailProcessor = (userEmail, pin) => {
  let info = {
    from: process.env.NODEMAILER_USER,
    to: userEmail,
    subject: "Reset Password Request",
    text: `Here is your password reset pin: ${pin}\nIt expires in 1 day`,
    html: `
    <b>Hello</b>
    <p>Here is your passwordreset pin: ${pin}</p>
    <hr />
    <b>Kindly note it expires in 1 day</b>
    `,
  };
  send(info);
};

module.exports = {
  emailProcessor,
};
