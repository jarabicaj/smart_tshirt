import _thread
import websocket
import json
import random
import time

def on_message(ws, data):
    global sending
    global connected
    message = json.loads(data)

    print("message received")

    if (not connected):
        if (message.get('type') == 'identify' and message.get('status') == 'success'):
            connected = True
            sending = False
            print('connected')

    if (connected):
        if (message.get('type') == 'control'):
            if (message.get('command') == 'start'):
                sending = True
                print('start')
            if (message.get('command') == 'stop'):
                sending = False
                print('stop')

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    ws.send(json.dumps({'type': 'identify', 'sender': 'tracker'}))

def run(ws):
    global connected
    global sending
    while 1:
        time.sleep(0.05)
        if (connected and sending):
            message = {'amplitude': random.uniform(-30, 200), 'time': time.time() * 1000}
            ws.send(json.dumps(message))


if __name__ == "__main__":
    # websocket.enableTrace(True)
    global connected
    connected = False
    global sending
    sending = False
    ws = websocket.WebSocketApp("ws://localhost:3000/",
                                on_message = on_message,
                                on_error = on_error,
                                on_close = on_close)
    ws.on_open = on_open

    _thread.start_new_thread( run, (ws,) )

    ws.run_forever()
