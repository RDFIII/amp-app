const mongoose = require("mongoose");
const Amp = require("./models/amp");
const Comment = require("./models/comment");

let data = [
  {
   name: "Vox",
   image: "http://media.guitarcenter.com/is/image/MMGS7/Custom-AC15C1-15W-1x12-Tube-Guitar-Combo-Amp-Vintage/423619000001000-00-500x500.jpg",
   description: "klasj;fkjds;faj;sflhiuahsidfdsal"
 },
 {
  name: "Marshall",
  image: "https://www.guitarchalk.com/wp-content/uploads/2016/07/Marshall-DSL40C-40-Watt-Combo-Amp-clipped.png",
  description: "fdasfjsahflihdasiufhldsahfdsahfa"
 },
 {
  name: "Fender",
  image: "https://media.sweetwater.com/images/items/750/65DeluxeRVWR-large.jpg?16f4b8b1f2",
  description: "dshfadshfdashflihsdauafdsjfidasf"
 }
];

function seedDB(){
    //Remove all amps
    Amp.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed amps");
        //Remove all comments
        Comment.remove({}, function(err) {
          if(err){
            console.log(err);
          }
          console.log("Removed comments");
            //add a few campgrounds
          data.forEach(function(seed){
            Amp.create(seed, function(err, amp){
              if(err){
                console.log(err)
                  } else {
                    console.log("added an amp");
                        //create a comment
                    Comment.create(
                      {
                        text: "Wow wonderful amp, just wonderously wonderful",
                        author: "Homer Simpson"
                      }, function(err, comment){
                        if(err){
                          console.log(err);
                        } else {
                          amp.comments.push(comment);
                          amp.save();
                          console.log("Created new comment");
                      }
                    });
                  }
                });
            });
        });
    });
}

module.exports = seedDB;
