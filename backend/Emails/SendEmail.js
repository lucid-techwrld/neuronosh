const transporter = require("../utils/nodemailer");

const sendMail = async (email) => {
  try {
    const mailOptions = {
      from: `"NeuroNosh" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Welcome to NeuroNosh",
      html: HTML, // HTML body
    };

    await transporter.sendMail(mailOptions);
    console.log("Account Created Succesfully", email);
  } catch (error) {
    console.error("Error Creating Account:", error);
    throw new Error("Failed to verify account");
  }
};

module.exports = sendMail;

const HTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to Neuronosh</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f8fa;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .logo {
        text-align: center;
        margin-bottom: 30px;
      }
      .logo img {
        max-width: 150px;
      }
      .content {
        text-align: center;
      }
      h1 {
        color: #333333;
      }
      p {
        color: #555555;
        line-height: 1.6;
      }
      .footer {
        text-align: center;
        color: #999999;
        font-size: 12px;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="LOGO_URL_HERE" alt="Neuronosh Logo" />
      </div>
      <div class="content">
        <h1>Welcome to Neuronosh 👋</h1>
        <p>
          Thank you for signing up! We're excited to have you on board.
          <br /><br />
          You can now explore our platform and enjoy a smarter, faster way to shop.
        </p>
      </div>
      <div class="footer">
        © 2025 Neuronosh Inc. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
