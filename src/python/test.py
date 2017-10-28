import requests
import time
from random import randint

for x in range(0, 10):
    payload = {'name': 'a', 'uv': randint(0, 5000), 'pv': randint(0, 5000), 'amt': randint(0, 5000)}
    r = requests.post("http://localhost:3000/data", data=payload)
    print(r.text)
    time.sleep(2)
