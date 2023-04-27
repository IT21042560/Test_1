import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { Login } from '../../actions/authActions'
import './signin.css'
import toast from 'react-hot-toast'


const SignIn = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const authenticating = useSelector(state=> state.auth.authenticating)
    const authenticated = useSelector(state => state.auth.authenticated)
    const Admin_Email = email;
    const Password = passwd;

//toast
    useEffect(()=> {
        if(authenticating === true){
            toast.loading("Cheking...",{
                id: 'cheking'
            })
        }
        else if(authenticating === false){
            toast.dismiss('cheking')
        }
    })

    const adminLogin = (e) => {
        e.preventDefault();

        if (email === '') {
          
            toast.error("Please Provide An Email..!", {
                id: "email"
            })
        }
        else if (passwd === '') {
          
            toast.error("Please Provide the Password..!", {
                id: "'password'"
            })
        }
        else if (email === '' && passwd === '') {
           
            toast.error("PPlease provide the Credentials...!", {
                id: "credential"
            })
        }

        else if (email !== '' & passwd !== '') {
            const admin = {
                Admin_Email,
                Password
            }



            dispatch(Login(admin));
            setEmail('');
            setPasswd('');
        }
    }

    if (authenticated) {
        return <Navigate to='/Dash' />
    };


    return (
        <>
            <Container component="main" maxWidth="xs" className='container2'>
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={adminLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="Admin_Email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            value={passwd}
                            onChange={(e) => setPasswd(e.target.value)}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs={12} sm={5}>
                                <Link to='/forgotpwd' variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Link to='/signup' variant="body2">
                                    Sign Up?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default SignIn