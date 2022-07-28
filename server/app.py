from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
from dotenv import load_dotenv
from pathlib import Path
import os
 
load_dotenv()
env_path = Path(".")/".env"
load_dotenv(dotenv_path=env_path)

app = Flask(__name__)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True

db = SQLAlchemy(app)

class User(db.Model):
	""" User model ORM """

	id = db.Column(db.Integer, primary_key = True)
	username = db.Column(db.String(100), unique = True)
	password = db.Column(db.String(80))

@app.route("/login", methods =["POST"])
def login():
	""" 
	Receives a username and password in the request body and generates a token
	that can be used to verify a user"s identity.
	"""

	body = request.get_json()
	username = body["username"]
	password = body["password"]

	user = User.query.filter_by(username = username).first()

	if not user:
		return make_response("No such user.", 401) # unauthorized

	if check_password_hash(user.password, password):
		# generate token with encoded user data
		token = jwt.encode({
			"username": user.username,
			"exp": datetime.utcnow() + timedelta(minutes = 30)
		}, app.config["SECRET_KEY"])

		return make_response(jsonify({"token": token}), 201) # resource created

	return make_response("Incorrect password.", 403) # forbidden

@app.route("/register", methods =["POST"])
def register():
	""" 
	Receives a username and password in the request body and generates a token
	that can be used to verify a user"s identity.
	"""

	body = request.get_json()
	username = body["username"]
	password = body["password"]

	# check for existing user with the same username
	user = User.query.filter_by(username = username).first()
	
	if not user:
		password = generate_password_hash(password)
		user = User(username = username, password = password)

		db.session.add(user)
		db.session.commit()

		return make_response("Successfully registered.", 201) # resource created
	else:
		return make_response("User already exists.", 409) # conflict

if __name__ == "__main__":
	app.run(debug = True)
