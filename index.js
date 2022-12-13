const express = require("express");
require("dotenv").config();

const processData = require("./helpers/processData");
const app = express();

const port = process.env.port || 3001;

let interval = null;
let iterator = 1;

app.get("/", async (req, res) => {
  if (interval) {
    iterator = 1;
    clearInterval(interval);
  }

  let startTime = new Date().getTime();
  console.log(`Request ${new Date(startTime).toLocaleTimeString()}`);

  interval = setInterval(() => {
    if (iterator > 1000) {
      iterator = 1;
      clearInterval(interval);
    }

    console.log(iterator);
    iterator++;
  }, 1000);

  //await processData();

  let takenTime = new Date().getTime() - startTime;
  let timeString = `${new Date(takenTime).getMinutes()}:${new Date(
    takenTime
  ).getSeconds()}:${new Date(takenTime).getMilliseconds()}`;

  res.send(`It took ${timeString}`);
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});
