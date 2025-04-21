const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBirthdayEmail = async (to, username) => {
  const mailOptions = {
    from: `"May's place" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Happy Birthday!",
    html: `
      <div style="font-family:sans-serif;padding:20px;text-align:center;">
        <h2>🎂 Happy Birthday ${username}!</h2>
        <p>We hope your day is filled with happiness, serenity and beautiful memories!</p>
        <img src="https://media.giphy.com/media/7NpSWoebkmJuryOWOG/giphy.gif?cid=ecf05e47h0lzypoy6083p9s2vxczowubrp5i6l2wrd6wtpds&ep=v1_gifs_search&rid=giphy.gif&ct=g" width="200"/>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendBirthdayEmail };
