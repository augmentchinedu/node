// index.js

import { serve } from "@hono/node-server";
import { createApp } from "./app.js";

const port = Number(process.env.PORT);
const name = process.env.APP_NAME || "App";

const app = createApp();

serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, () => {
  console.log(`${name} running at http://0.0.0.0:${port}`);
});
