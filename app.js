// app.js

import { Hono } from "hono";
import router from "./router/index.js";

export function createApp() {
  const app = new Hono();

  app.route("/", router);

  return app;
}
