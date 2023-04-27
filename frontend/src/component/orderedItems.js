import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";


export default function AllOrdered(){

    const [items, setItem] = useState([]);

    useEffect(()=>{
        function getItem(){
        axios.get("http://localhost:8035/orderedItemRoute/get").then((res)=>{
            setItem(res.data);
            console.log(res.data)
        }).catch((err)=>{
            alert(err.message);
        })
        }
        getItem();
    },[items])

    const deleteDataC = (e) =>{
        var result = window.confirm("DO YOU WANT TO DELETE THIS ITEM?");
      if(result == true){
          axios.delete(`http://localhost:8035/orderedItemRoute/delete/${e._id}`).then((res)=>{
          }).catch(e =>{
              alert(e)
          })
      }else{
          e.preventDefault();
      }
    
   
    
    }
     //serach 
     const [serQuary,setSerQuary]=useState("");

     function serchItem(event){
           setSerQuary(event.target.value);
     }

     const addtoCompleted = (e) => {
        var result = window.confirm("DO YOU WANT TO MOVE THIS ITEM TO COMPLETED LIST?");
        if(result == true){
            const newItem = {
                order_id:e.order_id,
                customer_name:e.customer_name,
                address:e.address,
                email:e.email,
                status:e.status,
                date:e.date
            }
            console.log(newItem)
            axios.post("http://localhost:8035/completedOrder/add",newItem).then(() => {
                alert("Successfully Added !!!");
                deleteDataC(e);
            }).catch((err) => {
                alert(err);
            })
        }else{
            e.preventDefault();
        }
     }
 
    return (
       
        <div style={{backgroundSize:"100%"}}> <br></br> 
            <div style={{width:'95%'}}>
                <input onChange={serchItem}  placeholder="Search....." style={{float:'right'}}/>
                </div> 
                    <br></br><br></br>
                <center>
                 <h2>All Items</h2>
                 </center><br></br>

                 <table class="table table-hover" width={"80%"}>
                    <thead>
                        <tr>
                        <th scope="col">ODER NUMBER</th>
                        <th scope="col">CUSTOMER NAME</th>
                        <th scope="col">ADDRESS</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">DATE</th>
                        <th scope="col">EDIT</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                    {items.filter(e=>

                        e.order_id.toLowerCase().includes(serQuary) ||
                        e.order_id.includes(serQuary) ||
                        e.customer_name.toLowerCase().includes(serQuary) ||
                        e.customer_name.includes(serQuary) ||
                        e.status.toLowerCase().includes(serQuary) ||
                        e.status.includes(serQuary) ||
                        e.email.toLowerCase().includes(serQuary) ||
                        e.email.includes(serQuary) 
                        )
                        .map(item => (<tr>
                            <th scope="row">{item.order_id}</th>
                            <td>{item.customer_name}</td>
                            <td>{item.address}</td>
                            <td>{item.email}</td>
                            <td>{item.status}</td>
                            <td>{item.date}</td>
                            <td>
                                {item.status == "Completed"? 
                                    <td>
                                        <td><button className="btn btn-success"  onClick={() => {addtoCompleted(item)}}>Completed</button></td>
                                        <td> <Link to={"/update/" + item._id} className="btn btn-warning">Update</Link></td>
                                    
                                    </td>
                                    : <td>
                                        <td> <Link to={"/update/" + item._id} className="btn btn-warning">Update</Link></td>
                                        <td><button className="btn btn-danger" onClick={() => {deleteDataC(item)}}>Delete</button></td>
                                    </td>
                                    }                             
                            </td>
                            
                            </tr> 
                            ))}

                    </tbody>
                </table>              
            <div>
        </div>   
    </div>
  );
}

