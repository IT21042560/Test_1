import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="im">
      <div>
        <div>
          <div className="d-flex">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Add Product</h5>

                <a href="AddProduct" class="btn btn-primary">
                  Add Product
                </a>
              </div>
            </div>
            <div class="card" style={{ marginLeft: "250px" }}>
              <div class="card-body">
                <h5 class="card-title">View Product</h5>

                <a href="ViewProduct" class="btn btn-primary">
                  View Product
                </a>
              </div>
            </div>
          </div>

          <div className="d-flex"></div>
        </div>
      </div>
    </div>
  );
}
export default Home;
