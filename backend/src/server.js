/**
 * @description This is the main entry point of the server application.
 * @fileoverview This file sets up the Express server, loads environment variables, connects to the database, and configures middleware.
 */

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db/connect");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const fs = require("fs");
var multer = require("multer");
var path = require("path");

//Connect to database
connectDB();

const authRoute = require("./routes/auth/auth.route");
const userRoute = require("./routes/users/user.route");
const postRoute = require("./routes/posts/post.route");
const draftRoute = require("./routes/drafts/draft.route");
const uploadRoute = require("./routes/upload/upload.routes");
const dBaseSeed = require('./db/seeder');

const app = express();

/**
 * @description This middleware serves static files from the specified directory.
 * @param {string} dir - The directory path where the static files are located.
 */
app.use(express.static(path.join(__dirname, './public')));

let root = path.join(__dirname, "../../frontend/dist/frontend/");

/**
 * @description This middleware serves static files from the specified directory.
 * @param {string} dir - The directory path where the static files are located.
 */
app.use(express.static(root));
app.use(express.static(`${__dirname}/src/uploads`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/blog', postRoute);
app.use('/draft', draftRoute);
app.use('/api/uploads', uploadRoute);

app.use('/api/seeder', dBaseSeed);

app.use(function (req, res, next) {
  if (
    req.method === "GET" && req.accepts("html") && !req.is("json") && !req.path.includes(".")
  ) {
    res.sendFile("index.html", { root });
  } else next();
});

app.get("*", (req, res) => {
  // console.log(path.join(__dirname, root));
  res.sendFile(path.join(__dirname, root));
});

app.use((error, req, res, next) => {
  const status = error.statusCode;
  const message = error.message;
  const data = error.data;
  const stack = process.env.NODE_ENV === 'development' ? error.stack : undefined;
  console.error({message: message, data: data, stack});  
  res.status(status).json({ message: message, data: data });
  next();
});

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  // console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
  console.log(`Server is running on port http://localhost:${PORT}`.yellow.bold);
});