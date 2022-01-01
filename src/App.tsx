// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import ThemeColorPresets from './components/ThemeColorPresets';

// ----------------------------------------------------------------------

export default function App() {
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
