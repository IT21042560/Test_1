const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SellerSchema = new Schema(
  {
    Seller_Id: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Contact_no: {
      type: String,
      required: true,
    },
    Hash_password: {
      type: String,
      required: true,
    },
    ProfilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

SellerSchema.virtual("password").set(function (Password) {
  this.Hash_password = bcrypt.hashSync(Password, 8);
});

SellerSchema.methods = {
  authenticate: function () {
    return bcrypt.compareSync(password, this.Hash_password);
  },
};

module.exports = mongoose.model("Admin", SellerSchema);
