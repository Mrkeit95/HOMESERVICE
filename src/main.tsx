import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/theme.css';
import App from './App.tsx';
import { BookingsProvider } from './store/bookings';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BookingsProvider>
        <App />
      </BookingsProvider>
    </BrowserRouter>
  </StrictMode>,
);
