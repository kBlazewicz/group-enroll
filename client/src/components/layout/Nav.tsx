import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { AuthManagerService } from '../../services/AuthManagerService';
import { getUserRole } from '../../api/api-utils';
import { useEffect, useState } from 'react';


const pages = {
    TUTOR: ['Form-Creator', 'Results'],
    USER: ['Form-Answers'],
};

const settings = {
    loggedIn: ['Wyloguj'],
    loggedOut: ['Logowanie', 'Rejestracja'],
};
var pagesToShow: string[] = [];

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(AuthManagerService.isLoggedIn());
    const [pagesToShow, setPagesToShow] = useState(pages.USER);

    const navigate = useNavigate();
    const fetchUserRole = async () => {
        const username = AuthManagerService.getUserName();
        if (!username) return "ROLE_USER";

        try {
            const role = await getUserRole(username);
            console.log('User role:', role);
            if (role === "ROLE_USER") {
                setPagesToShow(pages.USER);
            } else if (role === "ROLE_TUTOR") {
                setPagesToShow(pages.TUTOR);
            }
        } catch (error) {
            console.error('Failed to fetch user role:', error);
            const role = "ROLE_USER";
            setPagesToShow(pages.USER);
        }
    };

    useEffect(() => {
        fetchUserRole();
    }, []);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuOptionClick = (option: string) => {
        handleCloseUserMenu();

        if (option === "Wyloguj") {
            AuthManagerService.logOut();
            navigate("/");
        } else if (option === "Logowanie") {
            navigate("/login");
        } else if (option === "Rejestracja") {
            navigate("/register");
        }
    };

    useEffect(() => {
        const handleLoginStatusChange = (isLoggedIn: boolean) => {
            setIsLoggedIn(isLoggedIn);
        };

        AuthManagerService.setLoginStatusCallback(handleLoginStatusChange);

        return () => {
            AuthManagerService.setLoginStatusCallback(() => { });
        };
    }, []);

    return (
        <AppBar style={{
            marginTop: 0,
            marginBottom: '2vh',
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        ENROL_LOGO
                    </Typography>


                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        {pagesToShow.map((page) => (
                            <a style={{ textDecoration: "none", color: "white" }} href={`/${page.toLowerCase()}`} >
                                <Button
                                    key={page}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            </a>

                        ))}
                    </Box>


                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {isLoggedIn
                                ? [
                                    <MenuItem key="logout" onClick={() => handleMenuOptionClick('Wyloguj')}>
                                        <Typography textAlign="center">Wyloguj</Typography>
                                    </MenuItem>,
                                    <MenuItem key="username" disabled>
                                        <Typography textAlign="center" sx={{ color: 'green' }}>
                                            {AuthManagerService.getUserName()}
                                        </Typography>
                                    </MenuItem>,
                                ]
                                : settings.loggedOut.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleMenuOptionClick(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default ResponsiveAppBar;
