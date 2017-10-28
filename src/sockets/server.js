import express from 'express' // library for simplified server in node.js
import http from 'http' // native node js library (need for socket io)
import socketIo from "socket.io" // library for web sockets
import mysql from "mysql" // library - mysql node client

// ===
// Boilerplate - presný daný postup
const app = express() // app resp aj httpServer su JEDEN SERVER
const httpServer = http.Server(app);
const io = socketIo(httpServer) // io je klient pre websocket - technologia "guliciek"

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


app.get('/', (req, res) => { // get metoda spracuva poziadavku a odpoved a posle klientovi odpoved v tvare index.html
  console.log("response", res)
  // __dirname - global variable to "this" path "...../smart_tshirt/src/sockets/
  res.sendFile(__dirname + '/index.html');
});

io.on("data z tricka", socket => { //
   // ulozim do mysql databazy
   // poslem vsetkym klientom
})
// register websocket connections
io.on('connection', (socket) => { // pripojenie na web sockety  a napise ci je pripojenei uspesne alebo nie

  console.log('a user connected');
  // register websocket disconnection
  socket.on('disconnect', () => {// vypise sa ked sa klient odpoji
    console.log('user disconnected');
  });

  setTimeout(() => {    // o 3 sekund sa vykona odoslanie socketu s nazvom chat message s telom send from server
    // emit message to all connected users
    io.emit('chat message', "send from server");
  }, 3000)
});

httpServer.listen(3000, () => {    // nastartovenie servera
  console.log('listening on *:3000');
});
