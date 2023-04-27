import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ComSchema = new Schema({

    Com_ID: {
        type:String,
        require:true
    },
    Seller_ID:{
        type:String,
        require:true
    },  
    Order_ID: {
        type: String,
        required: true
    },
    Total_Amount: {
        type: String,
        required: true,
    },
    Commission: {
        type: String,
        required: true,
    },
})
export default mongoose.model("Commission",ComSchema )