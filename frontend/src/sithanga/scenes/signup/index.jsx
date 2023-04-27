import React from 'react';
import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './signup.css'
import { Link, Navigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { SignUp } from '../../actions/authActions';
import toast from 'react-hot-toast'



const Signup = () => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [conatactNo, setContactNo] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const authenticated = useSelector(state => state.auth.authenticated);
    const loading = useSelector(state => state.auth.loading)

    const dispatch = useDispatch();

    useEffect(() => {
        if (loading === true) {
            toast.loading('Loading...', {
                id: 'loading'
            })
        }
        else if (loading === false) {
            toast.dismiss('loading')
        }

    }, [loading]);

    const sendData = (e) => {

        e.preventDefault()
        console.log("done bn")

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (fullName === '') {
            toast.error("Please Choose Title..", {
                id: 'title'
            })
        }
        else if (jobTitle === '') {
            toast.error("Please Provide a Jobtitle..", {
                id: 'Jobtitle'
            })
        }
        else if (conatactNo === '') {
            toast.error("Please Provide a Contact No..", {
                id: 'contactno'
            })
        }
        else if (email === '') {
            toast.error("Please Provide Your Email..", {
                id: 'email'
            })
        }
        else if (!emailRegex.test(email)) {
            toast.error("Please Provide a Valid Email...", {
                id: 'valEmail'
            })
        }
        else if (password === '') {
            toast.error("Please Provide a Password..", {
                id: 'pwd'
            })
        }
        else if (password.length < 8) {
            toast.error("Password should be at least 8 characters long", {
                id: 'pwdLength'
            })
        }

        else if (fullName !== '' && jobTitle !== '' && conatactNo !== '' && email !== '' && password !== '') {
            const form =new FormData();
            form.append('Full_Name', fullName);
            form.append('Admin_Email', email);
            form.append('Job_title', jobTitle);
            form.append('Contact_no', conatactNo);
            form.append('Password', password);
            form.append('ProfilePicture', image);
            const form2 ={                
                Admin_Email: email,
                Password: password                
            }

            dispatch(SignUp(form,form2))
            setFullName('')
            setEmail('')
            setJobTitle('')
            setContactNo('')
            setPassword('')
            setImage(null)

        }

    }
    const handleCatImg = (e) => {
        setImage(e.target.files[0]);

    }

    if (authenticated) {
        return <Navigate to='/dash' />
    }

    return (

        <Container component="main" maxWidth="xs" className='container1'>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={sendData} encType='multipart/form-data' noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box >
                                <TextField
                                    value={fullName}
                                    onChange={(e) => { setFullName(e.target.value) }}
                                    fullWidth
                                    required
                                    id="Full Name"
                                    label="Full Name"
                                    name="Full Name"
                                />


                            </Box>

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="Admin_Email"
                                label="Email"
                                name="Admin_Email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="Job_title"
                                label="Job title"
                                name="Job_title"
                                value={jobTitle}
                                onChange={(e) => { setJobTitle(e.target.value) }}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="Contact_no"
                                label="Contact Number"
                                name="Contact_no"
                                value={conatactNo}
                                onChange={(e) => { setContactNo(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="Password"
                                label="Password"
                                name="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='file'
                                    onChange={(e) => { handleCatImg(e) }}

                                />

                            </Form.Group>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>



    )
}

export default Signup