import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const CartSchema = new Schema({

    Order_ID: {
        type: String
    },
    Product_ID:{
        type:String
    },
    Seller_ID: {
        type: String
    },
    Customer_Name: {
        type: String
    },
    Address: {
        type: String
    },
    Zip:{
        type:String
    },
    State:{
        type: String
    },
    Phone_No: {
        type: String
    },
    Email: {
        type: String,
        lowercase: true
    },
    Total_Amount: {
        type: String
    },

    Delivary: {
        type: String
    },

},{timestamps:true})

export default mongoose.model("Cart",CartSchema);

