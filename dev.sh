# start client and server in dev mode
npm --prefix client run start &
cd server
source venv/bin/activate
export FLASK_ENV=development
flask run
