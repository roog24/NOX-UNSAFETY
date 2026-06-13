import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AffinityProvider } from './context/AffinityContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AffinityProvider>
      <App />
    </AffinityProvider>
  </StrictMode>,
);
