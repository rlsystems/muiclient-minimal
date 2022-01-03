import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
//import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import Box from '@mui/material/Box';

import UserListTable from './UserListTable';
import { Button, Container } from '@mui/material';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';
import { Link } from 'react-router-dom';




export default observer(function UserDashboard() {


    const { appUserStore } = useStore();
    const { loadAppUsers, appUserRegistry } = appUserStore;


    useEffect(() => {
        if (appUserRegistry.size <= 1) loadAppUsers();
    }, [appUserRegistry.size, loadAppUsers])


   // if (appUserStore.loadingInitial) return <LoadingComponent content='Loading Users...' />

    return (



        <Page title="Users">
            <Container maxWidth={false}>

                <HeaderBreadcrumbs
                    heading="User List"
                    links={[
                        { name: 'Dashboard', href: '' },
                        { name: 'User', href: '' },
                        { name: 'List' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={Link}
                            to={'/createUser'}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            New User
                        </Button>
                    }
                />


               
                <UserListTable />
            </Container>
        </Page>


    )
})