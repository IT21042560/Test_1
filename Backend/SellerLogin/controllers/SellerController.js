const { response } = require("express");
const Seller = require("../models/SellerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshtokens = [];
var x;

exports.SellerRegistration = async (req, res) => {
  try {
    let file = "N/A";
    if (req.file) {
      file = req.file.filename;
    }
    const ExsistSeller = await Seller.findOne({ Email: req.body.Email });
    console.log(!ExsistSeller);
    if (ExsistSeller) {
      res.status(404).json({
        message: "Seller Already registered..!",
      });
    } else if (!ExsistSeller) {
      const prefix = "SID";
      const S_ID = prefix + Date.now();

      const Hash_password = await bcrypt.hash(req.body.Hash_password, 10);
      const newSeller = new Seller({
        Seller_Id: S_ID,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Contact_no: req.body.Contact_no,
        Hash_password: Hash_password,
        ProfilePicture: file,
      });

      const newAcct = await newSeller.save();
      if (newAcct) {
        res.status(201).json({
          message: "Registration Sucessfull..!",
          payload: newAcct,
        });
      } else {
        res.status(400).json({
          message: "Somthing Went Wrong In Account Creating..!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error,
    });
  }
};

exports.Signin = async (req, res) => {
  try {
    const RegisterdSeller = await Seller.findOne({ Email: req.body.Email });
    console.log(RegisterdSeller);
    x=RegisterdSeller;
    if (RegisterdSeller) {
      const enterdPwd = req.body.Hash_password;
      const dbPwd = RegisterdSeller.Hash_password;
      // console.log(enterdPwd,dbPwd)
      const checkPwd = await bcrypt.compare(enterdPwd, dbPwd);
      console.log(checkPwd);
      if (checkPwd) {
        const token = jwt.sign(
          { Email: req.body.Email },
          process.env.JWT_TOKEN_KEY,
          { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
          { Email: req.body.Email },
          process.env.REFRESH_TOKEN_KEY,
          { expiresIn: "24h" }
        );
        // console.log("token  "+token)
        // console.log("refresh token    "+refreshToken)
        refreshtokens.push(refreshToken);
        res.status(201).json({
          mesage: "Login Successfull..!",
          token,
          refreshToken,
          payload: { RegisterdSeller },
        });
      } else {
        res.status(401).json({
          message: "Incorrect Password..!",
        });
      }
    } else {
      res.status(404).json({
        message: "Seller Not Registered..!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error..!",
      error: error,
    });
  }
};

exports.tokenRefresh = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) {
    res.status(401).json({
      message: "Unauthorized..!",
    });
  } else if (!refreshtokens.includes(refreshToken)) {
    res.status(403).json({
      message: "Forbidden..!",
    });
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
      if (err) {
        res.status(403).json({
          message: "Forbidden..!",
        });
      } else {
        const token = jwt.sign(
          { Admin_Email: req.body.Admin_Email },
          process.env.JWT_TOKEN_KEY,
          { expiresIn: "1h" }
        );
        res.status(201).json({
          message: "Session Extended..!",
          token,
        });
      }
    });
  }
};

exports.Signout = (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    refreshtokens = refreshtokens.filter((token) => token !== refreshToken);
    res.status(200).json({
      message: "Signout successful!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

exports.getAllSeller = async (req, res) => {
  try {
    const allSeller = await Seller.find();
    if (allSeller) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: allSeller,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getOneSeller = async (req, res) => {
  try {
    let userId = req.params.id;
    const OneSeller = await Seller.findById(userId);
    if (OneSeller) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: OneSeller,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.RegisterdSeller=x;
