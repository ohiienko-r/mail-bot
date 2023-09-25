import express from "express";

import emailController from "./email.controller.js";

const EmailRoutes = express.Router();

EmailRoutes.post("/", emailController.send);
EmailRoutes.patch("/stop", emailController.stop);

export default EmailRoutes;
