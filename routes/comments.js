const express = require("express");
const router = express.Router({mergeParams: true});
const Amp = require("../models/amp");
const Comment = require("../models/comment");

// Comments New
router.get("/new", isLoggedIn, function(req, res){
  Amp.findById(req.params.id, function(err, amp){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {amp: amp});
    };
  });
});

// Comments Create
router.post("/", isLoggedIn, function(req, res){
  Amp.findById(req.params.id, function(err, amp){
    if(err){
      console.log(err);
      res.redirect("/amps");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          amp.comments.push(comment);
          amp.save();
          res.redirect(`/amps/${amp._id}`);
        };
      });
    };
  });
});

// Middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  };
  res.redirect("/login");
};

module.exports = router;
