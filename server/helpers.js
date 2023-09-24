import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "larnaca.ukrainians@gmail.com",
    pass: "rqdd smqy wlzm lyvt",
  },
});
