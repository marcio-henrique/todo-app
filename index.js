const cors = require("cors");
const dotenv = require("dotenv");

const express = require("express");
const app = express();

const todo = require("./app/todo.js");

//set configs on .env file
dotenv.config();
//set cors
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// routes
app.post("/tasks", todo.create);
app.get("/tasks", todo.getAll);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
