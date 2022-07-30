#!/bin/bash
cd client
npm i
cd ..
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt