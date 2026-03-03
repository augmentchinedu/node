// app.js

import { Hono } from "hono";
import router from "./router/index.js";

export function createApp() {
  const app = new Hono();
  const name = process.env.APP_NAME || "App";

  app.get("/api/health", (c) => {
    return c.json({ status: "ok", service: name });
  });

  app.route("/", router);

  return app;
}
