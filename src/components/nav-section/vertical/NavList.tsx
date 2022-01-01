import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { List, Collapse } from '@mui/material';
// type
import { NavListProps } from '../type';
//
import { NavItemRoot, NavItemSub } from './NavItem';
import { getActive } from '..';

// ----------------------------------------------------------------------

type NavListRootProps = {
  list: NavListProps;
};

export function NavListRoot({ list }: NavListRootProps) {
  const { pathname } = useLocation();

  const active = getActive(list.path, pathname);


  return <NavItemRoot item={list} active={active}  />;
}

