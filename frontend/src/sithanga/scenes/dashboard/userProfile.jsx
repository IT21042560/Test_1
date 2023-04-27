import React,{useEffect} from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage
} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2'
import { deleteAdmin, isLoggedIn } from '../../actions/authActions';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Button } from 'react-bootstrap'
import { Navigate } from 'react-router-dom';

const UserProfile = () => {

  const user = useSelector(state => state.auth.user.RegisterdAdmin);
  const authenticated = useSelector(state => state.auth.authenticated);
  const dispatch = useDispatch();

  const image = user.ProfilePicture

  useEffect(() => {
    if (!authenticated) {
      dispatch(isLoggedIn());
    }
  }, []);
  
  const deleteData = (id) => {
    console.log("profile eke" + id)
    const deleteId = {
      Admin_ID: id
    }
    console.log(deleteId)
    Swal.fire({
      title: 'Are you sure want to Delete this Account?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#008000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No!'

    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteAdmin(deleteId))
      }
    })

  }

  if (!authenticated) {
    return <Navigate to='/signin' />
  };




  return (
    <section style={{ backgroundColor: '#eee', marginTop: "-120px" }}>
      <MDBContainer className="py-5">
        <Typography variant="h4" color="#ac1717" fontWeight="600" sx={{ m: "0 0 5px 0" }}>
          User Profile
        </Typography>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center" style={{ height: "34rem" }}>

                {
                  user.ProfilePicture == '' ?

                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="profile pic"
                      className="rounded-circle"
                      style={{ width: '200px', paddingTop: "40px" }}
                      fluid />

                    :
                    // <div key={inqData.Image} className='proImg'>
                    //   <LazyLoadImage
                    //     src={`${process.env.REACT_APP_API}/${image}`}
                    //     alt='inquiry-image'
                    //     className='proImgimg'
                    //   />
                    // </div>
                    <div key={user.ProfilePicture}>
                      <LazyLoadImage
                        src={`${process.env.REACT_APP_API}/${image}`}
                        alt="profile pic"
                        className="rounded-circle"
                      />
                    </div>
                }


                <p className="text-muted mb-1" style={{ marginTop: "30px", fontWeight: "800", fontSize: "22px" }}>{user.Job_title}</p>
                <p className="text-muted mb-4">I'm a motivated and adaptable [insert relevant experience or field] professional with a passion for learning and a strong work ethic. I excel in fast-paced environments and enjoy taking on new challenges. As a team player, I collaborate well with others but can also work independently to deliver high-quality results.</p>
              </MDBCardBody>
            </MDBCard>


          </MDBCol>

          <MDBCol lg="8" >
            <MDBCard className="mb-4">
              <MDBCardBody style={{ paddingBottom: "3.8rem", paddingTop: "1.5rem" }} >
                <MDBRow style={{ backgroundColor: "#dee2e6" }}>
                  <MDBCol sm="3">
                    <MDBCardText>Admin ID</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.Admin_ID}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow style={{ backgroundColor: "#dee2e6" }}>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.Full_Name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow style={{ backgroundColor: "#dee2e6" }}>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.Admin_Email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow style={{ backgroundColor: "#dee2e6" }}>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.Contact_no}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <div>
                  <Button style={{ backgroundColor: "red", border: "none" }} onClick={(e) => deleteData(user.Admin_ID)}>Delete Account</Button>
                </div>
              </MDBCardBody>
            </MDBCard>



          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}

export default UserProfile