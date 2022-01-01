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
import { observer } from 'mobx-react-lite';
import { useStore } from '../app/stores/store';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';

import { ErrorMessage, Form, Formik, useFormik } from 'formik';


const validationSchema = yup.object({
  tenant: yup
    .string()
    .required('Tenant key is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});


export default observer(function LoginPage() {
  const { userStore } = useStore();

  const formik = useFormik({
    initialValues: {
      tenant: '',
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      userStore.login(values);
    }
  });



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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="tenant"
            name="tenant"
            label="Tenant"
            value={formik.values.tenant}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tenant && Boolean(formik.errors.tenant)}
            helperText={formik.touched.tenant && formik.errors.tenant}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <LoadingButton
            sx={{ mt: 3, mb: 2 }}
            disabled={!formik.dirty || !formik.isValid}
            color="primary" variant="contained"
            fullWidth type="submit"
            loading={formik.isSubmitting}

          >
            Submit
          </LoadingButton>
          
        </form>


      </Box>
      <Box>
        Tenant: root
      </Box>
      <Box>
        Email: admin@root.com
      </Box>
      <Box>
        Pass: 123Pa$$word!
      </Box>
    </Container>
  );
})
