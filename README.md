# Todo App

## Project Overview

This project involves an application where users can register, log in, post tasks, edit them, and delete them. Additionally, administrator have the capability to log in, log out, view all users, and access their respective tasks.

## Features

- **Authentication:**
  - For authentication, Json Web Tokens (JWT) are used.
  - JWT is saved in local storage and sent on request where necessary.
- **Users:**
  - Sign up
  - Log in
  - Log Out
  - Post Tasks
  - Search Tasks
  - Edit Tasks
  - Delete Tasks
- **Admin:**
  - Log in
  - Log Out
  - View list of all users
  - View users tasks

## Technologies Used

- React.js
- JavaScript
- Node.js
- Express.js
- MongoDB
- CSS3

## Environment Variables (Server Folder)

- `DATABASE`: MongoDB connection string  
- `PORT`: Port (e.g., 4000)

## Start Scripts

- **Server:**
  - `nodemon server`
- **Client:**
  - `npm start`
