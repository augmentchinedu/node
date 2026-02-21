// app.js

import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./router/index.js";

export function createApp() {
  const app = express();

  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.json());

  const name = process.env.APP_NAME || "App";

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: name });
  });

  app.use(router);

  return app;
}
