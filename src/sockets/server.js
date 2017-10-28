import express from 'express' // library for simplified server in node.js
import http from 'http' // native node js library (need for socket io)
import socketIo from "socket.io" // library for web sockets
import mysql from "mysql" // library - mysql node client

// ===
// Boilerplate - presný daný postup
const app = express()
const httpServer = http.Server(app);
const io = socketIo(httpServer)

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test',
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();


app.get('/', (req, res) => {
  console.log("response", res)
  // __dirname - global variable to "this" path "...../smart_tshirt/src/sockets/
  res.sendFile(__dirname + '/index.html');
});

// register websocket connections
io.on('connection', (socket) => {
  console.log('a user connected');
  // register websocket disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  setTimeout(() => {
    // emit message to all connected users
    io.emit('chat message', "send from server");
  }, 3000)
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});
