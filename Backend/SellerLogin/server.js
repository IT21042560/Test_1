const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

const seller = require("./routes/SellerRoute.js");

require("dotenv").config();

const PORT = process.env.PORT || 8050;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection success!");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
app.use("/seller", seller);

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// //const connection = require("./db");
// const seller = require("./routes/SellerRoute.js");

// // database connection

// // middlewares
// app.use(express.json());
// app.use(cors());

// // routes
// app.use("/seller", seller);

// const port = process.env.PORT || 8050;
// app.listen(port, console.log(`Listening on port ${port}...`));
