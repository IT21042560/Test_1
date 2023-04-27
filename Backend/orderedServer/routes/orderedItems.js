const router = require("express").Router();
const nodemailer = require('nodemailer');
const {EMAIL, PASSWORD} = require('./env.js');
let OrderedItem = require("../moduls/orderedItems.js");
const Mailgen = require("mailgen");
const moment = require("moment")
const tls = require('tls');
const fs = require('fs');
const axios = require('axios')


router.route("/add").post(async(req,res) => {
    try{

        // console.log(req.body)
        const Dates = req.body.date;
        const formatedDate = moment(Dates).format("DD/DD/YYYY, h:mm a z")
    
        const order_id = req.body.order_id;
        const customer_name = req.body.customer_name;
        const address = req.body.address;
        const email = req.body.email;
        const status = req.body.status;
        const contact_no = req.body.contact_no
        const total_amount = req.body.total_amount;
        const delivary = req.body.delivary;
        const date = formatedDate;
            
        const newItem = new OrderedItem({
            
            order_id,
            customer_name,
            address,
            email,
            status,
            contact_no,
            total_amount,
            delivary,
            date
            
        })
        //send mail when admin accept the order
    
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: EMAIL,
                pass: PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
        const mailOptions = {
            from: EMAIL,
            to: email,
            subject: 'Your Order has been accepted..!',
            text: `Dear ${customer_name},\n\nWe are pleased to inform you that your recent order on our iHerb website has been checked and accepted. We appreciate your business and hope to continue serving you with the highest quality products and services.\n\nOrder summary\n\nOrder ID : ${order_id}\nCustomer Name: ${customer_name}\nAddress: ${address}\nTotal Amount: ${total_amount}\n\n\nThank you for choosing our website.\n\nBest regards,\nThe iHerb team`
        };
        
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    
        // new item add to the order list and remove from the cart
        const addRes = newItem.save();
        console.log(addRes)
        const form ={
            oid :order_id
        }
    
        const deleteRes = await axios.post('http://localhost:8042/Cart/deleteCart',form);
        if(addRes && deleteRes ){
            res.status(201).json({
                message: `${order_id} added to the order tracking system `,
                payload:{addRes}
            })
        }else if(!addRes){
            res.status(404).json({
                message:"error occur in Data saving...!"
            })
        }else if(!deleteRes){
            res.status(400).json({
                message:"error occur in Data deleting from the cart...!"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"server error..!"
        })
    }
    
    
    
    
    
    

})


router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const order_id = req.body.order_id;
    const customer_name = req.body.customer_name;
    const address = req.body.address;
    const email = req.body.email;
    const status = req.body.status;
    const date = req.body.date;

    const updateItem = {
        order_id, 
        customer_name, 
        address, 
        email, 
        status, 
        date
    }

    let config = {
        service:'gmail',
        auth:{
            user:EMAIL,
            pass:PASSWORD
        }
    }

    let transpoter = nodemailer.createTransport(config);

    let MailGenereto = new Mailgen({
        theme:'default',
        product: {
            name: "Express Herb",
            link: "https://mailgen.js/"
        }
    })

    let response = {
        body:{
            name:customer_name,
            intro:`Your Order has `+ status + " !",
            table:{
                data:[
                    {
                    order:order_id,
                    address:address,
                    date:new Date()
                    }
                ]
            },
            outro:"Hope to do more business !!!"
        }
    }

    let mail = MailGenereto.generate(response)

    let message = {
        from : EMAIL,
        to : email,
        subject:"Place Order",
        html: mail
    }

    transpoter.sendMail(message)

    const update = await OrderedItem.findByIdAndUpdate(userId, updateItem).then(() => {
        res.status(200).send({status: "Item Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updation data"});
    })

    
})

router.route("/delete/:id").delete(async (req,res) =>{
    let userId = req.params.id; 
    console.log(userId)
     await OrderedItem.findByIdAndDelete(userId).then(() => {
        res.status(200).json({
            message: "Order Successfully delivered!"});
            
     }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with remove attendance", error: err.message});
     })


})

router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;
    
    const odr = await OrderedItem.findById(userId)
    .then((order) => {
        res.json(order);
    })
    .catch((err) => {
        res.status(500).send({status: "Error with finding data", error: err.message});
    });
})

router.route("/get").get((req,res) =>{
    OrderedItem.find().then((order)=>{
        res.json(order)
    }).catch((err) =>{
        console.log(err)
    })
})

module.exports = router;