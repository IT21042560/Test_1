import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AllOrdered from './component/orderedItems';
import PaymentsAndCart from './yasiru/payment';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdatedOrdred from './component/updateOrdered';
import CompletedItems from './component/completedItems';
import OrderTraking from './component/orderTracking';
import Signin from './sithanga/scenes/SignIn/index'
import Header from './sithanga/scenes/dashboard/header'
import Dash from './sithanga/scenes/dashboard/Layout'
import Signup from './sithanga/scenes/signup/index'
import Layout from './sithanga/scenes/dashboard/Layout';
import Userprofile from './sithanga/scenes/dashboard/userProfile';
import RevOrders from './sithanga/scenes/dashboard/RevOrders';
import AcpOrders from './sithanga/scenes/dashboard/AcpOrders';
import Sellers from './sithanga/scenes/dashboard/Sellers';
import Commision from './sithanga/scenes/dashboard/Commision';
import Admins from './sithanga/scenes/dashboard/Admins';
import StripeCheckout from 'react-stripe-checkout';
import React,{useState} from 'react';


function App() {
  
    
  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <BrowserRouter>
        <Routes>

          <Route
            path="/orderedItems"
            element={<AllOrdered />}
          />

        <Route
            path="/payment/:id/:sid"
            element={<PaymentsAndCart />}
          />

          <Route
            path="/update/:id"
            element={<UpdatedOrdred />}
          />

          <Route
            path="/CompletedItems"
            element={<CompletedItems />}
          />

          <Route
            path="/OrderTraking"
            element={<OrderTraking />}
          />

          <Route
            path="/signin"
            element={<Signin />}
          />

          <Route
            path="/header"
            element={<Header />}
          />

          <Route
            path="/dash"
            element={<Dash />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />


          <Route element={<Layout />}>
            <Route path='/user Profile' element={<Userprofile />} />
            <Route path='/received orders' element={<RevOrders />} />
            <Route path='/accepted orders' element={<AcpOrders />} />
            <Route path='/sellers' element={<Sellers />} />
            <Route path='/commisions' element={<Commision />} />
            <Route path='/Team' element={<Admins />} />
           
          </Route>

          

        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;
