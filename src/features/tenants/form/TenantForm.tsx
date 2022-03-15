import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';

import { CreateTenantRequest, Tenant } from '../../../app/models/tenant';
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Page from 'src/components/Page';


export default observer(function TenantForm() {


    const history = useHistory();
    const { tenantStore } = useStore();
    const { createTenant, loadTenants, loadTenant, loading, loadingInitial, selectedTenant } = tenantStore

    const { id } = useParams<{ id: string }>(); //in case this is admin edit

    const [tenantFormValues, setTenantFormValues] = useState<CreateTenantRequest>({ //Local State
        key: '',
        adminEmail: '',
        password: ''
    });

    //gets passed to formik
    const validationSchema = Yup.object({
        key: Yup.string().required('The key is required'),
        adminEmail: Yup.string().required('The admin email is required').email(),
        password: Yup.string().required('The password is required'),
    })

    // useEffect(() => {
    //     if (id) {
    //         loadTenant(id).then(tenant => setTenantFormValues(tenant!))
    //     }
    // }, [id, loadTenant])




    const formik = useFormik({
        initialValues: tenantFormValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (createTenantRequest: CreateTenantRequest) => {
            createTenant(createTenantRequest).then(() => history.push(`/tenants/`))
        }
    });




    return (
        <Page title="Create Tenant">
            <Container maxWidth={false}>
                <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>

                    <Typography variant="h4" gutterBottom>
                        New Tenant Registration
                    </Typography>



                    <form onSubmit={formik.handleSubmit}>



                        <TextField
                            fullWidth
                            margin="normal"
                            id="key"
                            name="key"
                            label="Key"
                            value={formik.values.key}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.key && Boolean(formik.errors.key)}
                            helperText={formik.touched.key && formik.errors.key}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            id="adminEmail"
                            name="adminEmail"
                            label="Admin Email"
                            value={formik.values.adminEmail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.adminEmail && Boolean(formik.errors.adminEmail)}
                            helperText={formik.touched.adminEmail && formik.errors.adminEmail}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="password"
                            name="password"
                            label="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />



                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 3, mb: 2 }}>
                            <Button component={Link} to='/tenants' variant="text">Cancel</Button>
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
            </Container>

        </Page>
    )
})