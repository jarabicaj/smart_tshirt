import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/data', (req, res) => {
  console.log('data received', req.body)
  io.emit('data', req.body)
  res.sendStatus(200);
})

io.on('connection', (socket) => {
  console.log('user connected');
});

httpServer.listen(3000, () => {
  console.log('listening on :3000');
});