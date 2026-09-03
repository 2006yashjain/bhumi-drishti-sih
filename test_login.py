import urllib.request
import json

req = urllib.request.Request(
    'http://localhost:8001/api/v1/auth/login',
    data=json.dumps({"official_id": "guest", "password": "12345"}).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)

try:
    with urllib.request.urlopen(req) as response:
        print("Status:", response.status)
        print("Body:", response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("HTTP Error:", e.code)
    print("Body:", e.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
