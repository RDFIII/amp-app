const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Amp = require("./models/amp");
const User = require("./models/user");
const Comment = require("./models/comment");
const seedDB = require("./seeds");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// ROUTE FILES
const ampRoutes = require("./routes/amps");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://localhost/amp-app", { useMongoClient: true });

// CONNECT to mongoose
// replace the deprecated mongoose.Promise library
// this will need installing in a terminal with "npm install bluebird --save"
const bluebird = require('bluebird');
mongoose.Promise = bluebird; // mongoose recommend bluebird as a promise library for MongoDB

// connect to the database
mongoose.connect(`mongodb://localhost/amp-app`, {
    promiseLibrary: require('bluebird'), // mongoose docs recommend this go here too
    useMongoClient: true // add useMongoClient:true to fix the "open() =>v4.11.0" deprecation warning
})
// I added this to catch errors, it's not required but it helps
.then(function () { // show successful connection
    console.log('MongoDB has been connected!');
})
.catch(function (error) { // show error if database is not available
    console.error('Error while trying to connect with MongoDB!');
    console.error(error);
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Seed the database using seed file
// seedDB();

// Passport Config
app.use(require("express-session")({
  secret: "Meshuggah",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use("/amps", ampRoutes);
app.use("/amps/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(4000, function(){
  console.log("Listening on 3000");
});
