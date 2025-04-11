import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AuthContext, { AuthProvider } from './context/AuthContext';

// Main Pages
import Dashboard from './pages/Dashboard';
import Pos from './pages/Pos';


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
import PendingRefunds from './pages/Refund Requests/PendingRefunds'
import ApprovedRefunds from './pages/Refund Requests/ApprovedRefunds';
import RejectedRefunds from './pages/Refund Requests/RejectedRefunds';
import RefundedRequests from './pages/Refund Requests/RefundedRequests';


// Category pages
import Categories from './pages/Category Setup/Categories'
import SubCategories from './pages/Category Setup/SubCategories';
import SubSubCategories from './pages/Category Setup/SubSubCategories'

// Brand Pages
import AddNew from './pages/Brand/AddNew'
import List from './pages/Brand/List'

// Attribute Pages
import Setup from './pages/Attribute/Setup'

// Inhouse Pages
import ProductList from './pages/Inhouse/ProductList'
import AddNewProduct from './pages/Inhouse/AddNewProduct'
import RequestRestockList from './pages/Inhouse/RequestRestockList'

// Manufacturer Pages
import NewProductRequest from './pages/Manufacturer/NewProductsRequest'
import ProductUpdateRequest from './pages/Manufacturer/ProductUpdateRequest'
import ApprovedProducts from './pages/Manufacturer/ApprovedProducts'
import DeniedProducts from './pages/Manufacturer/DeniedProducts'

//Product Gallery Pages 
import Gallery from './pages/Product Gallery/Gallery'

//Banner Setup Pages
import BannerSetup from './pages/BannerSetup';

// Offer Deals Pages
import Coupon from './pages/Offer Deal/Coupon'
import FlashDeals from './pages/Offer Deal/FlashDeals'
import DealsoftheDay from './pages/Offer Deal/DealsoftheDay'
import FeaturedDeal from './pages/Offer Deal/FeaturedDeal'

// Notification Pages
import SendNotification from './pages/Notification/SendNotification'
import PushNotification from './pages/Notification/PushNotification'

// Announcement Pages
import Post from './pages/Announcement/Post'

// Report Analysis Pages
import EarningReports from './pages/Report Analysis/EarningReports'
import InhouseSales from './pages/Report Analysis/InhouseSales'
import VendorSales from './pages/Report Analysis/VendorSales'
import TransactionReport from './pages/Report Analysis/TransactionReport'

// Product Report Pages, Product Order Pages
import ProductReport from './pages/ProductReport';
import OrderReport from './pages/OrderReport';

// Customer Pages
import CustomerList from './pages/Customer/CustomerList'
import CustomerReviews from './pages/Customer/CustomerReviews'
import Wallet from './pages/Customer/Wallet'
import WalletBonusSetup from './pages/Customer/WalletBonusSetup'
import LoyaltyPoints from './pages/Customer/LoyaltyPoints'

// Manufacturer User Pages
import AddNewManufacturer from './pages/Manufacturer User/AddNewManufacturer'
import VendorLit from './pages/Manufacturer User/VendorList'
import Withdraws from './pages/Manufacturer User/Withdraws'
import WithdrawalMethods from './pages/Manufacturer User/WithdrawalMethods'

// Employess Pages
import EmployeeRoleSetup from './pages/Employee/EmployeeRoleSetup'
import Employees from './pages/Employee/Employees'

// Business Setting Pages
import BusinessSettings from './pages/Business Setting/BusinessSettings'
import InhouseShop from './pages/Business Setting/InhouseShop'
import SEOSettings from './pages/Business Setting/SEOSettings'

// System Setting Pages
import SystemSettings from './pages/System Setting/SystemSettings'
import LoginSettings from './pages/System Setting/LoginSettings'
import ThemesAddons from './pages/System Setting/ThemesAddons'
import EmailTemplate from './pages/System Setting/EmailTemplate'

// Payment Pages 
import PaymentMethods from './pages/Payment/PaymentMethods'
import OtherConfiguration from './pages/Payment/OtherConfiguration'

// Pages Media Pages
import BusinessPages from './pages/PagesMedia/BusinessPages'
import SocialMediaLinks from './pages/PagesMedia/SocialMediaLinks'
import MediaGallery from './pages/PagesMedia/MediaGallery';
import FileView from './pages/PagesMedia/FileView';
import ManufacturerRegistration from './pages/PagesMedia/ManufacturerRegistration'


