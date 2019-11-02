const express = require("express");
const mongoose = require("mongoose");
const app = express();

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const following = require("./routes/api/following");
const bodyParser = require("body-parser");
const passport = require("passport");
const path =require('path');

// Body parser middleware
// Telling Express to use bodyParser
// extended false is default form of encoding
app.use(bodyParser.urlencoded({extended: false}));
// Telling bodyParser we're using json
app.use(bodyParser.json());


//Passport configuration
app.use(passport.initialize());
require('./config/passport')(passport);

//Db config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//First Route
// app.get("/", (req, res) => res.send("hello team 3!"));

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/following", following);

if(PROCESS.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));
  app.get('*', (req,res) => { res.sendFile(path.resolve(__dirname,'client','build', 'index.html'));
})
}

const port = process.env.PORT || 5104;

app.listen(port, () => console.log(`Server running on ${port}`));
