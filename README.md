# Overview

Write code for MEAN stack blog. Node.js and Express.js for backend, frontend with Angular@16.2. Allows users to sign up, log in, forgot password, reset password, create blog posts, save drafts, and manage their profiles.

Backend
breakdown of backend server setup:
Environment Configuration: Server loads variables from a .env file using the dotenv package.
Database Connection: connects to a MongoDB database using the connectDB function from the ./db/connect module.
Middleware Configuration: The server sets up various middleware functions:
morgan: Logs HTTP requests and responses (in development mode).
Static File Serving: The server serves static files from the ./public directory and the built Angular application from the frontend/dist/frontend/ directory.
Route Configuration: 
/api/uploads: For handling file uploads (using the multer package).
/auth: For authentication-related routes (login, signup, etc.).
/blog: For handling blog post operations.
/draft: For handling draft operations.
/api/seeder: For seeding the database (likely for development purposes).
Error Handling: The server includes a custom error handling middleware that logs errors and sends appropriate error responses.
The backend uses the ErrorResponse class from the ./utils/errorResponse module to create custom error objects with a status code and a message.

Frontend
Angular frontend app. 
Login Component (login.component.ts): This component handles user login functionality. It has a login form and sends a POST request to /auth/login with the user's credentials. If the login is successful, it stores the authentication token in localStorage and navigates to the /landing route.

Data Service (data.service.ts): This service is responsible for making HTTP requests to the backend API. It has methods for:
Retrieving the authenticated user's data (getMe()).
Getting all drafts (getAllDraft()).
Getting blog data (getBlogData()).
Getting a single blog post (getSingleBlog(id)).
Write Blog Component (writeblog.component.ts): This component allows authenticated users to create and publish new blog posts or save them as drafts.

Edit Draft Component (editdraft.component.ts): This component allows users to edit and update their saved drafts.

Edit Blog Component (editblog.component.ts): This component allows users to edit and update their published blog posts.

The frontend communicates with the backend API using HTTP requests, sending and receiving data in JSON format. The authentication token is included in the request headers for authenticated routes using the setHeader() method in the data.service.ts.

codebase implements a blog platform with user authentication, blog post management, draft management, and profile management functionalities. The backend server handles API requests and interacts with the MongoDB database, while the frontend Angular application provides the user interface and communicates with the backend API.
