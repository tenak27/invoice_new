import React from 'react';
import { AppRoutes } from './routes';
import { ThemeCustomizer } from './components/ui/ThemeCustomizer';

function App() {
  return (
    <>
      <AppRoutes />
      <ThemeCustomizer />
    </>
  );
}

export default App;