const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "tranminhphuc26082002@gmail.com",
    pass: "lkealrgjbwtngjos",
  },
});

exports.sendEmail = async (email, token) => {
  let mailOptions = {
    from: '"RABBIT_SHIU 👻" <tranminhphuc26082002@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Account Verification Token", // Subject line
    text: "Hello my friend",
    html:
      "<b>verify your account</b>" +
      " <br/>" +
      "<span>Please verify your account by clicking the link</span>" +
      "<br/>" +
      "<span>http://localhost:3000/confirm/" +
      token +
      "</span>",
  };
  try {
    await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

exports.sendEmailForgotPassword = async (email, token) => {
  let mailOptions = {
    from: '"RABBIT_SHIU 👻" <tranminhphuc26082002@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Forgot password Verification Token", // Subject line
    html:
      "<b>Forgot password</b>" +
      " <br/>" +
      "<span>Please enter OTP below</span>" +
      "<br/>" +
      "<span>" +
      token +
      "</span>",
  };
  try {
    await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};
exports.sendMailConfirmPayment = async (email, token) => {
  let mailOptions = {
    from: '"RABBIT_SHIU 👻" <tranminhphuc26082002@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Payment Verification Token", // Subject line
    text: "Hello my friend",
    html:
      "<b>verify your account</b>" +
      " <br/>" +
      "<span>Please verify your account by clicking the link</span>" +
      "<br/>" +
      "<span>http://localhost:3000/payment/" +
      token +
      "</span>",
  };
  try {
    await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};
