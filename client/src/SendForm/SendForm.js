import { sendEmail, stopEmailing } from "../utils/API";
import "./SendForm.css";

export default class SendForm {
  constructor() {
    this.elements = {
      self: document.createElement("section"),
      form: document.createElement("form"),
      senderEmail: document.createElement("input"),
      receiverEmails: document.createElement("input"),
      mailSubject: document.createElement("input"),
      mailBody: document.createElement("textarea"),
      intervalInput: document.createElement("input"),
      sendBtn: document.createElement("button"),
      stopBtn: document.createElement("button"),
    };
  }
  render(parent) {
    this.elements.senderEmail.setAttribute("type", "email");
    this.elements.senderEmail.setAttribute("name", "sender-mail");
    this.elements.senderEmail.setAttribute("placeholder", "Sender e-mail:");

    this.elements.receiverEmails.setAttribute("name", "receiver-emails");
    this.elements.receiverEmails.setAttribute("required", "");
    this.elements.receiverEmails.setAttribute(
      "placeholder",
      "Multiple receiver e-mails:"
    );

    this.elements.mailSubject.setAttribute("name", "mail-subject");
    this.elements.mailSubject.setAttribute("placeholder", "E-mail subject");

    this.elements.mailBody.setAttribute("name", "mail-body");
    this.elements.mailBody.setAttribute(
      "placeholder",
      "Type your message here..."
    );

    this.elements.intervalInput.setAttribute("type", "number");
    this.elements.intervalInput.setAttribute("max", "24");
    this.elements.intervalInput.setAttribute("name", "mail-interval");
    this.elements.intervalInput.setAttribute(
      "placeholder",
      "How frequently do you want msg to be sent in hours (must be less than 24)"
    );

    this.elements.sendBtn.innerText = "Send";
    this.elements.sendBtn.disabled = true;
    this.elements.sendBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.sendHandler();
      this.elements.form.reset();
    });

    this.elements.stopBtn.innerText = "Stop auto emailing";
    this.elements.stopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.stopHandler();
    });

    this.elements.form.addEventListener("change", (e) => {
      this.inputsChecker();
    });

    this.elements.form.append(
      this.elements.receiverEmails,
      this.elements.mailSubject,
      this.elements.mailBody,
      this.elements.intervalInput,
      this.elements.sendBtn,
      this.elements.stopBtn
    );

    this.elements.self.classList.add("form-container");
    this.elements.self.append(this.elements.form);

    parent.append(this.elements.self);
  }

  inputsChecker() {
    if (
      !this.elements.receiverEmails.value ||
      !this.elements.intervalInput.value ||
      this.elements.intervalInput.value > 24
    ) {
      this.elements.sendBtn.disabled = true;
    } else {
      this.elements.sendBtn.disabled = false;
    }
  }

  async sendHandler() {
    const formData = new FormData(this.elements.form);

    const body = {
      senderEmail: formData.get("sender-mail"),
      receiverEmails: [formData.get("receiver-emails")],
      mailSubject: formData.get("mail-subject"),
      mailBody: formData.get("mail-body"),
      mailInterval: +formData.get("mail-interval") * 3600000,
    };

    try {
      await sendEmail(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  async stopHandler() {
    try {
      await stopEmailing();
    } catch (error) {
      throw new Error(error);
    }
  }
}
