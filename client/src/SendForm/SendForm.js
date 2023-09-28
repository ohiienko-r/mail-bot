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
      autoSentLettersField: document.createElement("fieldset"),
      stopBtn: document.createElement("button"),
    };
  }
  render(parent) {
    this.elements.senderEmail.setAttribute("type", "email");
    this.elements.senderEmail.setAttribute("name", "sender-mail");
    this.elements.senderEmail.setAttribute("placeholder", "Sender e-mail");

    this.elements.receiverEmails.setAttribute("name", "receiver-emails");
    this.elements.receiverEmails.setAttribute("required", "");
    this.elements.receiverEmails.setAttribute(
      "placeholder",
      "Recipients e-mails"
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
      this.elements.sendBtn.disabled = true;
    });

    const autoSentLetters = JSON.parse(localStorage.getItem("autoLeters"));

    this.displayAutoSentEmails(autoSentLetters);

    this.elements.stopBtn.innerText = "Stop auto emailing";
    this.elements.stopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.stopHandler();
    });

    this.elements.form.addEventListener("change", (e) => {
      this.inputsChecker();
    });

    this.elements.form.append(
      this.elements.senderEmail,
      this.elements.receiverEmails,
      this.elements.mailSubject,
      this.elements.mailBody,
      this.elements.intervalInput,
      this.elements.sendBtn,
      this.elements.autoSentLettersField,
      this.elements.stopBtn
    );

    this.elements.self.classList.add("form-container");
    this.elements.self.append(this.elements.form);

    parent.append(this.elements.self);
  }

  /**
   * Method checks recepient field and interval field to be filled and checks interval to be less than 24 and respectively disables send button
   */
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

  /**
   *
   * @param {Array} lettersList renders all letters' subjects that are currently automatically sent to recepient(s)
   * @returns void
   */
  displayAutoSentEmails(lettersList) {
    this.elements.autoSentLettersField.replaceChildren();

    if (!lettersList) return null;

    lettersList.forEach((letter) => {
      const letterSubject = document.createElement("label");
      letterSubject.innerText = letter.subject;

      const letterCheckbox = document.createElement("input");
      letterCheckbox.setAttribute("type", "checkbox");
      letterCheckbox.setAttribute("id", `${letter.id}`);

      letterSubject.prepend(letterCheckbox);

      this.elements.autoSentLettersField.append(letterSubject);
    });
  }

  /**
   * Method collects form data, creates a request body and makes a request to server using API method to start sending letter automatically.
   * After receiving a calls a method to re-render an auto sent letters.
   */
  async sendHandler() {
    const formData = new FormData(this.elements.form);

    const body = {
      receiverEmails: [
        formData.get("receiver-emails"),
        formData.get("sender-mail"),
      ],
      mailSubject: formData.get("mail-subject"),
      mailBody: formData.get("mail-body"),
      mailInterval: +formData.get("mail-interval") * 3600000,
    };

    try {
      const response = await sendEmail(body);

      localStorage.setItem("autoLeters", JSON.stringify(response));

      this.displayAutoSentEmails(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Method collects ids from the auto sent letters list and creates a request body to send a request to server using API method to stop auto sending
   * selected letters from the list. After receiving a response re-renders an auto sent letters list.
   */
  async stopHandler() {
    const allCheckboxes = this.elements.autoSentLettersField.querySelectorAll(
      'input[type="checkbox"]'
    );

    const body = {
      ids: [],
    };

    allCheckboxes.forEach((e) => {
      if (e.checked === true) body.ids.push(+e.id);
    });

    try {
      const response = await stopEmailing(body);

      localStorage.setItem("autoLeters", JSON.stringify(response));

      this.displayAutoSentEmails(response);
    } catch (error) {
      throw new Error(error);
    }
  }
}
