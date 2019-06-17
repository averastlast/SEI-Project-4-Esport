import requests
from decouple import config

key = config('API_key')
headers = {
    'Authorization': 'Bearer ' + key
}

# r = requests.get('https://api.pandascore.co/ow/teams?token=' + key)
# increased page size to 100, need to figure out how to get OWL teams only, 
# API PS does not have any flags to determine if the team is National, OWL, Contenders, etc.
# basically different divisions. All the teams are mixed.
r = requests.get('https://api.pandascore.co/ow/teams?page[size]=100&token=' + key, headers=headers)

pandaTeams = r.json()

