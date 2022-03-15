import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';

import { RegisterUserFormValues, User } from '../../../app/models/user';
import { Box, Button, Container, Divider, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Page from 'src/components/Page';



export default observer(function UserProfile() {

    const history = useHistory();
    const { appUserStore } = useStore();
    const { createAppUser } = appUserStore;


    const [newUserFormValues, setNewUserFormValues] = useState<RegisterUserFormValues>({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        roleId: 'basic'
    });

    //gets passed to formik
    const validationSchema = Yup.object({
        firstName: Yup.string().required('The first name is required'),
        lastName: Yup.string().required('The last name is required'),
        userName: Yup.string().required('The user name is required'),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        confirmPassword: Yup.string().required()
    })



    const formik = useFormik({
        initialValues: newUserFormValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (appUser: RegisterUserFormValues) => {
            createAppUser(appUser).then(() => history.push(`/users/`))
        }
    });



    return (

        <>
            <Page title="Page One">
                <Container maxWidth={false}>
                    <Typography variant="h4" gutterBottom>
                        New User Registration
                    </Typography>
                    <Divider />


                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
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
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
                        <TextField
                            fullWidth
                            margin="normal"
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="roleId"
                            name="roleId"
                            label="Role Id"
                            value={formik.values.roleId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.roleId && Boolean(formik.errors.roleId)}
                            helperText={formik.touched.roleId && formik.errors.roleId}
                        />

                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 3, mb: 2 }}>
                            <Button component={Link} to='/users' variant="text">Cancel</Button>
                            <LoadingButton
                                sx={{ ml: 1 }}
                                disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
                                color="primary" variant="contained"

                                type="submit"
                                loading={formik.isSubmitting}

                            >
                                Submit
                            </LoadingButton>

                        </Box>

                    </form>


                </Container>
            </Page>

        </>

    )
})