from flask import Flask, jsonify
from bs4 import BeautifulSoup
from flask_cors import CORS
import requests
import math

app = Flask(__name__)
CORS(app)

@app.route('/<name>', methods=['GET'])
def fetchAthleteInfo(name):
    url = f'https://www.openpowerlifting.org/u/{name}'
    r = requests.get(url)
    
    soup = BeautifulSoup(r.content, 'html.parser')
    name = soup.find("h1").text.strip()
    gender = name[-3:]
    maxSquat = soup.find("td", class_="squat").text.strip()
    maxBench = soup.find("td", class_="bench").text.strip()
    maxDL = soup.find("td", class_="deadlift").text.strip()
    tables = soup.find_all("table")
    competitionTable = tables[1]
    rows = competitionTable.find_all("tr")
    mostRecentRow = rows[1]
    cols = mostRecentRow.find_all("td")
    mostRecentLocation = cols[3].text.strip()
    totalTable = tables[0]
    totalRows = totalTable.find_all("tr")
    totalRow = totalRows[1]
    totalCols = totalRow.find_all("td")
    total = totalCols[4].text.strip()
        

    if name and "disambiguation" in name.lower():
        name = soup.find("h2").text.strip()
        name = name[:-4]
        if name and "#" in name.lower():
            name = name[:-3]
        results = []
        names = [tag.text.strip() for tag in soup.find_all("h2")]
        for i in range(len(tables)):
            tempName = names[i]
            index = tempName[-5:-4]
            if index.isnumeric() == False:
                index =  None
            lifterTable = tables[i]
            rows = lifterTable.find_all("tr")
            mostRecentRow = rows[1]
            cols = mostRecentRow.find_all("td")
            mostRecentLocation = cols[3].text.strip()
            mostRecentCompetition = cols[4].text.strip()
            results.append({
                    'location': mostRecentLocation,
                    'competition': mostRecentCompetition,
                    'index': index
                })
        return jsonify({'name': name, 'options':results})

    name = name[:-4]
    return jsonify({'name': name if name else 'No name found', 'options': [{'maxlifts' : {'squat': maxSquat,
    'bench': maxBench,
    'deadlift': maxDL,
    'total': total},
    'location': mostRecentLocation,
    'gender': gender
    }]
    })                                                                         



if __name__ == '__main__':
    app.run()