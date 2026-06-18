import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/theme.css';
import App from './App.tsx';
import { BookingsProvider } from './store/bookings';
import { WalletProvider } from './store/wallet';
import { RewardsProvider } from './store/rewards';
import { LanguageProvider } from './i18n/LanguageProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <WalletProvider>
          <RewardsProvider>
            <BookingsProvider>
              <App />
            </BookingsProvider>
          </RewardsProvider>
        </WalletProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
