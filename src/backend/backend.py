from flask import Flask

app = Flask(__name__)

@app.route('/', methods=['GET'])
def fetchAthleteInfo():



if __name__ == '__main__':
    app.run()