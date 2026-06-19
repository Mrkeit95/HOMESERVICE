import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './store/auth';
import { isOnboarded } from './lib/onboarding';
import Auth from './pages/Auth';
import ResetPassword from './pages/ResetPassword';
import TopBanner from './components/TopBanner';
import TopupModal from './components/TopupModal';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Category from './pages/Category';
import Provider from './pages/Provider';
import Messages from './pages/Messages';
import Wallet from './pages/Wallet';
import Premium from './pages/Premium';
import Settings from './pages/Settings';
import Business from './pages/Business';
import Legal from './pages/Legal';
import Rewards from './pages/Rewards';
import JoinProvider from './pages/JoinProvider';
import Track from './pages/Track';
import Help from './pages/Help';
import Footer from './components/Footer';
import SupportChat from './components/SupportChat';
import AvatarUploader from './components/AvatarUploader';
import { TERMS, PRIVACY } from './content/legal';

export default function App() {
  const { signedIn, ready, user, recovery } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Provider accounts must finish legal/KYC onboarding before using the app.
  useEffect(() => {
    if (signedIn && user?.type === 'business' && !isOnboarded(user.email) && pathname !== '/join-provider') {
      navigate('/join-provider');
    }
  }, [signedIn, user, pathname, navigate]);

  // Wait for the (Supabase) session to resolve before deciding.
  if (!ready) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-faint)' }}>
        <div className="logo-mark" style={{ width: 40, height: 40 }} />
      </div>
    );
  }
  // Password-reset link → set-new-password screen. `recovery` is set by the
  // Supabase PASSWORD_RECOVERY event, so this works no matter where the email
  // link redirects to.
  if (recovery || pathname === '/reset-password') return <ResetPassword />;
  // Signed out → full-screen login / signup gate (real-user experience).
  if (!signedIn) return <Auth />;
  return (
    <div className="device-frame">
      <TopBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:key" element={<Category />} />
        <Route path="/provider/:cat/:idx" element={<Provider />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/business" element={<Business />} />
        <Route path="/terms" element={<Legal doc={TERMS} />} />
        <Route path="/privacy" element={<Legal doc={PRIVACY} />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/join-provider" element={<JoinProvider />} />
        <Route path="/track" element={<Track />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <TopupModal />
      <SupportChat />
      <AvatarUploader />
    </div>
  );
}
