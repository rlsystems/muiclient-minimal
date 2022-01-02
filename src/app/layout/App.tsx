import { Suspense, lazy, ElementType } from 'react';
// theme
import ThemeProvider from '../../theme';
// components
import ScrollToTop from '../../components/ScrollToTop';
import { ProgressBarStyle } from '../../components/ProgressBar';
import ThemeColorPresets from '../../components/ThemeColorPresets';

import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from '../stores/store';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import NavbarVertical from './navbar/NavbarVertical';
import LoginPage from '../../pages/LoginPage';

import LoadingScreen from 'src/components/LoadingScreen';

// ----------------------------------------------------------------------
const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};
function App() {
  const location = useLocation(); //returns location object from router, useful for the key

  const { commonStore, userStore } = useStore();

  //do something when this component loads
  //in this case, get the current user (otherwise reloading browser will clear mobx)
  useEffect(() => {
    if (commonStore.token) {
      userStore.getCurrentUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])




  return (
    <ThemeProvider>
      <ThemeColorPresets>

        <ProgressBarStyle />

        <ScrollToTop />


        {/* Full Pages */}
        <Switch>
          <Route exact path='/login' component={LoginPage} />

          {/* Pages with Side Navigation Bar */}
          <Route
            path={'/(.+)'}
            render={() => (

              <Box sx={{ display: 'flex' }}>
                <NavbarVertical />

                <Switch>

                  <Route exact  path='/dashboard/one' component={PageOne} />
                  <Route exact  path='/dashboard/two' component={PageTwo} />
                  <Route exact  path='/dashboard/three' component={PageThree} />


                  <Route component={NotFound} />
                </Switch>
              </Box>



            )} />
        </Switch>

      </ThemeColorPresets>
    </ThemeProvider>
  );
}

export default observer(App);


const PageOne = Loadable(lazy(() => import('../../pages/PageOne')));
const PageTwo = Loadable(lazy(() => import('../../pages/PageTwo')));
const PageThree = Loadable(lazy(() => import('../../pages/PageThree')));

const NotFound = Loadable(lazy(() => import('./Page404')));