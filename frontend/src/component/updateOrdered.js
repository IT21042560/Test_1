import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate  , useParams } from "react-router-dom";



function UpdatedOrdred() {

    const [order_id, setOrderedId] = useState("");
    const [customer_name, setCustomerName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();
    
    const {id} = useParams();
    
    const getOrdered = () => {
        axios.get("http://localhost:8035/orderedItemRoute/get/"+id)
        .then((res) => {
            const updateItem = {
                order_id: res.data.order_id,
                customer_name: res.data.customer_name,
                address: res.data.address,
                email: res.data.email,
                status: res.data.status,
                date: res.data.date
            }

            // console.log(res.data);
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

    return (
        <div style={{ backgroundSize:"container"}}> <br></br>
        <div className="form-style-5">
            <h1>Update Item</h1> <br></br>
            <form onSubmit={(e) => {
                e.preventDefault();

                
            const newItem = {
                    order_id, 
                    customer_name,
                    address,
                    email,
                    status,
                    date
                }
                        
                axios.put("http://localhost:8035/orderedItemRoute/update/"+id, newItem)
                .then(() => {
                    alert("Item updated");
                    navigate('/orderedItems');
                })
                .catch((err) => {
                    alert(err);
                })
            }}>
            <div className="container">
                <label for="id">Order ID</label>
                <input type="text" value={order_id} className="form-control" Readonly/>
            </div>
            <div className="container">
                <label for="name">Customer Name</label>
                <input type="text" value={customer_name} className="form-control" Readonly/>
            </div>
            <div className="container">
                <label for="address">Address</label>
                <input type="text" value={address} className="form-control" Readonly/>
            </div>
            <div className="container">
                <label for="email">Email</label>
                <input type="text" value={email} className="form-control" Readonly/>
            </div>

            <div className="container">
            <label for="status">Status </label>  

            <select value={status} onChange={(e)=>{
                    setStatus(e.target.value);
                }} className="form-control">  
            <option value = "Placed"> Placed </option>  
            <option value = "Confirmed"> Confirmed </option>    
            <option value = "Prepared"> Prepared </option>  
            <option value = "Delivered"> Delivered </option>   
            <option value = "Completed"> Completed </option>  
            </select>  
            </div>

            <div className="container">
                <label for="date">Date</label>
                <input type="text" value={date} className="form-control" 
                onChange={(e) => {
                    setDate(e.target.value)
                }}
                Readonly/>
            </div>

            <center><button type="submit" className="btn btn-primary" >update</button></center>
        </form>
        </div><br></br> </div>
    );
};

export default UpdatedOrdred;