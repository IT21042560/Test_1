import commis from './comModel.js'

export const addCommission = async (req, res) => {
    console.log(req.body)
    try {
        const Order_ID = req.body.Order_ID
        const Seller_ID = req.body.Seller_ID
        const Total_Amount = req.body.Total_Amount

        const Commission = Total_Amount * 8 / 100;
        const prefix = 'COM'
        const Com_ID = (prefix + Date.now())


        const newcommission = new commis({
            Com_ID,
            Order_ID,
            Seller_ID,
            Total_Amount,
            Commission
        })

        const response = await newcommission.save()
        if (response) {
            res.status(201).json({
                message: "Commission calculated..!",
                payload: newcommission
            })
        }
        else {
            res.status(404).json({
                message: 'error...!'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server error..!"
        })
    }
}

export const getAll =async (req,res) => {

    const commissions = await commis.find()
    if(commissions){
        res.status(201).json({
            message:"Success..!!",
            payload:commissions
        })
    }else{
        res.status(400).json({
            message:"Error...!"
        })
    }
}

