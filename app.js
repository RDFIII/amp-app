const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/amps", function(req, res){
  let amps = [
    {name: "Vox", image: "https://media.sweetwater.com/images/items/750/AC30VR-large.jpg?45f280cb98"},
    {name: "Fender", image: "https://media.sweetwater.com/api/i/ha-af1d6c5a0d50f7bf__q-82__hmac-5bc8e421029c14ab4702bb899e6b0ee92f5d703b/images/items/750/65DeluxeRev-large.jpg"},
    {name: "Marshall", image: "https://cdn.guitarchalk.com/wp-content/uploads/2016/07/Marshall-DSL40C-40-Watt-Combo-Amp-clipped.png"}
  ];
  res.render("amps", {amps: amps});
});

app.listen(3000, function(){
  console.log("Listening on 3000");
});
