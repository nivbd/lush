# Lush - User mangment

## Features

- List view of users created
- Create a new user

## Tech

- [React]
- [Express]
- [Mongo db]
- [Jest, Supertest]
- [Material ui]

## Installation

In order to start the project, the following steps should be done:

1. go into client folder
2. run npm install
3. run npm start
4. go into server folder
5. run npm install
6. fill details into .env file
7. run npm start
8. open web on http://localhost:3000 (client port)

** the client runs on port 3000, and the server on port 3002.
in case that the server port is taken, you should update api.js file inside the client src -> update the base url.
````
const axiosInstance = axios.create({ baseURL: 'http://localhost:3002' });
````

## Assumptions

* user model consists the following fields: first name, last name, email, password and description. all fields are mandatory except description.
* password is a sensitive field (although hashed), and is not being sent to client.
* e2e test is done on the server side -> testing creating user route.

## Things that can be improved

* using typescript in server.
* adding proptypes to client.
* using a more light weight library for ui design components, or implement on my own.
* extract shared styles to separate files.
* make e2e tests also on client.
* make unit tests to utility functions.
* adding validation to user fields on server side - if passed and in the correct form.
* improve ux by adding spinner to the app, and avoid unnecessary loading states. also, empty states should be added.
