const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "krathnayaka240@gmail.com",
    pass: "kwfogvdxbiqutvre"
  }
});

const sendEmail = async (to, title, description) => {
  await transporter.sendMail({
    from: "krathnayaka240@gmail.com",
    to: to,
    subject: title,
    html: `<h2>${title}</h2><p>${description}</p>`
  });
};

module.exports = sendEmail;