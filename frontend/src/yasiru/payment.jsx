import './assert/payment.css';
import { useParams,useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axois from "axios";
import StripeCheckout from 'react-stripe-checkout';

export default function PaymentsAndCart(){

    const [Products, setProducts] = useState([]);
    const [Seller, setSeller] = useState([]);
    const [price,setPrice] = useState("");
    const { id, sid } = useParams();
    const [Order_ID, setOrderId] = useState("");
    const [Product_ID, setProductId] = useState("");
    const [Seller_ID, setSellerId] = useState("");
    const [Customer_Name, setCustomerId] = useState("");
    const [Address, setAddress] = useState("");
    const [Zip, setZip] = useState("");
    const [State, setState] = useState("");
    const [Phone_No, setPhoneNumber] = useState("");
    const [Email, setEmail] = useState("");
    const [Total_Amount, setAmunt] = useState("");
    const [Delivary, setDilvery] = useState("");
    const navigate = useNavigate();
    let amt;

    useEffect(() => {
        function getProduct() {
        axois
            .get("http://localhost:8040/Product/getProductById/"+id)
            .then((res) => {
            //console.log(res.data);
            setProducts(res.data);
            setPrice(res.data.price);
            setProductId(res.data.id);
            console.log(res.data.price)
            console.log(price)
           
            // setCommition(price + (price*(10/100)))
            //console.log(amount)
            // amt = price;
            // console.log(amt);
            // setAmunt(amt);
            })
            .catch((err) => {
            alert(err.message);
            });
        }
        getProduct();
    }, []);

    useEffect(() => {
        function getSeller() {
        axois
            .get("http://localhost:8050/seller/getOneSeller/"+sid)
            .then((res) => {
            //console.log(res.data);
            setSeller(res.data.payload);
            setSellerId(res.data.payload.Seller_ID);
            })
            .catch((err) => {
            alert(err.message);
            });
        }
        getSeller();
    }, []);
    
    
const [product,setProduct] = useState({
    name:"React form FB",
    price:10,
    productBy:"facebokk"
  })

  const makePayament = token => {
    const body = {
      token,
      product
    }
    const header = {
      "Content-Type":"application/json"
    }
    return fetch(`http://localhost:8116/payment`,{
      method:"POST",
      header,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("Responser", response)
      const {status} = response;
      navigate('/dash');
      console.log("Status",status)
    }).catch(error => console.log(error))
  }

  function sendData(e) {
    e.preventDefault();
    const newPayment = {
        Order_ID,
        Product_ID,
        Seller_ID,
        Customer_Name,
        Address,
        Zip,
        State,
        Phone_No,
        Email,
        Total_Amount,
        Delivary
    };
    
    axois
        .post("http://localhost:8042/Cart/addcart", newPayment)
        .then(() => {
          
        })
        .catch((err) => {
         // alert(err);
        });
  }

  //setAmunt((price) + (price  * (10/100)));
  //setOrderId(Product_ID + Seller_ID);
  
    return (
        <div>
           
            <div class="container d-lg-flex">
                <div class="box-1 bg-light user">
                    <div class="d-flex align-items-center mb-3">
                        <img src="https://images.pexels.com/photos/4925916/pexels-photo-4925916.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            class="pic rounded-circle" alt=""/>
                        <p class="ps-2 name">Oliur</p>
                    </div>
                    <div class="box-inner-1 pb-3 mb-3 ">
                        <div class="d-flex justify-content-between mb-3 userdetails">
                            <p class="fw-bold">{Products.name}</p>
                            <p class="fw-lighter"><span class="fas fa-dollar-sign"></span>${Products.price}</p>
                        </div>
                        <div id="my" class="carousel slide carousel-fade img-details" data-bs-ride="carousel"
                            data-bs-interval="2000">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#my" data-bs-slide-to="0" class="active"
                                    aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#my" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#my" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                        class="d-block w-100"/>
                                </div>
                            </div>
                          
                        </div>
                        <p class="dis info my-3">
                            {Products.description}
                        </p>
                        <div class="radiobtn">
                            <label for="one" class="box py-2 first">
                                <div class="d-flex align-items-start">
                                    <span class="circle"></span>
                                    <div class="course">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <span class="fw-bold">
                                                Quantity 
                                            </span>
                                            <span class="fas fa-dollar-sign">{Products.quantity}</span> <br></br>     
                                        </div>
                                        <span class="fw-bold">
                                                Category {Products.catogory}
                                        </span>
                                        <div>
                                        
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                        <span class="fw-bold">
                                        Seller Details 
                                        </span>
                                        </div>
                                        <span>Seller Name - {Seller.Full_Name} </span> <br />
                                        <span>Seller Email - {Seller.Admin_Email}</span> <br />
                                        <span>Seller Contact no - {Seller.Contact_no}</span> <br />
                                        </div>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="box-2">
                    <div class="box-inner-2">
                       
                        <form action="" onSubmit={sendData}>
                        <div class="my-3">
                            <p class="dis fw-bold mb-1">Name</p>
                            <input class="form-control" type="text" onChange={(e) => {
                            setCustomerId(e.target.value);
                            }}/>
                        </div>
                        <div class="my-3">
                            <p class="dis fw-bold mb-1">Tel Phone</p>
                            <input class="form-control" type="number"  onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            }}/>
                        </div>
                        <div class="my-3">
                            <p class="dis fw-bold mb-1">Delivary</p>
                            <input class="form-control" type="text"  onChange={(e) => {
                            setDilvery(e.target.value);
                            }}/>
                        </div>
                        <div class="my-3">
                            <p class="dis fw-bold mb-1">Email</p>
                            <input class="form-control" type="text"  onChange={(e) => {
                            setEmail(e.target.value);
                            }}/>
                        </div>
                       
                            <div>
                                <div class="address">
                                    <p class="dis fw-bold mb-3">Billing address</p>
                                    <textarea class="form-control zip" cols={10} rows={20}
                                         onChange={(e) => {
                                            setAddress(e.target.value);
                                            }}/>

                                    <div class="d-flex">
                                        <input class="form-control zip" type="text" placeholder="ZIP"
                                         onChange={(e) => {
                                            setZip(e.target.value);
                                            }}/>
                                        <input class="form-control state" type="text" placeholder="State" onChange={(e) => {
                                            setState(e.target.value);
                                            }}/>
                                    </div>
                                    <div class=" my-3">
                                        <p class="dis fw-bold mb-2">Commition</p>
                                        <div class="inputWithcheck">
                                            <input class="form-control" type="text" value={(price  * (10/100))}/>
                                            <span class="fas fa-check"></span>

                                        </div>
                                    </div>
                                    <div class="d-flex flex-column dis">
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <p>Subtotal</p>
                                            <p><span class="fas fa-dollar-sign"></span>{Products.price}</p>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <p>VAT<span>(20%)</span></p>
                                            <p><span class="fas fa-dollar-sign"></span>{price  * (10/100)}</p>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between mb-2">
                                            <p class="fw-bold">Total</p>
                                            <p class="fw-bold"><span class="fas fa-dollar-sign"></span>{(price) + (price  * (10/100)) }</p>
                                        </div>
                                    </div>
                                    <div>
                            <p class="fw-bold">Payment Details</p>
                            <p class="dis mb-3">Complete your purchase by providing your payment details</p>
                        </div>
                        <p class="dis fw-bold mb-2">Card details</p>
                        <center>
                                    <StripeCheckout
                            stripeKey="pk_test_51N0lfXFXk7msLsjQv4zhUPAl1iv2bTQQa7TXhr8wHZeJpicO8KrxyHjZr2BXrCUUOfbPne1iU37Zovnrryrjr4v700tF31BBWD"
                            token={makePayament}
                            name="Buy React"
                            amount={product.price * 100}
                            
                            >
                            <button className='btn btn-primary mt-2'>Pay $<span class="fas fa-dollar-sign px-1"></span>{Products.price}</button>
                            </StripeCheckout></center>
                                </div>
                              
                            </div>
                            
                                {/* <button
                                type="submit"
                                className="btn btn-success"
                                style={{ marginLeft: "240px" }}
                                >
                                Submit
                                </button> */}
                        </form>
                      
                        
                    </div>
                </div>
            </div>
        </div>
    
    )
}