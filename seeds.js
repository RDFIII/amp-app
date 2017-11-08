const mongoose = require("mongoose");
const Amp = require("./models/amp");

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
  // remove all amps
  Amp.remove({}, function(err){
    if(err){
      console.log(err);
    } else {
      console.log("removed amps");
    };
  });
  // create amps
  data.forEach(function(seed){
    Amp.create(seed, function(err, data){
      if(err){
        console.log(err);
      } else {
        console.log("added amp");
      };
    });
  });
};

module.exports = seedDB;
