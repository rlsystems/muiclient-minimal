import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';




export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}
            >
                <Typography component="h1" variant="h5" sx={{
                    marginBottom: '2rem'
                }}>
                    Welcome to the App
                </Typography>

                {userStore.isLoggedIn ? (
                    <>
                        <Button component={Link} to="/venues" variant="contained" >
                            Go to Dashboard
                        </Button>
                    </>

                ) : (
                    <>
                        <Button component={Link} to="/login" variant="contained" >
                            Login
                        </Button>

                    </>

                )}




            </Box>
        </Container>
    );
}) 