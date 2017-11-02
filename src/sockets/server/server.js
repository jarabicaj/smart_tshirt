import express from 'express';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';

import websockets from './websockets/websockets'

const app = express();
const server = http.createServer(app);

websockets(server)

app.use(express.static(path.join(__dirname, './dist')));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


app.post('/data', (req, res) => {
  console.log('data received', req.body)
  res.sendStatus(200);
})

// io.on('connection', (socket) => {
//   console.log('user connected');
// });

server.listen(3000, () => {
  console.log('listening on :3000');
});