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
    title = soup.find("h1")
    if title and "disambiguation" in title.text.lower():
        return jsonify({'title': 'Multiple'})

    return jsonify({'title': title.text.strip() if title else 'No title found'})



if __name__ == '__main__':
    app.run()