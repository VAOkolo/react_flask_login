from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from datetime import datetime, timedelta
from dotenv import load_dotenv
from pathlib import Path
import jwt
import os
 
app = Flask(__name__)

CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

load_dotenv()
env_path = Path(".")/".env"
load_dotenv(dotenv_path=env_path)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True

db = SQLAlchemy(app)

class User(db.Model):
    """ User model ORM """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    full_name = db.Column(db.String(100), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    favorite_color = db.Column(db.String(100), nullable=True)

def token_required(func):
    """
    Decorator for verifying access token.
    """
    
    @wraps(func)
    def decorated():
        token = None

        if "Authorization" in request.headers:
            auth = request.headers["Authorization"]
            token = str.replace(str(auth), "Bearer ", "") # remove 'Bearer' in token

        if not token:
            return jsonify({"message": "Token is missing."}), 401 # unauthorized

        try:
            user_data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"]) # get decoded user data
            current_user = User.query.filter_by(username=user_data["username"]).first()
        except:
            return jsonify({"message": "Invalid token."}), 401 # unauthorized

        return func(current_user)

    return decorated

@app.route("/login", methods=["POST"])
def login():
    """ 
    Receives a username and password in the request body and generates a token
    that can be used to verify a user"s identity.
    """

    body = request.get_json()
    username = body["username"]
    password = body["password"]

    user = User.query.filter_by(username=username).first()

    if not user:
        return make_response("No such user.", 401) # unauthorized

    if check_password_hash(user.password, password):
        # generate token with encoded user data
        token = jwt.encode({
            "username": user.username,
            "exp": datetime.utcnow() + timedelta(minutes=30)
        }, app.config["SECRET_KEY"], algorithm="HS256")

        return make_response(jsonify({"token": token}), 201) # resource created

    return make_response("Incorrect password.", 403) # forbidden

@app.route("/register", methods=["POST"])
def register():
    """ 
    Receives a username and password in the request body and generates a token
    that can be used to verify a user"s identity.
    """

    body = request.get_json()
    username = body["username"]
    password = body["password"]

    # check for existing user with the same username
    user = User.query.filter_by(username=username).first()
    
    if not user:
        password = generate_password_hash(password)
        user = User(username = username, password=password)

        db.session.add(user)
        db.session.commit()

        return make_response("Successfully registered.", 201) # resource created
    else:
        return make_response("User already exists.", 409) # conflict

@app.route("/user", methods=["GET", "PATCH"])
@token_required
def update_and_get_user(current_user):
    user = User.query.filter_by(username=current_user.username).first()
    
    if not user:
        return make_response("User not found.", 202) # accepted

    if request.method == "PATCH":
        body = request.get_json()
        for key, value in body.items():
            if key != "username" and key != "password":
                setattr(user, key, value)

        db.session.commit()

    return make_response(jsonify({
        "username": user.username,
        "full_name": user.full_name,
        "age": user.age,
        "favorite_color": user.favorite_color
    }), 200)

if __name__ == "__main__":
    app.run(debug = True)
