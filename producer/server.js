const express = require("express");
const Producer = require("./producer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json("application/json"));
const producer = new Producer();

app.post("/sendLog", async (req, res, next) => {
  const { logType, message } = req.body;
  await producer.publishMessage(logType, message);
  res.send();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
