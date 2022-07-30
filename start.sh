#!/bin/bash
npm --prefix client run start &
cd server
source venv/bin/activate
python -c 'from app import db; db.create_all()'
export FLASK_APP=app.py
export FLASK_ENV=development
flask run
