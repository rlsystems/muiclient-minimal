import { ReactNode } from 'react';
import isString from 'lodash/isString';
// @mui
import { Box, Typography, Link } from '@mui/material';
//
import Breadcrumbs, { Props as BreadcrumbsProps } from './Breadcrumbs';
import { NavLink as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

interface Props extends BreadcrumbsProps {
  action?: ReactNode;
  heading: string;
  moreLink?: string | string[];
}

export default function HeaderBreadcrumbs({
  links,
  action,
  heading,
  moreLink = '' || [],
  sx,
  ...other
}: Props) {
  return (
    <Box sx={{ mb: 0, px: 3, borderBottom: '1px solid rgba(145, 158, 171, 0.24)', ...sx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>


          <Typography variant="h4" gutterBottom>
            {links.map(link => {

          
            })}
            {heading}
          </Typography>

        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>

      <Box sx={{ mt: 2 }}>
        {isString(moreLink) ? (
          <Link href={moreLink} target="_blank" rel="noopener" variant="body2">
            {moreLink}
          </Link>
        ) : (
          moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))
        )}
      </Box>
    </Box>
  );
}
