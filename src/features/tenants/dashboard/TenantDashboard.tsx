import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
//import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import Box from '@mui/material/Box';

import TenantListTable from './TenantListTable';
import { Button, Container } from '@mui/material';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';
import { Link } from 'react-router-dom';




export default observer(function TenantDashboard() {


    const { tenantStore } = useStore();
    const {loadTenants, tenantRegistry} = tenantStore;

    useEffect(() => {
        if(tenantRegistry.size < 1) loadTenants();
      }, [tenantRegistry.size, loadTenants])



    return (



        <Page title="Tenant List">
            <Container maxWidth={false}>

                <HeaderBreadcrumbs
                    heading="Tenant List"
                    links={[
                        { name: 'Dashboard', href: '' },
                        { name: 'User', href: '' },
                        { name: 'List' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={Link}
                            to={'/createTenant'}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            New Tenant
                        </Button>
                    }
                />


               
                <TenantListTable />
            </Container>
        </Page>


    )
})