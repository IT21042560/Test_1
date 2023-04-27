import React, { useState } from 'react'
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    ArrowDropDownOutlined,
} from '@mui/icons-material';
import { MdNotificationsActive } from 'react-icons/md'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import FlexBetween from './FlexBetween';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, IconButton, Toolbar, useTheme, Box, Button, Typography, Menu, MenuItem } from '@mui/material';
import { signout } from '../../actions/authActions';


const Navbar = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user.RegisterdAdmin)
    const theme = useTheme()

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null)
    const menuOnClick = () => dispatch(signout())

    
    return (
        <AppBar sx={{
            position: 'static',
            background: 'none',
            boxShadow: 'none',
        }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <FlexBetween>
                    <IconButton onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)} >
                        <MenuIcon />
                    </IconButton>
                </FlexBetween>

                <FlexBetween
                    gap='1.5rem'
                >
                    <IconButton>
                        <MdNotificationsActive sx={{ fontSize: '25px' }} />
                    </IconButton>
                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >
                            <ManageAccountsOutlinedIcon
                                sx={{fontSize: "35px", color:"#ac1717" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="600"
                                    fontSize="1.2rem"
                                    color="#ac1717"
                                  
                                >
                                    {user.Full_Name}
                                </Typography>
                                
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{  fontSize: "25px", color:"#ac1717"}}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        >
                            <MenuItem onClick={menuOnClick}>Log Out</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
