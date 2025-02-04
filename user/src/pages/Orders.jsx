import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AuthContext from '../context/AuthContext';
import { Package, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';


// Separate OrderCard component
const OrderCard = ({ order, isNewOrder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-expand if this is a new order
  useEffect(() => {
    if (isNewOrder) {
      setIsExpanded(true);
    }
  }, [isNewOrder]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600';
      case 'processing':
        return 'text-blue-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 mb-4 ${isNewOrder ? 'ring-2 ring-blue-500' : ''
      }`}>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-600">Order #{order.orderId}</span>
            <span className="text-sm text-gray-500">|</span>
            <span className="text-sm text-gray-500">{formatDate(order.orderDate)}</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {getStatusIcon(order.status)}
            <span className={`font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:items-end mt-2 md:mt-0">
          <span className="font-semibold text-lg">₹{order.total.toFixed(2)}</span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Details
              </>
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 border-t pt-4">
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4">
                <img
                  src={item.product_thumbnail || '/api/placeholder/80/80'}
                  alt={item.product_name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.product_name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="font-medium mt-1">₹{(item.unit_price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Delivery Address</h4>
            <div className="text-sm text-gray-600">
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.locality}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p>Phone: {order.shippingAddress.phone_number}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>₹{order.shipping.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Success Notification Component
const SuccessNotification = ({ message, onClose }) => (
  <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 p-4 rounded shadow-lg z-50">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
        <p className="text-green-700">{message}</p>
      </div>
      <button onClick={onClose} className="text-green-500 hover:text-green-700 ml-4">
        <XCircle className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Main Orders Component
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchOrders = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/orders`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user, navigate]);

  useEffect(() => {
    if (location.state?.success) {
      setShowNotification(true);
      setNotificationMessage(location.state.message);
      // Clear the state after showing notification
      window.history.replaceState({}, document.title);
      // Hide notification after 5 seconds
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const isNewOrder = (orderId) => {
    return location.state?.newOrder === orderId;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {showNotification && (
        <SuccessNotification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}

      <div className="flex flex-col lg:flex-row flex-1 bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading orders...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setError(null);
                    fetchOrders();
                  }}
                  className="text-red-600 hover:text-red-700 mt-2 underline"
                >
                  Try Again
                </button>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-4">When you place orders, they will appear here</p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard
                    key={order.orderId}
                    order={order}
                    isNewOrder={isNewOrder(order.orderId)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;