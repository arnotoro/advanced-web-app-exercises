# Advanced Web Applications – Exercises

This repository contains the practice exercises for the *Advanced Web Applications* course at LUT University.

## Topics

During these exercises the following topics and technologies were covered:

* JavaScript/TypeScript
* Node.js
* Express.js
* Template engines (Pug, Jade)
* MongoDB
* APIs
* Authentication and authorization (JWT, Passport.js)
* React framework

### Course project
The course project was a full-stack MERN application for sharing code snippets, similar to stackoverflow. It can be found [here](https://github.com/arnotoro/fs-mern-project)

## Week topic descriptions
- **Week 1**: Recap of HTML, mobile-first CSS, and JavaScript API fetching
- **Week 2**: Introduction to backend development with Express.js server, handles GET and POST requests with a simple front end webpage.
- **Week 3**: To-Do app built with Node.js and Express.js using the Pug view engine.
- **Week 4**: Recipe app backend using Node.js and Express.js.
- **Week 6**: Introduction to cloud services. Task was to run an application on the Rahti cloud service provided by CSC.
- **Week 7**: Introduction to TypeScript. Built a backend vehicle catalog using TypeScript, Node.js, and Express.js, with at least one custom class.
- **Week 8**: Developed a backend application with session-based authentication using Passport.js, bcrypt.js, and MongoDB.
- **Week 9**: Built a backend to-do application with JWT-based authentication. Implemented secure login with Passport.js and stored the users and todos in MongoDB database.
- **Week 10**: Built a simple frontend for the Week9's backend application, allowing user registration and login. 
- **Week 11**: Introduction to the React framework. Built a React app with components, props and states with conditional rendering.
- **Week 12**: Expanding on React with useEffect, third-party components, and higher-order components.
- **Week 13**: Built skeleton code for a full-stack MERN (MongoDB, Express.js, React, Node.js) application.

## Running code
Each week's exercise has its own folder and can be run independently. Most of the earlier exercises focus on backend development, with the frontend being built later.
To run any of the exercises, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the folder of the exercise you want to run.
3. Install the dependencies by running:
   ```bash
   npm install
   ```
4. (Optional) Exercises with a database will require you to have MongoDB installed and running. Make sure to start the MongoDB server before running the application.
5. Start the server (and frontend where applicable) by running in the directory:
   ```bash
   npm start
   ```
6. Open your web browser and navigate to `http://localhost:3000` to view the application.