Task Manager API
[https://documenter.getpostman.com/view/36269669/2sB3dMwAhs](https://documenter.getpostman.com/view/36269669/2sB3dMwAhs)

Task Manager API is a RESTful backend application that allows each user to manage their own tasks.
Every user has a private account, and all actions require authentication.
The API provides a clear structure for creating, updating, and tracking both main tasks and their related sub-tasks.

Features
1. Authentication & User Accounts

Each user has a private account.

Implemented JWT to create and verify access tokens.

Used bcrypt to:

Hash user passwords before saving them.

Compare entered passwords during login securely.

Data Models
1. Main Task

Represents a task created by the user.

Fields include:
TaskName
userId
startDate
endDate
donePercentage
subTasks (array of SubTask references)

A main task can contain multiple sub-tasks.

2. Sub Task
Represents small steps inside a main task.
Each sub-task includes:
Name
done: true/false
startDate
endDate
Reference to its parent main task
Main Task Progress Calculation

Main tasks automatically calculate completion percentage based on their sub-tasks:
The API counts the number of sub-tasks that are marked as done: true.
Percentage = (completed subTasks / total subTasks) * 100
The result is stored in donePercentage for the main task.

Validation
Used Joi to validate:
Request body data
URL parameters (like id)
Date formats
Required fields

This ensures the API receives correct and safe input before processing.

Technologies Used
Express.js
MongoDB + Mongoose
JWT (jsonwebtoken)
bcrypt
Joi (for validation)

Email Verification (Nodemailer)
Used Nodemailer to send verification emails to users during registration.
When a new user signs up:
A verification email is sent to the provided email address.
The user must confirm the email to activate the account.
This adds an additional security layer and prevents fake registrations.
