const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Amp = require("./models/amp");
const Comment = require("./models/comment");
const seedDB = require("./seeds");

// mongoose.connect("mongodb://localhost/amp-app", { useMongoClient: true


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

seedDB();

app.get("/", function(req, res){
  res.render("landing");
});

// INDEX - show all amps
app.get("/amps", function(req, res){
  // res.render("amps", {amps: amps});
  Amp.find({}, function(err, allAmps){
    if(err){
      console.log("ERROR");
    } else {
      res.render("amps/index", {amps: allAmps});
    };
  });
});

app.get("/amps/new", function(req, res){
  res.render("amps/new.ejs");
});

// SHOW - shows info for one amp
app.get("/amps/:id", function(req,res){
  Amp.findById(req.params.id).populate("comments").exec(function(err, foundAmp){
    if(err){
      console.log(err);
    } else {
      res.render("amps/show", {amp: foundAmp});
    };
  });
});

// NEW
app.post("/amps", function(req, res){
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newAmp = {name: name, image: image, description: description};
  Amp.create(newAmp, function(err, newlyCreated){
    if(err){
      console.log("ERROR");
    } else {
      res.redirect("/amps");
    };
  });
});

// ============================================================
// COMMENTS ROUTES
// ============================================================

app.get("/amps/:id/comments/new", function(req, res){
  Amp.findById(req.params.id, function(err, amp){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {amp: amp});
    };
  });
});

app.post("/amps/:id/comments", function(req, res){
  Amp.findById(req.params.id, function(err, amp){
    if(err){
      console.log(err);
      res.redirect("/amps");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          amp.comments.push(comment);
          amp.save();
          res.redirect(`/amps/${amp._id}`);
        };
      });
    };
  });
});

app.listen(3000, function(){
  console.log("Listening on 3000");
});
