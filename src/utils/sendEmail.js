import nodemailer from "nodemailer";

export const sendEmail = async ({to, subject, html}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // Wrap in an async IIFE so we can use await.
  const info = await transporter.sendMail({
    from: `"Task Manager App" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  });

  if (info.rejected.length > 0) return false;
  return true;
};
