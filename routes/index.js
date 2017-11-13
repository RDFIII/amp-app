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
      console.log(err);
      return res.render("register");
    };
    passport.authenticate("local")(req, res, function(){
      res.redirect("/amps");
    });
  });
});

router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login", passport.authenticate("local",
  {successRedirect: "/amps",
   failureRedirect: "/login"
 }), function(req, res){
});

router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/amps");
});

// Middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  };
  res.redirect("/login");
};

module.exports = router;
