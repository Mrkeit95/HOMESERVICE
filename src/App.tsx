import { Routes, Route } from 'react-router-dom';
import TopBanner from './components/TopBanner';
import Home from './pages/Home';
import Category from './pages/Category';
import Stub from './pages/Stub';

export default function App() {
  return (
    <div className="device-frame">
      <TopBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:key" element={<Category />} />
        <Route path="/provider/:cat/:idx" element={<Stub title="Provider" />} />
        <Route path="/wallet" element={<Stub title="Wallet" />} />
        <Route path="/messages" element={<Stub title="Messages" />} />
        <Route path="/premium" element={<Stub title="Premium" />} />
        <Route path="/settings" element={<Stub title="Account" />} />
        <Route path="/business" element={<Stub title="Business" />} />
        <Route path="*" element={<Stub title="Not found" />} />
      </Routes>
    </div>
  );
}
