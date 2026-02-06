import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'components/app/App';
import { initializeSignalR } from '../src/utils/signalrUtils';

import { Toaster } from 'components/shared/ui/Toaster';

import 'styles/index.css';
initializeSignalR();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
);
