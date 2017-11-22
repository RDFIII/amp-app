const Amp = require("../models/amp");
const Comment = require("../models/comment");

let middlewareObj = {};

middlewareObj.checkAmpAuthor = function(req, res, next){
  if(req.isAuthenticated()){
    Amp.findById(req.params.id, function(err, foundAmp){
      if(err){
        res.redirect("back");
      } else {
        if(foundAmp.author.id.equals(req.user._id)){
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

middlewareObj.checkCommentAuthor = function(req, res, next){
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

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  };
  res.redirect("/login");
};

module.exports = middlewareObj
