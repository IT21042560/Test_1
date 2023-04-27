import React, { useEffect, useState } from 'react'
import { Container, Table, Nav } from 'react-bootstrap'
import { Typography, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { GetCart } from '../../actions/cartAction';
import FileDownloadDoneRoundedIcon from '@mui/icons-material/FileDownloadDoneRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { acceptOrder } from '../../actions/orderActions'
import { deleteCart } from '../../actions/cartAction'
import Swal from 'sweetalert2';

const RevOrders = () => {

  const carts = useSelector(state => state.cart.carts)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCart())
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = carts.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(carts.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  function nextPage() {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }


  const AcceptOrder = (data) => {

    const form = {
      order_id: data.Order_ID,
      customer_name: data.Customer_Name,
      address: data.Address,
      contact_no: data.Phone_No,
      email: data.Email,
      status: 'Accepted',
      total_amount: data.Total_Amount,
      delivary: data.Delivary,
      date: data.createdAt
    }
    Swal.fire({
      title: 'Are you sure want to Accept this Order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#008000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No!'

    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(acceptOrder(form))
      }
    })


  }

  const rejectOrder = (id) => {

    Swal.fire({
      title: 'Are you sure want to Delete this Order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#008000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No!'

    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteCart(id))
      }
    })
  }

  return (
    <div>

      <Container>
        <Typography variant="h4" color="#ac1717" fontWeight="600" sx={{ m: "-30px 0 5px 0" }}>
          Received Orders
        </Typography>

        {
          carts.length > 0 ?
            <Table striped bordered hover style={{ fontSize: 14, alignItems: '' }} responsive="lg" >
              <thead>
                <tr>
                  <th style={{ verticalAlign: 'middle ' }}>#</th>
                  <th style={{ verticalAlign: 'middle ' }}>Order ID</th>
                  <th style={{ verticalAlign: 'middle ' }}>Seller ID</th>
                  <th style={{ verticalAlign: 'middle ' }}>Customer Name</th>
                  <th style={{ verticalAlign: 'middle ' }}>Address</th>
                  <th style={{ verticalAlign: 'middle ' }}>Phone Number</th>
                  <th style={{ verticalAlign: 'middle ' }}>Email</th>
                  <th style={{ verticalAlign: 'middle ' }}>Total Amount</th>
                  <th style={{ verticalAlign: 'middle ' }}>Delivary</th>
                  <th style={{ verticalAlign: 'middle ' }}>Actions</th>

                </tr>
              </thead>



              <tbody>
                {
                  records.map((data, index) => (
                    <tr key={{ index }}>
                      <td scope="row">{index + 1}</td>
                      <td scope="row">{data.Order_ID}</td>
                      <td scope="row">{data.Seller_ID}</td>
                      <td scope="row">{data.Customer_Name}</td>
                      <td scope="row">{data.Address}</td>
                      <td scope="row">{data.Phone_No}</td>
                      <td scope="row">{data.Email}</td>
                      <td scope="row">{data.Total_Amount}</td>
                      <td scope="row">{data.Delivary}</td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "row" }}>

                          <IconButton onClick={(e) => { AcceptOrder(data) }}>
                            <FileDownloadDoneRoundedIcon size={20} style={{ color: "blue", height: "1.2rem" }} />
                          </IconButton>
                          <IconButton onClick={(e) => { rejectOrder(data) }}>
                            <CancelOutlinedIcon size={20} style={{ color: "red", height: "1.2rem" }} />
                          </IconButton>

                        </div>

                      </td>



                    </tr>
                  ))
                }
              </tbody>
            </Table>
            :
            <div>
              <br /><br /><br /><br /><br />
              <h3><center>NO Any Orders Yet...</center></h3>
            </div>
        }
        <Nav>
          <ul className='pagination'>
            <li className='Nav-link'>
              <span className='page-link' onClick={prePage} style={{cursor:"pointer"}}>Prev</span>
            </li>
            {
              numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                  <span className='page-link' onClick={() => changeCPage(n)} style={{cursor:"pointer"}}>{n}</span>
                </li>
              ))
            }
            <li className='Nav-link'>
              <span className='page-link' onClick={nextPage} style={{cursor:"pointer"}}>Next</span>
            </li>
          </ul>
        </Nav>
      </Container>
    </div>
  )
}

export default RevOrders