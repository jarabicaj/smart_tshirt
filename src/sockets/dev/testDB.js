const mysql = require("mysql") // library - mysql node client
const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test',
});

const save = (data) => new Promise((resolve, reject) => {
  connection.query(`INSERT INTO table_4 (time) VALUES ?`, [data], (error, results, fields) => {
    if (error) throw error;
    console.log("saved", results, fields)
    resolve()
  })
})

let nextSave = new Date().valueOf() + 1000;
let data = [];

const saveIntoDB = (timeStamp) => {
  data.push([`${timeStamp}`])
  if (timeStamp >= nextSave) {
    // Saving once per socond
    nextSave = timeStamp + 1000;
    const dataToSave = data;
    data = [];
    save(dataToSave);
  }
}

app.post('/data', (req, res) => {
  saveIntoDB(parseFloat(req.body.time))
  res.sendStatus(200);
})

app.listen(3000, () => {
  console.log('listening on :3000');
});

// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'test',
// });


// let nextSave = new Date().valueOf() + 1000;
//
// let data = [];
//
// const save = (data) => new Promise((resolve, reject) => {
//
//   const connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'test',
//   });
//   connection.query(`INSERT INTO table_4 (time) VALUES ?`, [data], (error, results, fields) => {
//     if (error) throw error;
//     console.log("saved", results, fields)
//     connection.end();
//     resolve()
//   })
// })
//
// const saveIntoDB = async (timeStamp) => {
//   data.push([`${timeStamp}`])
//   if (timeStamp >= nextSave) {
//     // Saving once per socond
//     console.log("saving=====")
//     nextSave = timeStamp + 1000;
//     const dataToSave = data;
//     data = [];
//     await save(dataToSave);
//   }
// }
//
// // last 31136
//
// const run = () => {
//   let now = new Date().valueOf()
//   let next = now + 100;
//   const end = now + 4100
//
//   console.log("starting at", now, end)
//
//   while(now < end) {
//     if (now >= next) {
//       next = now + 100;
//       console.log("adding")
//       saveIntoDB(now)
//     }
//     now = new Date().valueOf()
//   }
// }
//
// run()
//
//
// // console.log("starting")
// // while(enabled) {
// //   console.log("enabled")
// //   if (free) {
// //     console.log("free")
// //     free = false;
// //     const now = new Date()
// //     const timeStamp = `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`
// //     console.log("timeStamp", timeStamp)
// //
// //     connection.query(`INSERT INTO table_2 (time) VALUES ('${timeStamp}')`, (error, results, fields) => {
// //       if (error) throw error;
// //       console.log(results.insertId);
// //       free = true;
// //     })
// //     break
// //   }
// // }
//
// // connection.end();


// start 1509386000689 - 1
// end   1509386005698 - 946