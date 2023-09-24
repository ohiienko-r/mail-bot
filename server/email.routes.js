import express from "express";

import emailController from "./email.controller.js";

const EmailRoutes = express.Router();

EmailRoutes.post("/", emailController.send);

export default EmailRoutes;
