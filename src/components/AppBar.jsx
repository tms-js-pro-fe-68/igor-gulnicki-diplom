import { AccountCircle } from '@mui/icons-material';
import {
    AppBar as MuiAppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';


export default function AppBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);


    const handleLogout = () => {
        sessionStorage.token = '';
        sessionStorage.email = '';
        navigate('/login', { replace: true });
        handleClose()
    }

    return (
        <MuiAppBar position="static" width="100vh">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Магазин ножей tuotown +
                </Typography>
                <SearchBar />
                <Box>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>
                            Выйти из :
                            {sessionStorage.email}
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </MuiAppBar>
    )
}