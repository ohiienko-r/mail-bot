import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "userMail",
    pass: "userpass",
  },
});
