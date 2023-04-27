import React, { useState, useEffect } from "react";
import axois from "axios";
import { Link } from "react-router-dom";
import axios from "axios";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { Button } from "@mui/material";

export default function BuyerProduct() {
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    function getProduct() {
      axois
        .get("http://localhost:8040/Product/viewProducts")
        .then((res) => {
          console.log(res.data);
          setProduct(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getProduct();
  }, []);

  return (
    <div className="icc">
      <br></br>
      <div className="row">
        <div className="col-md-8"></div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-sm-8"></div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="col-lg-9 mt-2 mb-2"
          style={{ marginTop: "40px", width: "1300px", marginLeft: "300px" }}
        ></div>
      </div>

      <table
        className="table"
        style={{ marginTop: "40px", width: "1200px", marginLeft: "200px" }}
      >
        <tbody>
          {Product &&
            Product.map((e, i) => (
              
                <td>
                  {e.name}<br></br>
                  Product Price<br></br>
                  {e.price}<br></br>
                  {e.catogory}<br></br>
                  {e.description}<br></br>
                  {/* {e.quantity}<br></br> */}
                </td>
              
            ))}
        </tbody>
      </table>
    </div>
  );
}
