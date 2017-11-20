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

// EDIT
router.get("/:comment_id/edit", checkCommentAuthor, function(req,res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {amp_id: req.params.id, comment: foundComment});
    };
  });
});

// UPDATE
router.put("/:comment_id", checkCommentAuthor, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else {
      res.redirect(`/amps/${req.params.id}`);
    };
  });
});

// DESTROY
router.delete("/:comment_id", checkCommentAuthor, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      res.redirect("back");
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

function checkCommentAuthor(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else {
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          res.redirect("back");
        };
      };
    });
  } else {
    res.redirect("back");
  };
};

module.exports = router;
