import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// Middleware
app.use(morgan("tiny")); // log requests
app.use(cors());
app.use(express.json());

// Environment variable
const name = process.env.NAME || "App";

// Health check endpoint
app.get("/", (req, res) => {
  res.send(`${name} says "Hello World!"`);
});

// Example API endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: name });
});

// Use the PORT environment variable provided by GAE
const PORT = process.env.PORT || 3000;

// Bind to 0.0.0.0 for App Engine
app.listen(PORT, "0.0.0.0", () => {
  console.log(`${name} running at http://0.0.0.0:${PORT}`);
});
