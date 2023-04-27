const router = require("express").Router();
let completedItem = require("../moduls/completedOrder");


router.route("/add").post((req,res) => {

    const order_id = req.body.order_id;
    const customer_name = req.body.customer_name;
    const address = req.body.address;
    const email = req.body.email;
    const status = req.body.status;
    const date = req.body.date;
        
    const newItem = new completedItem({
        
        order_id,
        customer_name,
        address,
        email,
        status,
        date
        
    })

    newItem.save().then(()=>{
        res.json(`${order_id} added to the order tracking system `)
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/delete/:id").delete(async (req,res) =>{
    let userId = req.params.id; 

    await completedItem.findByIdAndDelete(userId).then(() => {
       res.status(200).send({status: "Order Successfully delivered!"});
    }).catch((err)=>{
       console.log(err.message);
       res.status(500).send({status: "Error with remove attendance", error: err.message});
    })
})

router.route("/get").get((req,res) =>{

    completedItem.find().then((order)=>{
        res.json(order)
    }).catch((err) =>{
        console.log(err)
    })
})

module.exports = router;