import React,{useEffect,useState} from 'react'
import { Container, Table ,Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../actions/comAction';
import { Typography } from "@mui/material";



const Commision = () => {
  const Commis = useSelector(state => state.commission.commissions)
  console.log(Commis)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll())
  }, []);



  
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 10;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const records = Commis.slice(firstIndex, lastIndex);
	const nPage = Math.ceil(Commis.length / recordsPerPage);
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
					Commisions
				</Typography>

				{
					Commis.length > 0 ?
						<Table striped bordered hover style={{ fontSize: 14, alignItems: '' }} responsive="lg" >
							<thead>
								<tr>
									<th style={{ verticalAlign: 'middle ' }}>#</th>
									<th style={{ verticalAlign: 'middle ' }}>Com_ID</th>
									<th style={{ verticalAlign: 'middle ' }}>Seller_ID</th>
									<th style={{ verticalAlign: 'middle ' }}>Order_ID</th>
									<th style={{ verticalAlign: 'middle ' }}>Total_Amount</th>
									<th style={{ verticalAlign: 'middle ' }}>Commission</th>

								</tr>
							</thead>
							<tbody>
								{
									records.map((data, index) => (
										<tr key={{ index }}>
											<td scope="row">{index + 1}</td>
											<td scope="row">{data.Com_ID}</td>
											<td scope="row">{data.Seller_ID}</td>
											<td scope="row">{data.Order_ID}</td>
											<td scope="row">{data.Total_Amount}</td>
											<td scope="row">{data.Commission}</td>



										</tr>
									))
								}
							</tbody>
						</Table>
						:
						<div>
							<br /><br /><br /><br /><br />
							<h3><center>NO Commissions Found...</center></h3>
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

export default Commision