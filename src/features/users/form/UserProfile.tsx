import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';

import { User } from '../../../app/models/user';
import { Box, Button, Checkbox, Container, Divider, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Page from 'src/components/Page';


export default observer(function UserProfile() {


    const history = useHistory();
    const { appUserStore, userStore } = useStore();
    const { loadAppUser, updateAppUser, loading, loadingInitial } = appUserStore;
    const { currentUser, getCurrentUser, updateCurrentUser } = userStore; //check loading

    const { id } = useParams<{ id: string }>(); //in case this is admin edit

    const [userFormValues, setUserFormValues] = useState<User>({ //Local State
        id: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phoneNumber: '',
        isActive: true,
        roleId: 'basic'
    });

    //gets passed to formik
    const validationSchema = Yup.object({
        firstName: Yup.string().required('The first name is required'),
        lastName: Yup.string().required('The last name is required'),
        email: Yup.string().required().email(),
        phoneNumber: Yup.string().notRequired()
    })

    useEffect(() => {
        if (id) {
            loadAppUser(id).then(appUser => setUserFormValues(appUser!))
        } else {

            if (!currentUser) {
                getCurrentUser().then(userFormValues => setUserFormValues(userFormValues!))
            } else {
                setUserFormValues(currentUser)
            }

        }
    }, [id, getCurrentUser])



    const formik = useFormik({
        initialValues: userFormValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (user: User) => {
            if (id) {
                updateAppUser(user).then(() => history.push(`/editUser/${user.id}`))
            } else {
                updateCurrentUser(user).then(() => history.push(`/editUser/`))
            }
        }
    });






    return (
        <>
            <Page title="Page One">
                <Container maxWidth={false}>

                    <Typography variant="h4" gutterBottom>
                        Edit Profile | {userFormValues.firstName} {userFormValues.lastName}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Username: {userFormValues.userName}
                    </Typography>
                    <Divider />

                    <form onSubmit={formik.handleSubmit}>

                        {currentUser?.id != userFormValues.id && //conditionally render in jsx
                            <FormGroup>
                                <FormControlLabel control={
                                    <Checkbox

                                        id="isActive"
                                        name="isActive"
                                        checked={formik.values.isActive}
                                        value={formik.values.isActive}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}

                                    />
                                } label="Is Active" />
                            </FormGroup>


                        }
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