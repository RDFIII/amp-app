const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Amp = require("./models/amp");
const seedDB = require("./seeds");

seedDB();

mongoose.connect("mongodb://localhost/amp-app", { useMongoClient: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Amp.create({
//   name: "Marshall", image: "https://cdn.guitarchalk.com/wp-content/uploads/2016/07/Marshall-DSL40C-40-Watt-Combo-Amp-clipped.png", description: "Pretty nice Marshall amp for metal and such."
// }, function(err, amp){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("NEWLY CREATED AMP");
//     console.log(amp);
//   };
// });

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
      res.render("index", {amps: allAmps});
    };
  });
});

app.get("/amps/new", function(req, res){
  res.render("new.ejs");
});

// SHOW - shows info for one amp
app.get("/amps/:id", function(req,res){
  Amp.findById(req.params.id, function(err, foundAmp){
    if(err){
      console.log(err);
    } else {
      res.render("show", {amp: foundAmp});
    };
  });
});

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

app.listen(3000, function(){
  console.log("Listening on 3000");
});
