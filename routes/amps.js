const express = require("express");
const router = express.Router();
const Amp = require("../models/amp");
const middleware = require("../middleware");

// INDEX - show all amps
router.get("/", function(req, res){
  // res.render("amps", {amps: amps});
  Amp.find({}, function(err, allAmps){
    if(err){
      console.log("ERROR");
    } else {
      res.render("amps/index", {amps: allAmps, currentUser: req.user});
    };
  });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("amps/new.ejs");
});

// SHOW - shows info for one amp
router.get("/:id", function(req, res){
  Amp.findById(req.params.id).populate("comments").exec(function(err, foundAmp){
    if(err){
      console.log(err);
    } else {
      res.render("amps/show", {amp: foundAmp});
    };
  });
});

// EDIT
router.get("/:id/edit", middleware.checkAmpAuthor, function(req, res){
  Amp.findById(req.params.id, function(err, foundAmp){
    res.render("amps/edit", {amp: foundAmp});
    });
});

// UPDATE
router.put("/:id", middleware.checkAmpAuthor, function(req, res){
  Amp.findByIdAndUpdate(req.params.id, req.body.amp, function(err, updatedAmp){
    if(err){
      res.redirect("/amps");
    } else {
      res.redirect(`/amps/${req.params.id}`);
    };
  });
});

// NEW, CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let price = req.body.price;
  let author = {
    id: req.user._id,
    username: req.user.username
  };
  let newAmp = {name: name, image: image, description: description, author: author, price: price};
  Amp.create(newAmp, function(err, newlyCreated){
    if(err){
      console.log("ERROR");
    } else {
      res.redirect("/amps");
    };
  });
});

// DESTROY
router.delete("/:id", middleware.checkAmpAuthor, function(req, res){
  Amp.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/amps");
    } else {
      res.redirect("/amps");
    };
  });
});


module.exports = router;
