import { NavLink as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// type
import { NavItemProps } from './type';
//
import { ListItemStyle, ListItemIconStyle } from './style';
import { Tooltip, Zoom } from '@mui/material';

// ----------------------------------------------------------------------

export function NavItem({ item, active = false }: NavItemProps) {
  const { title, path, icon, info, children } = item;

  const renderContent = (
    <>
      {icon &&
        <ListItemIconStyle>{icon}</ListItemIconStyle>
      }
    </>
  );

  const location = useLocation();

  if (location.pathname == path) {
    active = true;
  }

  return (
    <Tooltip title={title} arrow placement='right' TransitionComponent={Zoom} >
      <ListItemStyle component={RouterLink} to={path} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    </Tooltip>

  );
}

// ----------------------------------------------------------------------



