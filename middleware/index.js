const Amp = require("../models/amp");
const Comment = require("../models/comment");

let middlewareObj = {};

middlewareObj.checkAmpAuthor = function(req, res, next){
  if(req.isAuthenticated()){
    Amp.findById(req.params.id, function(err, foundAmp){
      if(err){
        req.flash("error", "Not Found");
        res.redirect("back");
      } else {
        if(foundAmp.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You Don't Have Permission Do That");
          res.redirect("back");
        };
      };
    });
  } else {
    req.flash("error", "Please Log In");
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
          req.flash("error", "You Don't Have Permission To Do That");
          res.redirect("back");
        };
      };
    });
  } else {
    req.flash("error", "You Must Be Logged In");
    res.redirect("back");
  };
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  };
  req.flash("error", "Please Login First");
  res.redirect("/login");
};

module.exports = middlewareObj
