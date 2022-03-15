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
import LoginPage from '../../features/login/LoginPage';

import LoadingScreen from 'src/components/LoadingScreen';
import HomePage from 'src/features/home/HomePage';
import { ToastContainer } from 'material-react-toastify';


// ----------------------------------------------------------------------


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
        <ToastContainer position='bottom-right' hideProgressBar />
        <ProgressBarStyle />

        <ScrollToTop />


        {/* Full Pages */}
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/' component={HomePage} />
          
          {/* Pages with Side Navigation Bar */}
          <Route
            path={'/(.+)'}
            render={() => (

              <Box>
                <NavbarVertical />

                <Switch>
                  <Route exact path='/venues' component={VenueDashboard} />
                  <Route exact key={location.key} path={['/createVenue', '/editVenue/:id']} component={VenueForm} />

                  <Route exact path='/users' component={UserDashboard} />
                  <Route exact path='/createUser' component={UserRegistration} />
                  <Route exact key={location.key} path={['/editUser', '/editUser/:id']} component={UserProfile} />

                  <Route exact path='/tenants' component={TenantDashboard} />
                  <Route exact key={location.key} path={['/createTenant', '/editTenant/:id']} component={TenantForm} />


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



const Loadable = (Component: ElementType) => (props: any) => {

  return ( 
    <Suspense fallback={<LoadingScreen isDashboard={true} />}>
      <Component {...props} />
    </Suspense>
  );
};
const VenueDashboard = Loadable(lazy(() => import('../../features/venues/dashboard/VenueDashboard')));
const VenueForm = Loadable(lazy(() => import('../../features/venues/form/VenueForm')));

const TenantDashboard = Loadable(lazy(() => import('../../features/tenants/dashboard/TenantDashboard')));
const TenantForm = Loadable(lazy(() => import('../../features/tenants/form/TenantForm')));

const UserDashboard = Loadable(lazy(() => import('../../features/users/dashboard/UserDashboard')));
const UserRegistration = Loadable(lazy(() => import('../../features/users/form/UserRegistration')));
const UserProfile = Loadable(lazy(() => import('../../features/users/form/UserProfile')));


const PageOne = Loadable(lazy(() => import('../../pages/PageOne')));
const PageTwo = Loadable(lazy(() => import('../../pages/PageTwo')));
const PageThree = Loadable(lazy(() => import('../../pages/PageThree')));

const NotFound = Loadable(lazy(() => import('./Page404')));