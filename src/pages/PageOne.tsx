// @mui
import { Button, Container, Typography } from '@mui/material';
// hooks
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../components/Iconify';
import SettingMode from 'src/components/settings/SettingMode';

// ----------------------------------------------------------------------

export default function PageOne() {

  return (
    <Page title="Page One">
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
              component={RouterLink}
              to={''}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New User
            </Button>
          }
        />


        <Typography>
          Praesent ac sem eget est egestas volutpat. Phasellus viverra nulla ut metus varius
          laoreet. Curabitur ullamcorper ultricies nisi. Ut non enim eleifend felis pretium feugiat.
          Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Fusce vel dui. Quisque
          libero metus, condimentum nec, tempor a, commodo mollis, magna. In enim justo, rhoncus ut,
          imperdiet a, venenatis vitae, justo. Cras dapibus.
        </Typography>
      </Container>
    </Page>
  );
}
