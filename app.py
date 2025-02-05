from flask import Flask, render_template
from calculate import calc

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')