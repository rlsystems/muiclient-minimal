import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
//import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import Box from '@mui/material/Box';

import BrandListTable2 from './BrandListTable2';
import { Button, Container } from '@mui/material';
import BrandHeader from './BrandHeader';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Iconify from 'src/components/Iconify';
import { Link } from 'react-router-dom';




export default observer(function BrandDashboard() {


    const { brandStore } = useStore();
    const { loadBrands, brandRegistry } = brandStore;

    useEffect(() => {
        if (brandRegistry.size <= 1) loadBrands();
    }, [brandRegistry.size, loadBrands])


    //if (brandStore.loadingInitial) return <LoadingComponent content='Loading Brands...' />

    return (



        <Page title="Page One">
            <Container maxWidth={false}>

                <HeaderBreadcrumbs
                    heading="Brand List"
                    links={[
                        { name: 'Dashboard', href: '' },
                        { name: 'User', href: '' },
                        { name: 'List' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={Link}
                            to={'/createBrand'}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            New Brand
                        </Button>
                    }
                />


               
                <BrandListTable2 />
            </Container>
        </Page>


    )
})