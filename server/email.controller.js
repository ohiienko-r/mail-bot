import { transporter } from "./helpers.js";

let nIntervId;

export default {
  async send(req, res) {
    const mailOptions = {
      from: req.body.senderEmail,
      to: req.body.receiverEmails,
      subject: req.body.mailSubject,
      text: req.body.mailBody,
    };

    nIntervId = await setInterval(() => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Помилка під час відправки листа:", error);
        } else {
          console.log("Лист відправлено успішно:", info.response);
        }
      });
    }, req.body.mailInterval);
  },
  stop(req, res) {
    clearInterval(nIntervId);
    nIntervId = null;
    console.log("Stop interval");
  },
};
