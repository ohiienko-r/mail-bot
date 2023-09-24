import SendFrom from "./src/SendForm/SendForm.js"

const parent = document.querySelector("#app")

const sendForm = new SendFrom()
sendForm.render(parent)
