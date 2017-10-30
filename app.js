const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/amp-app", { useMongoClient: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
let ampSchema = new mongoose.Schema({
  name: String,
  image: String,
});

let Amp = mongoose.model("Amp", ampSchema);

// Amp.create({
//   name: "Marshall", image: "https://cdn.guitarchalk.com/wp-content/uploads/2016/07/Marshall-DSL40C-40-Watt-Combo-Amp-clipped.png"
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

app.get("/amps", function(req, res){
  // res.render("amps", {amps: amps});
  Amp.find({}, function(err, allAmps){
    if(err){
      console.log("ERROR");
    } else {
      res.render("amps", {amps: allAmps});
    };
  });
});

app.get("/amps/new", function(req, res){
  res.render("new.ejs");
});

app.post("/amps", function(req, res){
  let name = req.body.name;
  let image = req.body.image;
  let newAmp = {name: name, image: image};
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
