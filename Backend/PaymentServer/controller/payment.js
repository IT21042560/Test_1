// const Payment = require("../models/payment") // Import the Payment model
// const stripe = require("stripe")("sk_test_51N0lfXFXk7msLsjQmm27poyxIX9XOuDehi3r5elnoIv5pRtadQsYOEhHnJeRIJOrOcgbl6Ou2b4kTiX0Yd1xezf200FxAxwoWA");
// const uuid = require("uuid");

// exports.addPayment = async (req, res) => {
 
//     const { product, token } = req.body;
//     console.log("Product", product);
//     console.log("Price", product.price);

//     const idempotencyKey = uuid();

//     return stripe.customers
//         .create({
//         email: token.email,
//         source: token.id
//         })
//         .then(customer => {
//         return stripe.charges.create(
//             {
//             amount: product.price * 100,
//             currency: 'usd',
//             customer: customer.id,
//             receipt_email: token.email,
//             description: product.name,
//             shipping: {
//                 name: token.card.name,
//                 address: {
//                 country: token.card.address_country
//                 }
//             }
//             },
//             { idempotencyKey }
//         );
//         })
//         .then(result => {
//         // Create a new Payment document in MongoDB
//         const payment = new Payment({
//             paymentId: result.payment_id,
//             amount: result.amount,
//             description: product.name,
//             email: token.email
//             // Add any other attributes you want to store in the Payment model
//         });

//         return payment.save(); // Save the payment document to MongoDB
//         })
//         .then(savedPayment => res.status(200).json(savedPayment))
//         .catch(err => console.log(err));
//    }
   
