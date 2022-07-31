# Full-Stack Registration, Login, and Onboarding Demo

Simple implementation of a web app with registration, login, and a series of onboarding steps that have to be completed in order.

## Features
- Login screen.
- Registration screen and automatic login after registration.
- 3 onboarding steps which have to be completed in order. While uncompleted, the user can go back and forth between steps at any time. If a user leaves and logs back in, the user is taken to the uncompleted step.
- Home screen, accessible only after completing all steps.

## Tech Stack

- **Frontend**: React, Tailwind
- **Backend**: Flask (Python)
- **Database**: SQLite

## Running Locally

After cloning the repo, `cd` into the root folder and install dependencies.

```bash
# from root
cd client
npm i
cd ..
cd server
python3 -m venv venv # create virtual env
source venv/bin/activate
pip install -r requirements.txt
```

Then, start both client and server.

```bash
# from root
npm --prefix client run start &
cd server
source venv/bin/activate
python -c 'from app import db; db.create_all()' # create the database
export FLASK_APP=app.py
export FLASK_ENV=development
flask run

```

Or, simply run the following scripts:

```bash
bash install.sh # install dependencies
bash start.sh # start in dev mode
```

## Env variables
For the purposes of this exercise, environment variables are included in the repo.

## References

- [Using JWT for user authentication in Flask](https://www.geeksforgeeks.org/using-jwt-for-user-authentication-in-flask/)