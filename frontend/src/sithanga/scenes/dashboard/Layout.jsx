import React from 'react'
import Header from './header'
import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedIn } from '../../actions/authActions';
import { Box ,useMediaQuery} from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';


const Layout = () => {

    const dispatch = useDispatch();
    const authenticated = useSelector(state => state.auth.authenticated);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
    const [user, setUser] = useState({});
    const fUser = useSelector(state => state.auth.user)
    useEffect(() => {
        setUser(fUser)
    }, [user]);


    useEffect(() => {
        if (!authenticated) {
            dispatch(isLoggedIn());
        }
    }, []);

    if (!authenticated) {
        return <Navigate to='/signin' />
    };
    return (

        <>
            <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%" marginBottom='3rem'>
                <Sidebar
                    user={user || {}}
                    isNonMobile={isNonMobile}
                    drawerWidth="300px"
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Box flexGrow={1}>
                    <Navbar
                        user={user || {}}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                    <Outlet />
                </Box>
            </Box>

        </>
    )
}

export default Layout