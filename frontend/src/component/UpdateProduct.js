import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [catogory, setCatogory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const { id } = useParams();
  console.log(id);

  const getProduct = () => {
    axios
      //retrive data
      .get("http://localhost:8040/Product/getProductById/" + id)
      .then((res) => {
        const UpdateProduct = {
          name: res.data.name,
          price: res.data.price,
          catogory: res.data.catogory,
          description: res.data.description,
          quantity: res.data.quantity,
        };

        // console.log(res.data);
        setName(UpdateProduct.name);
        setPrice(UpdateProduct.price);
        setCatogory(UpdateProduct.catogory);
        setDescription(UpdateProduct.description);
        setQuantity(UpdateProduct.quantity);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="icc">
      <div className="App new">
        <div>
          <div className="container">
            <div className="border">
              <br></br>
              <br></br>

              <br></br>
              <div className="w">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    const newProduct = {
                      name,
                      price,
                      catogory,
                      description,
                      quantity,
                    };
                    // console.log("hi", newDriver);
                    axios
                      .put(
                        "http://localhost:8040/Product/updateProduct/" + id,
                        newProduct
                      )
                      .then(() => {
                        alert("Product updated");
                      })
                      .catch((err) => {
                        alert(err);
                      });
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="model" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="model"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address" className="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age" className="form-label">
                      Catogory
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fuel"
                      value={catogory}
                      onChange={(e) => {
                        setCatogory(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="gender"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="gender"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                  </div>

                  <br />
                  <div className="form-group">
                    <Link to="/ViewProduct">
                      <button className="btn btn-danger" style={{}}>
                        Back
                      </button>
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-success"
                      style={{ marginLeft: "240px" }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
