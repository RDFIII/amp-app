// const mongoose = require("mongoose");
//
// let ampSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   description: String,
//   comments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Comment"
//     }
//   ]
// });
//
// module.exports = mongoose.model("Amp", ampSchema);

const mongoose = require("mongoose");
let ampSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
module.exports = mongoose.model("Amp", ampSchema);
