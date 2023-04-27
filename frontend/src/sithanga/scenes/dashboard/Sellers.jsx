import React, { useEffect, useState } from 'react'
import { Typography } from "@mui/material";
import { Container, Table ,Nav} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSellers } from '../../actions/sellerAction'


const Selleres = () => {

  const sellers = useSelector(state => state.seller.sellers)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSellers())
  }, []);

  const sellerDetails = (id) => {
    console.log(id)
  }


  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = sellers.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(sellers.length / recordsPerPage);
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

  return (
    <div>
      <Container>
        <Typography variant="h4" color="#ac1717" fontWeight="600" sx={{ m: "0 0 5px 0" }}>
          Sellers
        </Typography>

        {
          sellers.length > 0 ?
            <Table striped bordered hover style={{ fontSize: 14, alignItems: '' }} responsive="lg" >
              <thead>
                <tr>
                  <th style={{ verticalAlign: 'middle ' }}>#</th>
                  <th style={{ verticalAlign: 'middle ' }}>Seller ID</th>
                  <th style={{ verticalAlign: 'middle ' }}>First Name</th>
                  <th style={{ verticalAlign: 'middle ' }}>Last Name</th>
                  <th style={{ verticalAlign: 'middle ' }}>Contact Number</th>
                  <th style={{ verticalAlign: 'middle ' }}>Email</th>

                </tr>
              </thead>
              <tbody>
                {
                  records.map((data, index) => (
                    <tr key={{ index }} onClick={(e) => { sellerDetails(data.Seller_Id) }} style={{ cursor: "pointer" }}>
                      <td scope="row">{index + 1}</td>
                      <td scope="row">{data.Seller_Id}</td>
                      <td scope="row">{data.FirstName}</td>
                      <td scope="row">{data.LastName}</td>
                      <td scope="row">{data.Contact_no}</td>
                      <td scope="row">{data.Email}</td>



                    </tr>
                  ))
                }
              </tbody>
            </Table>
            :
            <div>
              <br /><br /><br /><br /><br />
              <h3><center>NO Sellers...</center></h3>
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

export default Selleres