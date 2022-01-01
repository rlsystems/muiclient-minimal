// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import ThemeColorPresets from './components/ThemeColorPresets';

import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from './app/stores/store';

// ----------------------------------------------------------------------

function App() {
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
            <Router />
    
      </ThemeColorPresets>
    </ThemeProvider>
  );
}

export default observer(App);