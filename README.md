# Full-stack Test Project

Create a simple registration website with state management.

## Objectives

- Implement a simple registration website complete with a frontend and backend.

- The website must have at least six sections: Register, Login, Step1, Step2, Step3, and Inside.

- On first visit, the user must start at Login. They can choose to Login or Register at this stage.

- If they Register, they should be able to create a new user by entering their preferred username and password
in the Register form. Once successful, they should be redirected to Step1. If they login, they should be Inside.

- Step1, Step2, and Step3 are forms with at least one input. They are consecutive and mandatory,
i.e. users must not be able to go to Step2 without completing Step1.

- At any point of the steps, the user can go back and forth, or logout.
If they log back in, they should be at the **uncompleted** stage.

- The Inside section should show all the user inputs in the steps.

## Specification

**Frontend/Design**: up to you
**Backend**: as long as it's python
**Database**: SQLite

## Delivery
### Working website
You can deliver the project in a number of ways:
- Hosted. You can serve the website yourself on your domain or on any
free hosting site. (Firebase or Netlify for frontend) (AWS/GCP free tier or Deta for backend)

- Docker image. You can give us a link to your image that runs the whole stack from Dockerhub
or via email.

- Docker compose.

- README.md - You can also just give us instructions on how to run the source code on our side.

### Source code
- You can send the project's repository links (frontend and backend) if it's public or add us as collaborator.


## Extra
**Design**: plus points
**Unit tests**: plus points
**Coverage**: plus points