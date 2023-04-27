var mongoose = require("mongoose");
var productSchema = new mongoose.Schema({
  name: {
    type: String,
   // required: true,
  },
  price: {
    type: Number,
   // required: true,
  },
  catogory: {
    type: String,
   // required: true,
  },
  description: {
    type: String,
   // required: true,
  },
  quantity: {
    type: Number,
   // required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  Email: {
    type: String,
    
  },
});

module.exports = mongoose.model("Product", productSchema);
