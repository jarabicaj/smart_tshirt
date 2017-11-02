import WebSocket from 'ws'

const connections = {
  tracker: {
    ws: null,
  },
  client: {
    ws: null,
  },
}

const initTracker = (ws, dbConnector) => {
  connections.tracker.ws = ws
  connections.tracker.ws.send(
    JSON.stringify({
      type: 'identify',
      status: 'success',
    }),
  )
  connections.tracker.ws.on('message', data => {
    // console.log('trackerData', data)
    if (connections.client.ws) {
      // console.log('sending')
      connections.client.ws.send(data)
    }
    // TODO: save to database
    // dbConnector.save(name, JSON.parse(data))
  })
}

const initClient = (ws, dbConnector) => {
  connections.client.ws = ws
  connections.client.ws.send(
    JSON.stringify({
      type: 'identify',
      status: 'success',
    }),
  )

  connections.client.ws.on('message', data => {
    const message = JSON.parse(data)
    switch (message.type) {
      case 'control':
        switch (message.command) {
          case 'start':
            // TODO: Open connection with DB
            // dbConnector.openConnection()
            connections.tracker.ws.send(
              JSON.stringify({ type: 'control', command: 'start' }),
            )
            break
          case 'stop':
            // TODO: Close connection with DB
            // dbConnector.closeConnection()
            connections.tracker.ws.send(
              JSON.stringify({ type: 'control', command: 'stop' }),
            )
            break
          default:
            break
        }
        break
    }
  })
}

const identify = (message, ws, dbConnector) => {
  switch (message.sender) {
    case 'tracker':
      initTracker(ws, dbConnector)
      break
    case 'client':
      initClient(ws, dbConnector)
      break
    default:
      break
  }
}

const websockets = (server, dbConnector) => {
  const wss = new WebSocket.Server({ server })

  wss.on('connection', ws => {
    ws.on('message', data => {
      const message = JSON.parse(data)
      if (message.type === 'identify') {
        identify(message, ws, dbConnector)
      }
    })
  })
}

export default websockets
