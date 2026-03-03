// router/index.js

import { Hono } from "hono";

const router = new Hono();

router.get("/", (c) => {
  return c.text("Hello from Node");
});

export default router;
