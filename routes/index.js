const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Root Route
router.get("/", function(req, res){
  res.render("landing");
});

// AUTH ROUTES

// Show Register
router.get("/register", function(req, res){
  res.render("register");
});

// New Register
router.post("/register", function(req, res){
  let newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      req.flash("error", err.message);
      return res.render("register");
    };
    passport.authenticate("local")(req, res, function(){
      req.flash("success", `Welcome ${user.username}!`);
      res.redirect("/amps");
    });
  });
});

router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login", passport.authenticate("local",
  {successRedirect: "/amps",
   failureRedirect: "/login",
   failureFlash:true,
   successFlash:"Welcome Back!"
 }), function(req, res){
});

router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Successfully Logged Out");
  res.redirect("/amps");
});

module.exports = router;
