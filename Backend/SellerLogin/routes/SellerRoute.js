const express = require("express");
const {
  SellerRegistration,
  Signin,
  Signout,
  tokenRefresh,
  getAllSeller,
  getOneSeller
} = require("../controllers/SellerController");
//const requireSignin = require('../middleware/auth.js')
const multer = require("multer");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "UploadImage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/Signup", upload.single("ProfilePicture"), SellerRegistration);
router.post("/Signin", Signin);
router.delete("/Signout", Signout);
router.post("/Token", tokenRefresh);
router.get("/seller", getAllSeller);
router.get("/getOneSeller/:id", getOneSeller);

module.exports = router;
