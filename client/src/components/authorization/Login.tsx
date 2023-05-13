import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { sendLoginRequest } from '../../api/api-utils';
import { AuthManagerService } from '../../services/AuthManagerService';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [isServerError, setIsServerError] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await sendLoginRequest(username, password);

            if (response.ok) {
                const data = await response.json();
                console.log('Received token:', data.token);
                AuthManagerService.setToken(data.token);
                AuthManagerService.setUserName(username);
                AuthManagerService.logIn();
                navigate('/');
            } else {
                console.log('Login failed');
                setIsLoginFailed(true);
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error:', error);
            setIsServerError(true);
        }
    };


    return (
        <Card className="form-card" style={{ minWidth: 500 }}>
            <CardContent className="fields-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Zaloguj się
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '90%' }}>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                            style={{ width: '100%' }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            style={{ width: '100%' }}
                        />
                        <Button type="submit" variant="contained" color="primary" size="medium" style={{ width: '50%' }}>
                            Submit
                        </Button>
                    </Box>
                </form>
            </CardContent>
            {isLoginFailed && (
                <Typography variant="body2" color="error" align="center">
                    Bad Credentials
                </Typography>
            )}
            {isServerError && (
                <Typography variant="body2" color="error" align="center">
                    Internal Server Error
                </Typography>
            )}
        </Card>
    );
};

export default LoginForm;