import React, { useEffect, useState } from 'react'
import { Container, Table ,Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../actions/authActions';
import { Typography } from "@mui/material";


const Admins = () => {
	const admins = useSelector(state => state.auth.admins)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAll())
	}, []);

	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const recordsPerPage = 8;
	const lastIndex = currentPage * recordsPerPage;
	const firstIndex = lastIndex - recordsPerPage;
	const records = admins.slice(firstIndex, lastIndex);
	const nPage = Math.ceil(admins.length / recordsPerPage);
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
					Admins
				</Typography>

				{
					records.length > 0 ?
						<Table striped bordered hover style={{ fontSize: 14, alignItems: '' }} responsive="lg" >
							<thead>
								<tr>
									<th style={{ verticalAlign: 'middle ' }}>#</th>
									<th style={{ verticalAlign: 'middle ' }}>Admin ID</th>
									<th style={{ verticalAlign: 'middle ' }}>Full Name</th>
									<th style={{ verticalAlign: 'middle ' }}>Admin Email</th>
									<th style={{ verticalAlign: 'middle ' }}>Contact Number</th>
									<th style={{ verticalAlign: 'middle ' }}>Job Title</th>

								</tr>
							</thead>
							<tbody>
								{
									admins.map((data, index) => (
										<tr key={{ index }}>
											<td scope="row">{index + 1}</td>
											<td scope="row">{data.Admin_ID}</td>
											<td scope="row">{data.Full_Name}</td>
											<td scope="row">{data.Admin_Email}</td>
											<td scope="row">{data.Contact_no}</td>
											<td scope="row">{data.Job_title}</td>



										</tr>
									))
								}
							</tbody>
						</Table>
						:
						<div>
							<br /><br /><br /><br /><br />
							<h3><center>NO Admins...</center></h3>
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

export default Admins