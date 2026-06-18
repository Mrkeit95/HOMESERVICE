import { Routes, Route } from 'react-router-dom';
import TopBanner from './components/TopBanner';
import TopupModal from './components/TopupModal';
import Home from './pages/Home';
import Category from './pages/Category';
import Provider from './pages/Provider';
import Messages from './pages/Messages';
import Wallet from './pages/Wallet';
import Premium from './pages/Premium';
import Settings from './pages/Settings';
import Business from './pages/Business';

export default function App() {
  return (
    <div className="device-frame">
      <TopBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:key" element={<Category />} />
        <Route path="/provider/:cat/:idx" element={<Provider />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/business" element={<Business />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <TopupModal />
    </div>
  );
}
