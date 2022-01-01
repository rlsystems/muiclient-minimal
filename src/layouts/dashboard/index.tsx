import { Outlet } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';


import NavbarVertical from './navbar/NavbarVertical';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function DashboardLayout() {


  return (
    <>
      <NavbarVertical  />

      <Box
        component="main"   
        sx={{pl: '90px', pr: '12px', py: '24px'}}
      >
        <Outlet />
      </Box>
    </>
  );

 
}
