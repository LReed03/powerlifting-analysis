from flask import Flask, jsonify
from bs4 import BeautifulSoup
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/<name>', methods=['GET'])
def fetchAthleteInfo(name):
    url = f'https://www.openpowerlifting.org/u/{name}'
    r = requests.get(url)
    
    soup = BeautifulSoup(r.content, 'html.parser')
    name = soup.find("h1").text.strip()
    gender = name[-3:]
    name = name[:-4]
    maxSquat = soup.find("td", class_="squat").text.strip()
    maxBench = soup.find("td", class_="bench").text.strip()
    maxDL = soup.find("td", class_="deadlift").text.strip()
    tables = soup.find_all("table")
    competitionTable = tables[1]
    rows = competitionTable.find_all("tr")
    mostRecentRow = rows[1]
    cols = mostRecentRow.find_all("td")
    mostRecentLocation = cols[3].text.strip()
        

    if name and "disambiguation" in name.lower():
        return jsonify({'title': 'Multiple'})

    return jsonify({'name': name if name else 'No name found', 'options': [{'maxlifts' : {'squat': maxSquat,
    'bench': maxBench,
    'deadlift': maxDL},
    'location': mostRecentLocation,
    'gender': gender
    }]
    })                                                                         



if __name__ == '__main__':
    app.run()