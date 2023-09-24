import express, { json, urlencoded } from "express";

import EmailRoutes from "./email.routes.js";

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static("./public"));

app.use("/api/email", EmailRoutes);

app.listen(8080, () => {
  console.log(`Server is running on port: 8080`);
});
