const router = require("express").Router();
var express = require("express");
let Product = require("../models/Product");
let ss = require("../../SellerLogin/controllers/SellerController")
const ObjectID = require("mongodb").ObjectId;
var multer = require("multer");
var fs = require("fs");
var path = require("path");
var app = express();

let x;


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });
const prefix = "SID";
const S_ID = prefix + Date.now();

const addProduct = async (req, res) => {
  const Email = x;
  const name = req.body.name;
  const price = Number(req.body.price);
  const catogory = req.body.catogory;
  const description = req.body.description;
  const quantity = Number(req.body.quantity);

  const newProduct = new Product({
    Email,
    name,
    price,
    catogory,
    description,
    quantity,
  });
  newProduct
    .save()
    .then(() => {
      res.json("Product Added");
    })
    .catch((err) => {
      console.log(err);
    });
};
const addEmail = async (req, res) => {
 const Email =req.body.Email;
 x=Email
 console.log(Email)

  const newProduct = new Product({
    Email,
  });
  newProduct
    .save()
    .then(() => {
      res.json("Email Added");
    })
    .catch((err) => {
      console.log(err);
    });
};

const viewProducts = async (req, res, next) => {
  await Product.find()
    .then((Product) => {
      res.json(Product);
      console.log(x)
      //res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateProduct = async (req, res) => {
  let userId = req.params.id;
  // const name = req.body.name;
  const { name, price, catogory, description, quantity } = req.body;

  const updateProduct = {
    name,
    price,
    catogory,
    description,
    quantity,
  };
  const update = await Product.findByIdAndUpdate(userId, updateProduct)
    .then(() => {
      res.status(200).send({ status: "Product updated " });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });

  // return res.status(201).json({updateDrivers })
};
const deleteProduct = async (req, res) => {
  let userId = req.params.id;
  await Product.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ status: "Product deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete Product", error: err.message });
    });
};

const getProductById =  async (req, res) => {
  // let id = req.params.id;
  // await Product.findById(id)
  //   .then((response) => {
  //     res.status(200).json(response);
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     res
  //       .status(500)
  //       .send({ status: "Error with get product", error: err.message });
  //   });
   let userId = req.params.id;
    
    const odr = await Product.findById(userId)
    
    .then((order) => {
      console.log(userId)
     
        res.json(order);
    })
    .catch((err) => {
        res.status(500).send({status: "Error with finding data", error: err.message});
    });
    console.log(odr)
};

exports.addProduct = addProduct;
exports.viewProducts = viewProducts;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getProductById = getProductById;
exports.addEmail = addEmail;
//module.exports= router;
