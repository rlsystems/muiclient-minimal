import { useLocation } from 'react-router-dom';
// @mui
import { Box, Stack, Drawer, List } from '@mui/material';

// config
import { NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Scrollbar from '../../../components/Scrollbar';
//
import NavbarAccount from './NavbarAccount';

// ----------------------------------------------------------------------

// components
import SvgIconStyle from '../../../components/SvgIconStyle';

import { NavItem } from 'src/app/layout/navbar/NavItem';
import { ReactElement } from 'react';

// ----------------------------------------------------------------------


interface NavListProps {
  title: string;
  path: string;
  icon?: ReactElement;
  
};


const itemOne: NavListProps = { title: 'Users', path: '/users', icon: <SvgIconStyle src={`/icons/ic_user.svg`} sx={{ width: 1, height: 1 }} /> }
const itemTwo: NavListProps = { title: 'Brands', path: '/brands', icon: <SvgIconStyle src={`/icons/ic_ecommerce.svg`} sx={{ width: 1, height: 1 }} /> }
const itemThree: NavListProps = { title: 'Three', path: '/dashboard/three', icon: <SvgIconStyle src={`/icons/ic_analytics.svg`} sx={{ width: 1, height: 1 }} /> }



export default function NavbarVertical() {




  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Stack
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          alignItems: 'center'
        }}
      >

        <Logo />
      </Stack>

      <Box >
        <List key={1} disablePadding sx={{ px: 2 }}>
          <NavItem item={itemOne} />
          <NavItem item={itemTwo} />
          <NavItem item={itemThree} />
        </List>

      </Box>



      <Box sx={{ flexGrow: 1 }} />

      <NavbarAccount />

    </Scrollbar>
  );

  return (
    <Drawer
      open
      variant="persistent"
      PaperProps={{
        sx: {
          width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
          borderRightStyle: 'dashed',
          bgcolor: 'background.default',
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}
