import { transporter } from "./helpers.js";

let intIds = [];

export default {
  async send(req, res) {
    const mailOptions = {
      from: req.body.senderEmail,
      to: req.body.receiverEmails,
      subject: req.body.mailSubject,
      text: req.body.mailBody,
    };

    let nIntervId = await setInterval(() => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Помилка під час відправки листа:", error);
        } else {
          console.log("Лист відправлено успішно:", info.response);
        }
      });
    }, req.body.mailInterval);

    const newIntId = nIntervId[Symbol.toPrimitive]();

    intIds.push({ subject: req.body.mailSubject, id: newIntId });

    res.json(intIds);
  },
  stop(req, res) {
    req.body.ids.forEach((element) => {
      clearInterval(element);
      let indexToDelete = intIds.findIndex((letter) => letter.id === element);

      if (indexToDelete !== -1) {
        intIds.splice(indexToDelete, 1);
      }
      console.log(`Clear interval ${element}`);
    });

    res.json(intIds);
  },
};
