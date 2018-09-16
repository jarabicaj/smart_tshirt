const express = require("express");
const fs = require("fs");
const path = require("path");
const Client = require("mariasql");
const dbConfig = require("../config.js").dbConfig;

const data = fs
  .readFileSync("./server/data.txt")
  .toString()
  .split(";")
  .map(x => Number.parseFloat(x.replace(",", ".")));

// https://stackoverflow.com/questions/45494970/start-and-stop-python-script-from-nodejs

const app = express();
app.use(express.static("public"));

let reading = false;

let lastSave = null;

let writeClient = new Client(dbConfig);

const step = 1.953125; // 1000 / 512

const readData = next =>
  new Promise(resolve => {
    const timeout = 1000 - (new Date().getTime() - lastSave);
    setTimeout(() => {
      const query =
        "INSERT INTO data (timestamp, value) VALUES " +
        data
          .map((datum, index) => `(${lastSave + step * index}, ${datum})`)
          .join(",");

      writeClient.query(query, (err, rows) => {
        lastSave = new Date().getTime();
        if (reading) {
          next(next);
        }
        resolve();
      });
    }, timeout);
  });

app.post("/api/stop", (req, res) => {
  reading = false;
  setTimeout(() => {
    writeClient.end();
  }, 1000);
  res.sendStatus(200);
});

app.post("/api/start", (req, res) => {
  reading = true;
  lastSave = new Date().getTime();
  readData(readData);
  res.sendStatus(200);
});

app.get("/api/data", (req, res) => {
  const client = new Client(dbConfig);

  client.query(`SELECT * FROM data WHERE timestamp>${req.query.from}`, function(
    err,
    rows
  ) {
    if (err) {
      res.send({ status: "error" });
    }
    res.send({
      status: "success",
      data: rows.map(row => ({
        timestamp: parseInt(row.timestamp),
        value: parseFloat(row.value)
      }))
    });
  });

  client.end();
});

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../public") });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
