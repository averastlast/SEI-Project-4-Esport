import requests
from decouple import config

key = config('API_key')
headers = {
    'Authorization': 'Bearer ' + key
}

# r = requests.get('https://api.pandascore.co/ow/teams?token=' + key)

r = requests.get('https://api.pandascore.co/ow/teams?token=' + key, headers=headers)

pandaTeams = r.json()

