import Cart from '../models/CartModels.js'
// import axios from 'axios'
import nodemailer from 'nodemailer'
import tls from 'tls'
import fs from 'fs'



export const Addcart = async (req, res) => {

    try {
// <<<<<<< HEAD
        // const Order_ID = req.body.Order_ID
        const Product_ID = req.body.Product_ID;
// =======
        const prefix = 'OID'
        const order_ID = (prefix + Date.now())
        const Order_ID = order_ID
// >>>>>>> 3247cfb815ef05c6643d59a7aa13e4055fb70579
        const Seller_ID = req.body.Seller_ID
        const Customer_Name = req.body.Customer_Name
        const Address = req.body.Address
        const Phone_No = req.body.Phone_No
        const Email = req.body.Email
        const Total_Amount = req.body.Total_Amount
        const Delivary = req.body.Delivary
        const Zip = req.body.Zip
        const State = req.body.State

        const newCart = new Cart({
            Order_ID,
            Product_ID,
            Seller_ID,
            Customer_Name,
            Address,
            Phone_No,
            Email,
            Total_Amount,
            Delivary,
            Zip,
            State
        })

        const response = newCart.save()
        if (response) {
            res.status(200).json({
                message: "success..!",
                payload: {
                    cart: newCart

                }
                
            })
        }
        else{
            res.status(401).json({
                message: "cart error..!"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Server error..!"
        })
    }



}

export const getCart = async (req, res) => {

    const allCart = await Cart.find().sort({date: -1});
    if (allCart) {
        res.status(200).json({
            message: "Fetched Successfully..!",
            payload: allCart
        })
    }
    else {
        res.status(404).json({
            message: "error fetched..!"
        })
    }
}

export const deleteCart = async (req, res) => {
    let Oid = req.body.oid
    try{

        const success = await Cart.findOneAndDelete({ Order_ID : Oid })
        if (success) {
            res.status(200).json({
                message: "Delete successfull..!"
            })
    
        } else {
            res.status(400).json({
                message: "Delete unsuccessfull..!"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"server error..!"
        })
    }



}
// this is for mails
export const deleteCartM = async (req, res) => {
    console.log(req.body)
    let Oid = req.body.oid
    const customer_name =req.body.Customer_Name
    const Email = req.body.email
    try{

        const success = await Cart.findOneAndDelete({ Order_ID : Oid })

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'webinctechnology@gmail.com',
                pass: 'dvymzjhgvxgyhpzg'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        const mailOptions = {
            from: process.env.EMAIL,
            to: Email,
            subject: 'Your Order has been rejected..!',
            text: `Dear ${customer_name},\n\nWe regret to inform you that we are unable to process your recent order(order id is ${Oid}) at this time due to some reason of our company. We apologize for any inconvenience this may have caused you.\n\nIf you have any questions or concerns, please contact our customer support team at [011-2456895].\n\nThank you for your understanding.\n\nBest regards,\nThe iHerb team`
        };
        
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        if (success) {
            res.status(200).json({
                message: "Delete successfull..!"
            })
    
        } else {
            res.status(400).json({
                message: "Delete unsuccessfull..!"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"server error..!"
        })
    }



}