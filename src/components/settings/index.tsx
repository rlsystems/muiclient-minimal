import { AnimatePresence, m } from 'framer-motion';
import { useState, useEffect } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Backdrop, Divider, Typography, Stack, FormControlLabel, Radio } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { NAVBAR, defaultSettings } from '../../config';
//
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import { IconButtonAnimate, varFade } from '../animate';
//
import SettingMode from './SettingMode';


// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ color: theme.palette.background.paper, opacity: 0.92 }),
  top: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  position: 'fixed',
  overflow: 'hidden',
  width: NAVBAR.BASE_WIDTH,
  flexDirection: 'column',
  margin: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  zIndex: theme.zIndex.drawer + 3,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: `-24px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
    0.16
  )}`,
}));

// ----------------------------------------------------------------------

export default function Settings() {
  const {
    themeMode,
    themeDirection,
    themeColorPresets,
    themeStretch,
    themeLayout,
    onResetSetting,
  } = useSettings();
  const [open, setOpen] = useState(false);

  const notDefault =
    themeMode !== defaultSettings.themeMode ||
    themeDirection !== defaultSettings.themeDirection ||
    themeColorPresets !== defaultSettings.themeColorPresets ||
    themeLayout !== defaultSettings.themeLayout ||
    themeStretch !== defaultSettings.themeStretch;

  const varSidebar =
    themeDirection !== 'rtl'
      ? varFade({
          distance: NAVBAR.BASE_WIDTH,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: NAVBAR.BASE_WIDTH,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inLeft;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };


}

// ----------------------------------------------------------------------

type Props = {
  value: string;
};

export function BoxMask({ value }: Props) {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      sx={{
        m: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      }}
    />
  );
}
