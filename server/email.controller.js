import { transporter } from "./helpers.js";

export default {
  async send(req, res) {
    const mailOptions = {
      from: req.body.senderEmail,
      to: req.body.receiverEmails,
      subject: req.body.mailSubject,
      text: req.body.mailBody,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Помилка під час відправки листа:", error);
      } else {
        console.log("Лист відправлено успішно:", info.response);
      }
    });
  },
};
