// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Avatar } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------


export default function NavbarAccount() {
  return (
    <Link underline="none" color="inherit" >
      <RootStyle
        sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: 'transparent'
        }}
      >
        <Avatar
          src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg"
          alt="Timoteo"
        />

       
      </RootStyle>
    </Link>
  );
}
