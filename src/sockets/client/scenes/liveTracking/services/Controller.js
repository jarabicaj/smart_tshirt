// class Controller {
//   ws = null;
//
//   listeners = [];
//
//   constructor(ws) {
//     this.ws = ws;
//     this.ws.onmessage = this.onMessage;
//   }
//
//   sendControlCommand = command => {
//     const message = JSON.stringify({
//       type: 'control',
//       command,
//     });
//     this.ws.send(message);
//   };
//
//   setDataListener = listener => {
//     this.listeners.push(listener);
//   };
//
//   onMessage = messageEvent => {
//     console.log('onMessage', messageEvent);
//     const message = messageEvent.data;
//     this.listeners.forEach(listener => listener(message));
//   };
// }
//

const connect = async url =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket(url)
    ws.onopen = () => {
      resolve(ws)
    }
  })

class Controller {
  url
  ws
  listeners = []
  constructor(url) {
    // const ws = new WebSocket(url)
    this.url = url
  }

  init = () =>
    new Promise(async (resolve, reject) => {
      this.ws = await connect(this.url)

      this.ws.send(
        JSON.stringify({
          type: 'identify',
          sender: 'client',
        }),
      )

      this.ws.onmessage = messageEvent => {
        const message = JSON.parse(messageEvent.data)
        if (message.type === 'identify' && message.status === 'success') {
          this.ws.onmessage = this.onMessage
          resolve()
        }
      }
    })

  onMessage = messageEvent => {
    const data = JSON.parse(messageEvent.data)
    this.listeners.forEach(listener => listener(data))
  }

  setDataListener = listener => {
    this.listeners.push(listener)
  }

  startTracking() {
    const message = JSON.stringify({
      type: 'control',
      command: 'start',
    })
    this.ws.send(message)
  }

  stopTracking() {
    const message = JSON.stringify({
      type: 'control',
      command: 'stop',
    })
    this.ws.send(message)
  }
}

export default Controller
