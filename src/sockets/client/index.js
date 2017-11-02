import React from 'react'
import ReactDOM from 'react-dom'

import App from './scenes/App'

ReactDOM.render(<App />, document.getElementById('app'))

// import Controller from './services/Controller'

// const initConnection = url =>
//   new Promise((resolve, reject) => {
//     const ws = new WebSocket(url)
//
//     ws.onopen = () => {
//       console.log('open')
//
//       ws.onmessage = messageEvent => {
//         const message = JSON.parse(messageEvent.data)
//         console.log('received:', message)
//         if (message.type === 'identify' && message.status === 'success') {
//           console.log('sucess!!')
//           resolve(new Controller(ws))
//         }
//       }
//
//       ws.send(
//         JSON.stringify({
//           type: 'identify',
//           sender: 'client',
//         }),
//       )
//     }
//   })
//
// initConnection('ws://localhost:3000').then(controller => {
//   controller.setDataListener(message => {
//     console.log('dataListener1', message)
//   })
//
//   console.log('connection initialiazed', controller)
//   setTimeout(() => {
//     console.log('sending controller command')
//     controller.sendControlCommand('do a backflip')
//   }, 3000)
//   setTimeout(() => {
//     controller.setDataListener(message => {
//       console.log('dataListener2', message)
//     })
//     console.log('sending controller command')
//     controller.sendControlCommand('do a frontflip')
//   }, 5000)
// })

// ws.on('open', function() {
//   ws.send('something');
// });
// ws.on('message', function(message) {
//   console.log('received: %s', message);
// });
