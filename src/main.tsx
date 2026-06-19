import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/theme.css';
import App from './App.tsx';
import { BookingsProvider } from './store/bookings';
import { WalletProvider } from './store/wallet';
import { RewardsProvider } from './store/rewards';
import { AuthProvider } from './store/auth';
import { BusinessProvider } from './store/business';
import { ProfileProvider } from './store/profile';
import { LanguageProvider } from './i18n/LanguageProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <WalletProvider>
            <RewardsProvider>
              <BookingsProvider>
                <BusinessProvider>
                  <ProfileProvider>
                    <App />
                  </ProfileProvider>
                </BusinessProvider>
              </BookingsProvider>
            </RewardsProvider>
          </WalletProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
