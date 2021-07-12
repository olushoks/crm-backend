require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// ROUTER
const userRoute = require("./src/routes/user_route");
const ticketRoute = require("./src/routes/ticket_route");
const tokenRoute = require("./src/routes/token_route");
// ERROR HANDLER
const handleError = require("./src/utilities/error_handler");
// PORT
const port = process.env.PORT || 3001;

// initialize express
const app = express();

// initializre cors
app.use(cors());

// mongoDB connection
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

if (process.env.NODE_ENV !== "production") {
  const mDB = mongoose.connection;
  mDB.on("open", () => {
    console.log("MongoDB is connected");
  });
  mDB.on("error", (error) => {
    console.log("MONGODB REFUSED");
  });
  // logger
  app.use(morgan("tiny"));
}

// handle JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Security
// app.use(helmet());

// user route
app.use("/v1/user", userRoute);
// ticket route
app.use("/v1/ticket", ticketRoute);
// tokens route
app.use("/v1/token", tokenRoute);

app.use((req, res, next) => {
  const error = new Error("Resource unknown");
  error.status = 400;

  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
