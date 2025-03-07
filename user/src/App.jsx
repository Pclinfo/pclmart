import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from './context/AuthContext';

import Footer from './pages/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import RestockRequests from './pages/RestockRequests'
import WishList from './pages/WishList'
import MyLoyaltyPoint from './pages/MyLoyaltyPoint'
import Inbox from './pages/Inbox'
import MyAddress from './pages/MyAddress'
import SupportTicket from './pages/SupportTicket'
import ReferEarn from './pages/ReferEarn'
import Coupons from './pages/Coupons'
import TrackOrder from './pages/TrackOrder'
import ProductView from './pages/ProductView';
import CheckOut from './pages/CheckOut';

import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import CancellationPolicy from './pages/CancellationPolicy';
import ShippingPolicy from './pages/ShippingPolicy';




// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
  </div>
);


const AppRoutes = () => {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Authentication Routes */}
      <Route
        path="/register"
        element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/callback"
        element={<Register redirectAfterLogin={true} />}
      />

      <Route path="/" element={<Home />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/restock-requests" element={<RestockRequests />} />
      < Route path="/wishlist" element={<WishList />} />
      < Route path="/loyalty" element={<MyLoyaltyPoint />} />
      < Route path="/inbox" element={<Inbox />} />
      < Route path="/address" element={<MyAddress />} />
      < Route path="/support" element={<SupportTicket />} />
      < Route path="/refer" element={<ReferEarn />} />
      < Route path="/coupons" element={<Coupons />} />
      < Route path="/track-order" element={<TrackOrder />} />
      <Route path="/product/:pid" element={<ProductView />} />
      <Route path="/checkout" element={<CheckOut />} />


      <Route path="/terms-conditions" element={<TermsConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/return-policy" element={<ReturnPolicy />} />
      <Route path="/cancellation-policy" element={<CancellationPolicy />} />
      <Route path="/shipping-policy" element={<ShippingPolicy />} />



      {/* 404 Route */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-gray-500">404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes >
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;