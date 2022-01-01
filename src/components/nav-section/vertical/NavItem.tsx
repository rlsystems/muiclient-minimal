import { NavLink as RouterLink } from 'react-router-dom';

// type
import { NavItemProps } from '../type';
//
import { ListItemStyle, ListItemIconStyle } from './style';

// ----------------------------------------------------------------------

export function NavItem({ item }: NavItemProps) {
  const { title, path, icon, info, children } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
     
    </>
  );

 

  return (
    <ListItemStyle component={RouterLink} to={path} activeRoot={false}>
      {renderContent}
    </ListItemStyle>
  );
}

// ----------------------------------------------------------------------



