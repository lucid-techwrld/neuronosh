const transporter = require("../utils/nodemailer");

const SendOTP = async (email, otp) => {
  const HTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Your OTP Code</title>
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
        margin-bottom: 10px;
      }
      p {
        color: #555555;
        line-height: 1.6;
      }
      .otp-box {
        display: inline-block;
        background-color: #f0f4ff;
        color: #1a1a1a;
        font-size: 24px;
        font-weight: bold;
        padding: 15px 30px;
        border-radius: 8px;
        margin-top: 20px;
        letter-spacing: 4px;
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
        <h1>Your OTP Code</h1>
        <p>Please use the code below to verify your identity. This code will expire in 5 minutes.</p>
        <div class="otp-box">${otp}</div>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        © 2025 Neuronosh Inc. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;

  try {
    const mailOptions = {
      from: `"NeuroNosh" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Verification Code",
      html: HTML,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully to:", email);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

module.exports = SendOTP;
