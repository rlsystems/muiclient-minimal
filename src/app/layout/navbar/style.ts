import { ReactNode } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  LinkProps,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  ListItemButtonProps,
} from '@mui/material';
// config
import { ICON, NAVBAR } from '../../../config';

// ----------------------------------------------------------------------

type IProps = LinkProps & ListItemButtonProps;

interface ListItemStyleProps extends IProps {
  component?: ReactNode;
  to?: string;
  activeRoot?: boolean;
  activeSub?: boolean;
  subItem?: boolean;
}

export const ListItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'activeRoot' && prop !== 'activeSub' && prop !== 'subItem',
})<ListItemStyleProps>(({ activeRoot, activeSub, subItem, theme }) => ({
  ...theme.typography.body2,
  position: 'relative',
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1.5),
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  // activeRoot
  ...(activeRoot && {
    ...theme.typography.subtitle2,
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  })
}));

interface ListItemTextStyleProps extends ListItemButtonProps {
  isCollapse?: boolean;
}



export const ListItemIconStyle = styled(ListItemIcon)({
  width: ICON.NAVBAR_ITEM,
  height: ICON.NAVBAR_ITEM,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': { width: '100%', height: '100%' },
});
