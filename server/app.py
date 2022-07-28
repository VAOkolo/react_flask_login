from flask import Flask

app = Flask(__name__)

@app.route("/")
def it_works():
    return "It works"

if __name__ == "__main__":
    app.run(Debug = True)