// Pages Help & Support 
import Index from './pages/HelpSupport/Index'
import Messages from './pages/HelpSupport/Messages';
import AdminSupportTicket from './pages/HelpSupport/AdminSupportTicket';

// Profile Information Pages
import ProfileInformation from './pages/ProfileInformation';

// General Pages
import General from './pages/Business Setup/General';
import PaymentOptions from './pages/Business Setup/PaymentOptions';

// Subscribers Pages
import Subscribers from './pages/Subscribers';




const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="relative">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-900"></div>

      {/* Primary spinner */}
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>

      {/* Secondary spinner (counter rotation) */}
      <div className="absolute inset-0 animate-spin rounded-full h-32 w-32 border-r-4 border-indigo-500 animate-[spin_1.5s_linear_infinite_reverse]"></div>

      {/* Pulsing center */}
      <div className="absolute left-1/2 top-1/2 -ml-8 -mt-8 h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 animate-pulse"></div>

      {/* Optional loading text */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-600 dark:text-gray-300 animate-pulse">
        Loading...
      </div>
    </div>
  </div>
);

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
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Point Of Sales Routes */}
      <Route path="/pos" element={<ProtectedRoute><Pos /></ProtectedRoute>} />


      {/* Profile Information Routes */}
      <Route path="/profile-information" element={<ProtectedRoute><ProfileInformation /></ProtectedRoute>} />

      {/* Help & Support Routes */}
      <Route path="/index" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path="/support-ticket" element={<ProtectedRoute><AdminSupportTicket /></ProtectedRoute>} />



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

      {/* Category Routes */}
      <Route path="/categorysetup/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
      <Route path="/categorysetup/sub-categories" element={<ProtectedRoute><SubCategories /></ProtectedRoute>} />
      <Route path="/categorysetup/sub-sub-categories" element={<ProtectedRoute><SubSubCategories /></ProtectedRoute>} />

      {/* Brand Routes */}
      <Route path="/brands/add-new" element={<ProtectedRoute><AddNew /></ProtectedRoute>} />
      <Route path="/brands/list" element={<ProtectedRoute><List /></ProtectedRoute>} />

      {/* Attribute Routes */}
      <Route path="/attributes/attributes-setup" element={<ProtectedRoute><Setup /></ProtectedRoute>} />

      {/* Inhouse Routes */}
      <Route path="/inhouse/product-list" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
      <Route path="/inhouse/add-new-product" element={<ProtectedRoute><AddNewProduct /></ProtectedRoute>} />
      <Route path="/inhouse/request-restock-list" element={<ProtectedRoute><RequestRestockList /></ProtectedRoute>} />

      {/* Manufacturer Routes */}
      <Route path="/manufacturer/new-products-request" element={<ProtectedRoute><NewProductRequest /></ProtectedRoute>} />
      <Route path="/manufacturer/products-update-request" element={<ProtectedRoute><ProductUpdateRequest /></ProtectedRoute>} />
      <Route path="/manufacturer/approved-products" element={<ProtectedRoute><ApprovedProducts /></ProtectedRoute>} />
      <Route path="/manufacturer/denied-prducts" element={<ProtectedRoute><DeniedProducts /></ProtectedRoute>} />

      {/* Product Gallery Routes */}
      <Route path="/productgallery/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
      <Route path="/banner-setup" element={<ProtectedRoute><BannerSetup /></ProtectedRoute>} />

      {/* Offer Deals Routes */}
      <Route path="/offerdeal/coupon" element={<ProtectedRoute><Coupon /></ProtectedRoute>} />
      <Route path="/offerdeal/flash-deals" element={<ProtectedRoute><FlashDeals /></ProtectedRoute>} />
      <Route path="/offerdeal/deals-day" element={<ProtectedRoute><DealsoftheDay /></ProtectedRoute>} />
      <Route path="/offerdeal/featured-deal" element={<ProtectedRoute><FeaturedDeal /></ProtectedRoute>} />

      {/* Notification Routes */}
      <Route path="/notification/send-notification" element={<ProtectedRoute><SendNotification /></ProtectedRoute>} />
      <Route path="/notification/push-notification" element={<ProtectedRoute><PushNotification /></ProtectedRoute>} />

      {/* Announcement Routes */}
      <Route path="/annoucement/post" element={<ProtectedRoute><Post /></ProtectedRoute>} />

      {/* Report Analysis Routes */}
      <Route path="/reportanalysis/earning-reports" element={<ProtectedRoute><EarningReports /></ProtectedRoute>} />
      <Route path="/reportanalysis/inhouse-sales" element={<ProtectedRoute><InhouseSales /></ProtectedRoute>} />
      <Route path="/reportanalysis/vendor-sales" element={<ProtectedRoute><VendorSales /></ProtectedRoute>} />
      <Route path="/reportanalysis/transaction-report" element={<ProtectedRoute><TransactionReport /></ProtectedRoute>} />

      {/* Report Routes */}
      <Route path="/products-report" element={<ProtectedRoute><ProductReport /></ProtectedRoute>} />
      <Route path="/order-report" element={<ProtectedRoute><OrderReport /></ProtectedRoute>} />

      {/* Customer Routes */}
      <Route path="/customer/customer-list" element={<ProtectedRoute><CustomerList /></ProtectedRoute>} />
      <Route path="/customer/customer-reviews" element={<ProtectedRoute><CustomerReviews /></ProtectedRoute>} />
      <Route path="/customer/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
      <Route path="/customer/wallet-bonus" element={<ProtectedRoute><WalletBonusSetup /></ProtectedRoute>} />
      <Route path="/customer/loyalty-points" element={<ProtectedRoute><LoyaltyPoints /></ProtectedRoute>} />


      {/* Manufacturer User Routes */}
      <Route path="/manufactureruser/add-new-manufacturer" element={<ProtectedRoute><AddNewManufacturer /></ProtectedRoute>} />
      <Route path="/manufactureruser/vendor-list" element={<ProtectedRoute><VendorLit /></ProtectedRoute>} />
      <Route path="/manufactureruser/withdraws" element={<ProtectedRoute><Withdraws /></ProtectedRoute>} />
      <Route path="/manufactureruser/withdrawal-method" element={<ProtectedRoute><WithdrawalMethods /></ProtectedRoute>} />

      {/* Employess Routes */}
      <Route path="/employee/employee-role-setup" element={<ProtectedRoute><EmployeeRoleSetup /></ProtectedRoute>} />
      <Route path="/employee/employees" element={<ProtectedRoute><Employees /></ProtectedRoute>} />

      {/* Business Setting Routes */}
      <Route path="/businesssetting/business-setting" element={<ProtectedRoute><BusinessSettings /></ProtectedRoute>} />
      <Route path="/businesssetting/in-house-shop" element={<ProtectedRoute><InhouseShop /></ProtectedRoute>} />
      <Route path="/businesssetting/seo-setting" element={<ProtectedRoute><SEOSettings /></ProtectedRoute>} />

      {/* System Setting Routes */}
      <Route path="/systemsetting/system-settings" element={<ProtectedRoute><SystemSettings /></ProtectedRoute>} />
      <Route path="/systemsetting/login-settings" element={<ProtectedRoute><LoginSettings /></ProtectedRoute>} />
      <Route path="/systemsetting/themes-addons" element={<ProtectedRoute><ThemesAddons /></ProtectedRoute>} />
      <Route path="/systemsetting/email-template" element={<ProtectedRoute><EmailTemplate /></ProtectedRoute>} />

      {/* Payment Routes */}
      <Route path="/payment/payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
      <Route path="/payment/other-configuration" element={<ProtectedRoute><OtherConfiguration /></ProtectedRoute>} />

      {/* Pages Media Routes */}
      <Route path="/pagesmedia/business-pages" element={<ProtectedRoute><BusinessPages /></ProtectedRoute>} />
      <Route path="/pagesmedia/social-media-links" element={<ProtectedRoute><SocialMediaLinks /></ProtectedRoute>} />
      <Route path="/pagesmedia/media-gallery" element={<ProtectedRoute><MediaGallery /></ProtectedRoute>} />
      <Route path="/pagesmedia/file-view" element={<ProtectedRoute><FileView /></ProtectedRoute>} />
      <Route path="/pagesmedia/manufacturer-registration" element={<ProtectedRoute><ManufacturerRegistration /></ProtectedRoute>} />

      {/* Pages Subscribers Routes */}
      <Route path="/subscribers" element={<ProtectedRoute><Subscribers /></ProtectedRoute>} />

      {/* Pages Business Setup Routes */}
      <Route path="/business-setup/general" element={<ProtectedRoute><General /></ProtectedRoute>} />
      <Route path="/business-setup/payment-options" element={<ProtectedRoute><PaymentOptions /></ProtectedRoute>} />


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