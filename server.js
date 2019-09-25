const express = require("express");
const mongoose = require("mongoose");
const app = express();

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");

// Body parser middleware
// Telling Express to use bodyParser
// extended false is default form of encoding
app.use(bodyParser.urlencoded({extended: false}));
// Telling bodyParser we're using json
app.use(bodyParser.json());

//Db config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//First Route
app.get("/", (req, res) => res.send("hello team 3!"));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = 5104;

app.listen(port, () => console.log(`Server running on ${port}`));
