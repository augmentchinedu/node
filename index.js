// index.js

import { createApp } from "./app/index.js";

const PORT = process.env.PORT;
const name = process.env.APP_NAME || "App";

const app = createApp();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`${name} running at http://0.0.0.0:${PORT}`);
});
