const mongoose = require("mongoose");

let ampSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

module.exports = mongoose.model("Amp", ampSchema);
