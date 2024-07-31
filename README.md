# circular-trade-app

## Requirements
  Make sure you have Docker, Node, and Postgresql 15 installed.
  
## Installation
  To install required packages, run `npm install` in the root directory and it should install all deps for front end backend. 
  If that fails, try to run `npm install` in both `server/backend` and `Frontend` directories.

  Also, make sure your `server/backend` directroy contains a `.env` file with the following data:

  ```
  POSTGRES_DB=dev
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=postgres
  ```
## Setup
  To start the development server, run `npm run start-backend`. Then, in a new terminal, run `npm run start-frontend` to launch the app.
  If that fails, you can try this method:
  Navigate to the `server/backend` directory and run `docker-compose up -d`.
  Then run `npm start` to start up the server. To start the app, run `npm start` in the `Frontend` directory

## Known Issues
  If you are on Windows and having issues with authentication of the database:
  ```
    error: password authentication failed for user "postgres"
  ```
  (something like this)
  try consulting this [stackoverflow page](https://stackoverflow.com/questions/55038942/fatal-password-authentication-failed-for-user-postgres-postgresql-11-with-pg). In particular check the first answer starting at the part where it says "Find your `pg_hba.conf`"