import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/theme.css';
import App from './App.tsx';
import { BookingsProvider } from './store/bookings';
import { WalletProvider } from './store/wallet';
import { LanguageProvider } from './i18n/LanguageProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <WalletProvider>
          <BookingsProvider>
            <App />
          </BookingsProvider>
        </WalletProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
