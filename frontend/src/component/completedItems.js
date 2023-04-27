import axios from 'axios';
import React, {useState, useEffect} from 'react';


export default function CompletedItems(){

    const [items, setItems] = useState([]);

    useEffect(()=>{
        function getItem(){
        axios.get("http://localhost:8040/completedOrder/get").then((res)=>{
            setItems(res.data);
            console.log(res.data)
        }).catch((err)=>{
            alert(err.message);
        })
        }
        getItem();
    },[items])

    const deleteDataC = (e) =>{
        var result = window.confirm("DO YOU WANT TO DELETE THIS ORDER ?");
      if(result == true){
          axios.delete(`http://localhost:8040/completedOrder/delete/${e._id}`).then((res)=>{
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



    console.log(serQuary);

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
                        <td>{item.status}</td>
                        <td><button className="btn btn-danger"  onClick={() => {deleteDataC(item)}}>DELETE</button></td>
                       
                        </tr> 
                        ))}

                </tbody>
            </table>              
        <div>
    </div>   
</div>
  );
}

