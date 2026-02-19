import express from "express";

const app = express();

const name = process.env.NAME;

app.get("/", (req, res) => {
  res.send(`${name} says "Hello World!"`);
});

const PORT = process.env.PORT || 3000;

app.listen(() => {
  console.log(`${name} running at Port ${PORT}`);
});
