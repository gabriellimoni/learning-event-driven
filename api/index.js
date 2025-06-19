const express = require("express");
const { sendMessage, connectAndAssert } = require("./sendMessage");
const { exchanges } = require("./config");

const port = 8000 || process.env.PORT;
const app = express();

app.get("/health", (req, res) => {
  res.send({ status: "ok" });
});

app.post("/generate-event", express.json(), (req, res) => {
  sendMessage(exchanges.event.name, req.body.name, req.body.data);
  res.status(204).send();
});

connectAndAssert().then(() => {
  app.listen(port, () => console.log("listening on", port));
});
