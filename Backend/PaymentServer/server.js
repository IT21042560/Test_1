// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const app = express();



// dotenv.config();

// const PORT = process.env.PORT || 8115

// app.use(cors());
// app.use(bodyParser.json());

// const URL = process.env.MONGODB_URL;

// mongoose.connect(URL,{
   
// })

// const connection = mongoose.connection;
// connection.once("open", ()=>{
//     console.log("MongoDB Connection success!")
// })

// app.listen(PORT, () =>{
//     console.log(`Server is up and running on port ${PORT}`)
// })

// const payment = require("./routes/payment.js");
// app.use("/payment", payment);

const cors = require("cors");
const express = require("express")

const stripe = require("stripe")("sk_test_51N0lfXFXk7msLsjQmm27poyxIX9XOuDehi3r5elnoIv5pRtadQsYOEhHnJeRIJOrOcgbl6Ou2b4kTiX0Yd1xezf200FxAxwoWA");
const uuid = require("uuid");

const app = express();


app.use(express.json())
app.use(cors())  

app.post("/payemnt",(req,res) => {
    const {products, token} = req.body;
    console.log("Product",products);
    console.log("Price",products.price);

    const idempontencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source:token.id
    }).then(customer => {
        stripe.charges.create({
            amount: products.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: products.name,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }
        },{idempontencyKey})
    }).then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})
app.listen(8116,() => console.log("Listening at port 8116"))