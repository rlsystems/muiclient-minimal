import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
//import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';


import { Brand } from '../../../app/models/brand';
import { Box, Button, Container, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Page from 'src/components/Page';




export default observer(function BrandForm() {


    const history = useHistory();
    const { brandStore } = useStore();
    const { createBrand, updateBrand, loadBrand, loading, loadingInitial } = brandStore;
    const { id } = useParams<{ id: string }>();

    const [brand, setBrand] = useState<Brand>({
        id: '',
        name: '',
        description: '',
    });

    //gets passed to formik
    const validationSchema = Yup.object({
        name: Yup.string().required('The brand name is required'),
        description: Yup.string().required('The brand description is required'),

    })

    useEffect(() => {
        if (id) loadBrand(id).then(brand => setBrand(brand!))
    }, [id, loadBrand])


    const formik = useFormik({
        initialValues: brand,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (brand: Brand) => {
            if (brand.id.length === 0) {
                createBrand(brand).then(() => history.push(`/brands/`))
            } else {
                updateBrand(brand).then(() => history.push(`/editBrand/${brand.id}`))
            }
        }
    });





    // if (loadingInitial) return <LoadingComponent content='Loading brand...' />

    return (
        <Page title="Page One">
            <Container maxWidth={false}>

                <Typography variant="h4" gutterBottom>
                    {(id) ? 'Edit Brand' : 'Create Brand'}
                </Typography>



                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="description"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 3, mb: 2 }}>
                        <Button component={Link} to='/brands' variant="text">Cancel</Button>
                        <LoadingButton
                            sx={{ ml: 1 }}
                            disabled={!formik.dirty || !formik.isValid}
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
    )
})

