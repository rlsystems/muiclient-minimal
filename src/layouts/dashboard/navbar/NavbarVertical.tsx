import { useLocation } from 'react-router-dom';
// @mui
import { Box, Stack, Drawer } from '@mui/material';

// config
import { NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Scrollbar from '../../../components/Scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
//
import navConfig from './NavConfig';
import NavbarAccount from './NavbarAccount';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------



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

      <NavSectionVertical navConfig={navConfig} />

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
