import json
import logging
import os
from flask import Flask, render_template, request, send_from_directory

app = Flask(__name__, static_folder='arxena/dist', template_folder='arxena/dist')


@app.route('/')
def home_page():
    logging.info("This is the blank path: %s", request.path)
    logging.info("This is the blank form: %s", request.form)
    messages = {}
    return render_template('index.html', messages=messages)


@app.route('/<path:path>', methods=['GET'])
def send_js(path):
    messages = {}
    return send_from_directory(app.static_folder, path)


if __name__ == '__main__':
    app.run(port=5051, host='localhost', debug=True, use_debugger=True, use_reloader=True)
