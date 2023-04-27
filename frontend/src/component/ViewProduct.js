import React, { useState, useEffect } from "react";
import axois from "axios";
import { Link } from "react-router-dom";
import axios from "axios";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { Button } from "@mui/material";

export default function ViewProduct() {
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
  const deleteData = (e) => {
    var result = window.confirm("Are you sure?");

    if (result == true) {
      axois
        .delete(`http://localhost:8040/Product/deleteProduct/${e._id}`)
        .then((res) => {})
        .catch((e) => {
          alert(e);
        });
    } else {
      e.preventDefault();
    }
  };

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
        <thead class="thead-dark">
          {Product && (
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price </th>
              <th scope="col">Catogory</th>
              <th scope="col">description</th>
              <th scope="col">quantity </th>
              <th></th>
              <th></th>
            </tr>
          )}
        </thead>

        <tbody>
          {Product &&
            Product.map((e, i) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.price}</td>
                <td>{e.catogory}</td>
                <td>{e.description}</td>
                <td>{e.quantity}</td>
                {/* <td className="middle">
                                    <button className="up_pur" >Update</button> */}
                <td>
                  <Link to={"/UpdateProduct/" + e._id}>
                    <button>Edit</button>
                  </Link>

                  <button
                    onClick={() => {
                      deleteData(e);
                    }}
                  >
                    Delete
                  </button>
                </td>
                {/* <td className="middle">
                  <Link to={"/UpdateDriver/" + e._id}>
                    <button className="btn btn-success mr">Update</button>
                  </Link>
                  <button className="btn btn-danger" onClick={() => { deleteData(e); }} >
                    Delete
                  </button>
                </td> */}

                {/* <td><button href="/accepted_orders" type="button2" class="rejectButton">Delete</button></td> */}
              </tr>
            ))}
        </tbody>
      </table>
      <div className="buttons">
        <Link to="/AddProduct">
          <center>
            <button
              type="button2"
              class="btn btn-success"
              style={{ marginLeft: "-200px" }}
            >
              Add Product
            </button>
          </center>
        </Link>
      </div>
    </div>
  );
}
