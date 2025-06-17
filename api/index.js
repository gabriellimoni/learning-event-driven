const express = require("express");

const port = 8000 || process.env.PORT;
const app = express();

app.get("/health", (req, res) => {
  res.send({ status: "ok" });
});

app.listen(port, () => console.log("listening on", port));
