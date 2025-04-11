import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from './context/AuthContext';


// Import all your page components
import Login from './pages/Login';
import Register from './pages/Register';
import SellerRegisterPage from "./pages/seller/SellerRegisterPage";

// Order Management Pages
import All from './pages/Orders/All';
import PendingOrders from './pages/Orders/PendingOrders';
import ConfirmedOrders from './pages/Orders/ConfirmedOrders';
import PackagingOrders from './pages/Orders/PackagingOrders';
import OutforDelivery from './pages/Orders/OutforDelivery';
import DeliveredOrders from './pages/Orders/DeliveredOrders';
import ReturnedOrders from './pages/Orders/ReturnedOrders';
import FailedDeliveryOrders from './pages/Orders/FailedDeliveryOrders';
import CancelledOrders from './pages/Orders/CancelledOrders';

// Refund Management Pages
import PendingRefunds from './pages/Refunds/PendingRefunds';
import ApprovedRefunds from './pages/Refunds/ApprovedRefunds';
import RejectedRefunds from './pages/Refunds/RejectedRefunds';
import RefundedRequests from './pages/Refunds/RefundedRequests';

// Product Management Pages
import EditProduct from './pages/Products/EditProduct';
import ViewProduct from './pages/Products/ViewProduct';
import ProductList from './pages/Products/ProductList';
import ApprovedProductList from './pages/Products/ApprovedProductList';
import NewProductRequest from './pages/Products/NewProductRequest';
import DeniedProductRequest from './pages/Products/DeniedProductRequest';
import AddNewProduct from './pages/Products/AddNewProduct';
import ProductGallery from './pages/Products/ProductGallery';
import RequestRestockList from './pages/Products/RequestRestockList';
import ProductReviews from './pages/Products/ProductReviews';

// Other Pages
import Dashboard from './pages/Dashboard';
import Pos from './pages/Pos';
import Coupons from './pages/Coupons';

// Report Pages
import TransactionReport from './pages/Reports/TransactionReport';
import ProductReport from './pages/Reports/ProductReport';
import OrderReport from './pages/Reports/OrderReport';

// Business Pages
import Withdraws from './pages/Business/Withdraws';
import BankInformation from './pages/Business/BankInformation';
import ShopSettings from './pages/Business/ShopSettings';
import UpdateShopSettings from './pages/Business/UpdateShopSettings';
import EditBankInfo from './pages/Business/EditBankInfo';

// Profile Information Pages
import ProfileInformation from './pages/ProfileInformation';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (isAuthenticated && user) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

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
        element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/callback"
        element={<Register redirectAfterLogin={true} />}
      />
      <Route path="/seller-register-page" element={<SellerRegisterPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/profile-information" element={<ProtectedRoute><ProfileInformation /></ProtectedRoute>} />
      {/* Order Management Routes */}
      <Route path="/orders/all" element={<ProtectedRoute><All /></ProtectedRoute>} />
      <Route path="/orders/pending" element={<ProtectedRoute><PendingOrders /></ProtectedRoute>} />
      <Route path="/orders/confirmed" element={<ProtectedRoute><ConfirmedOrders /></ProtectedRoute>} />
      <Route path="/orders/packaging" element={<ProtectedRoute><PackagingOrders /></ProtectedRoute>} />
      <Route path="/orders/out-for-delivery" element={<ProtectedRoute><OutforDelivery /></ProtectedRoute>} />
      <Route path="/orders/delivered" element={<ProtectedRoute><DeliveredOrders /></ProtectedRoute>} />
      <Route path="/orders/returned" element={<ProtectedRoute><ReturnedOrders /></ProtectedRoute>} />
      <Route path="/orders/failed-to-deliver" element={<ProtectedRoute><FailedDeliveryOrders /></ProtectedRoute>} />
      <Route path="/orders/cancelled" element={<ProtectedRoute><CancelledOrders /></ProtectedRoute>} />

      {/* Refund Management Routes */}
      <Route path="/refunds/pending" element={<ProtectedRoute><PendingRefunds /></ProtectedRoute>} />
      <Route path="/refunds/approved" element={<ProtectedRoute><ApprovedRefunds /></ProtectedRoute>} />
      <Route path="/refunds/rejected" element={<ProtectedRoute><RejectedRefunds /></ProtectedRoute>} />
      <Route path="/refunds/refunded" element={<ProtectedRoute><RefundedRequests /></ProtectedRoute>} />

      {/* Product Management Routes */}
      <Route path="/edit-product/:pid" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
      <Route path="/view-product/:pid" element={<ProtectedRoute><ViewProduct /></ProtectedRoute>} />
      <Route path="/products/products-list" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
      <Route path="/products/approved-product-list" element={<ProtectedRoute><ApprovedProductList /></ProtectedRoute>} />
      <Route path="/products/new-product-request" element={<ProtectedRoute><NewProductRequest /></ProtectedRoute>} />
      <Route path="/products/denied-product-request" element={<ProtectedRoute><DeniedProductRequest /></ProtectedRoute>} />
      <Route path="/products/add-new-product" element={<ProtectedRoute><AddNewProduct /></ProtectedRoute>} />
      <Route path="/products/product-gallery" element={<ProtectedRoute><ProductGallery /></ProtectedRoute>} />
      <Route path="/products/request-restock-list" element={<ProtectedRoute><RequestRestockList /></ProtectedRoute>} />
      <Route path="/product-reviews" element={<ProtectedRoute><ProductReviews /></ProtectedRoute>} />

      {/* Other Protected Routes */}
      <Route path="/pos" element={<ProtectedRoute><Pos /></ProtectedRoute>} />
      <Route path="/coupons" element={<ProtectedRoute><Coupons /></ProtectedRoute>} />
      <Route path="/transaction-report" element={<ProtectedRoute><TransactionReport /></ProtectedRoute>} />
      <Route path="/products-report" element={<ProtectedRoute><ProductReport /></ProtectedRoute>} />
      <Route path="/order-report" element={<ProtectedRoute><OrderReport /></ProtectedRoute>} />
      <Route path="/withdraws" element={<ProtectedRoute><Withdraws /></ProtectedRoute>} />
      <Route path="/bank-information" element={<ProtectedRoute><BankInformation /></ProtectedRoute>} />
      <Route path="/edit-bank-info" element={<ProtectedRoute><EditBankInfo /></ProtectedRoute>} />
      <Route path="/shop-settings" element={<ProtectedRoute><ShopSettings /></ProtectedRoute>} />
      <Route path="/update-shop-settings" element={<ProtectedRoute><UpdateShopSettings /></ProtectedRoute>} />


      {/* Root and Fallback Routes */}
      <Route
        path="/"
        element={
          isAuthenticated
            ? <Navigate to="/dashboard" />
            : <Navigate to="/login" />
        }
      />

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-gray-500">404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
};

export default App;