const { default: axios } = require("axios");
const express = require("express");
require("dotenv").config();

const processData = require("./helpers/processData");
const app = express();

const port = process.env.port || 3001;

app.get("/", async (req, res) => {
  let startTime = new Date().getTime();
  console.log(`Request ${new Date(startTime).toLocaleTimeString()}`);

  processData();

  let takenTime = new Date().getTime() - startTime;
  let timeString = `${new Date(takenTime).getMinutes()}:${new Date(
    takenTime
  ).getSeconds()}:${new Date(takenTime).getMilliseconds()}`;

  res.send(`It took ${timeString}`);
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
