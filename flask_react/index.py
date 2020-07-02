from flask import Flask, request
from flask import render_template
from flask import json, jsonify
from flask_cors import CORS, cross_origin
from search import chatbot_action

app = Flask(__name__, static_url_path='', static_folder = "pychee/build/")
app.config["DEBUG"] = True
CORS(app)
action = chatbot_action()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@cross_origin()
def getAngular():
    return app.send_static_file('index.html')

@app.route("/", methods=['GET'])
def getIndex():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def page_not_found(e):
    print(">>>> 404 <<<<")
    return app.send_static_file('index.html')

@app.route("/api/msg", methods=['GET'])
@cross_origin()
def getGoogleSearch():
    incoming_msg = request.args.get('reqMsg') #(i.e. ?user=some-value) or request.query_string When Post: request.form["reqMsg"]

    if not incoming_msg:
        resp_json = jsonify("request msg was not coming.")
    else:
        resp_json = action.chatbot_query(incoming_msg)

    resp = app.response_class(
        response=resp_json,
        status=200,
        mimetype='application/json'
    )
    return resp

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=3000)