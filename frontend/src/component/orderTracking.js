import '../assest/css/style.css'
import axios from 'axios';
import React, {useState,useParams, useEffect} from 'react';

export default function OrderTraking(){

    
    const [order_id, setOrderedId] = useState("");
    const [customer_name, setCustomerName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
   
    
   // const {id} = useParams();
    
    const getOrdered = () => {
        axios.get("http://localhost:8035/orderedItemRoute/get/6447b2051fbb3f370b968c2f")
        .then((res) => {
            const updateItem = {
                order_id: res.data.order_id,
                customer_name: res.data.customer_name,
                address: res.data.address,
                email: res.data.email,
                status: res.data.status,
                date: res.data.date
            }

             console.log(res.data);
            setOrderedId(updateItem.order_id);
            setCustomerName(updateItem.customer_name);
            setAddress(updateItem.address);
            setEmail(updateItem.email);
            setStatus(updateItem.status);
            setDate(new Date());
            
        })
        .catch((err) => {
            alert(err.message);
        });
    }

    useEffect(() => getOrdered(), []);


    //

    return (
        <div class="container">
            
                <header class="card-header"> My Orders / Tracking </header>
                <div class="card-body">
                    <h6>Order ID: {order_id}</h6>
                    <article class="card">
                        <div class="card-body row">
                            <div class="col"> <strong>Estimated Delivery time:</strong> <br/>29 nov 2019 </div>
                            <div class="col"> <strong>Shipping BY:</strong> <br/> DHL, | <i class="fa fa-phone"></i> +1598675986 </div>
                            <div class="col"> <strong>Status:</strong> <br/> {status} </div>
                            <div class="col"> <strong>Tracking #:</strong> <br/> BD045903594059 </div>
                        </div>
                    </article>



                    {
                        status == "Confirmed" ?
                        <div class="track">
                        <div class="step active"> <span class="icon"> <i class="bi bi-check-circle"></i> </span> <span class="text">Order Confirming</span> </div>
                        <div class="step"> <span class="icon"> <i class="fa fa-user"></i> </span> <span class="text"> Ready for prepare</span> </div>
                        <div class="step"> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text">Ready for Delivere  </span> </div>
                        <div class="step"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">Ready for Complete</span> </div>
                        <hr/> 
                        </div>: 
                        status == "Prepared" ?
                        <div class="track">
                        <div class="step active"> <span class="icon"> <i class="bi bi-check-circle"></i> </span> <span class="text">Order Confirmed</span> </div>
                        <div class="step active"> <span class="icon"> <i class="fa fa-user"></i> </span> <span class="text"> Order Preparing </span> </div>
                        <div class="step"> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> Ready for Delivere </span> </div>
                        <div class="step"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">Ready for Complete</span> </div>
                        <hr/> 
                        </div>:
                         status == "Delivered" ?
                         <div class="track">
                        <div class="step active"> <span class="icon"> <i class="bi bi-check-circle"></i> </span> <span class="text">Order Confirmed</span> </div>
                        <div class="step active"> <span class="icon"> <i class="fa fa-user"></i> </span> <span class="text"> Order Prepared</span> </div>
                        <div class="step active"> <span class="icon"> <i class="fa-truck"></i> </span> <span class="text"> Order Delivering </span> </div>
                        <div class="step"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">Ready for Complete</span> </div>
                        <hr/> 
                        </div>: 
                         status == "Completed" ?
                         <div class="track">
                        <div class="step active"> <span class="icon"> <i class="bi bi-check-circle"></i> </span> <span class="text">Order Confirmed</span> </div>
                        <div class="step active"> <span class="icon"> <i class="fa fa-user"></i> </span> <span class="text"> Order Prepared</span> </div>
                        <div class="step active"> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> Order Delivered </span> </div>
                        <div class="step active"> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">Order Completed</span> </div>
                        <hr/> 
                        </div>: null
                    }
                    <br/><br/>
                    <a href="#" class="btn btn-warning" data-abc="true"> <i class="fa fa-chevron-left"></i> Back to orders</a>
                </div>
            
        </div>
    )

}
