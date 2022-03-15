import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
//import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import Box from '@mui/material/Box';

import VenueListTable from './VenueListTable';
import { Button, Container } from '@mui/material';
import VenueHeader from './VenueHeader';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';
import { Link } from 'react-router-dom';




export default observer(function VenueDashboard() {


    const { venueStore } = useStore();
    const { loadVenues, venueRegistry } = venueStore;

    useEffect(() => {
        if (venueRegistry.size <= 1) loadVenues();
    }, [venueRegistry.size, loadVenues])



    return (
        <Page title="Venues">
            <HeaderBreadcrumbs
                heading="Venues"
                links={[
                    { name: 'List' },
                ]}

                action={
                    <Button
                        variant="contained"
                        component={Link}
                        to={'/createVenue'}
                        startIcon={<Iconify icon={'eva:plus-fill'} />}
                    >
                        New Venue
                    </Button>
                }
            />

            <VenueListTable />

        </Page>


    )
})