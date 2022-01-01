// @mui
import {  } from '@mui/material/styles';
import { List, Box } from '@mui/material';
// type
import { NavSectionProps } from '../type';
//
import { NavListRoot } from './NavList';



export default function NavSectionVertical({
  navConfig,
}: NavSectionProps) {
  return (
    <Box >
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
       

          {group.items.map((list) => (
            <NavListRoot key={list.title} list={list}  />
          ))}
        </List>
      ))}
    </Box>
  );
}
