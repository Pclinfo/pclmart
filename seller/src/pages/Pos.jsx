import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import config from './config';

const Pos = () => {
  const [products, setProducts] = useState([]);
  const [activeContent, setActiveContent] = useState(' ');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(['All categories']);
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState('Walking customer');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [paidAmount, setPaidAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageLoading, setImageLoading] = useState({});

  const fetchProducts = async () => {
    try {
      setError(null);
      setLoading(true);

      const getToken = () => {
        const localToken = localStorage.getItem('token');
        if (localToken) return localToken;

        const sessionToken = sessionStorage.getItem('token');
        if (sessionToken) return sessionToken;

        console.warn('No authentication token found');
        throw new Error('Authentication token is missing');
      };

      const token = getToken();

      const axiosConfig = {
        method: 'post',
        url: `${config.apiUrl}/product_details`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        timeout: 15000,
        timeoutErrorMessage: 'Request timed out. Please check your network connection.',
        validateStatus: function (status) {
          return status >= 200 && status < 300;
        },
        withCredentials: false
      };

      const response = await axios(axiosConfig);

      if (!response.data || !Array.isArray(response.data.products)) {
        throw new Error('Invalid response format: Expected an array of products');
      }

      const processedProducts = response.data.products.map(product => {
        try {
          let thumbnailUrl = '/default-product-image.png';

          if (product.product_thumbnail) {
            const cleanedThumbnailPath = product.product_thumbnail
              .replace(/^\.\//, '')
              .replace(/^\/\//, '/')
              .trim();

            thumbnailUrl = cleanedThumbnailPath.startsWith('http')
              ? cleanedThumbnailPath
              : `${config.apiUrl}/${cleanedThumbnailPath}`;
          }

          return {
            ...product,
            product_name: product.product_name || 'Unnamed Product',
            product_type: product.product_type || 'N/A',
            unit_price: Number(product.unit_price) || 0,
            verify_status: product.verify_status || 'Not Verified',
            active_status: product.active_status !== undefined
              ? product.active_status
              : false,
            product_thumbnail: thumbnailUrl,
            pid: product.pid || product.id || Date.now()
          };
        } catch (productProcessingError) {
          console.error('Error processing individual product:', productProcessingError);
          return {
            pid: Date.now(),
            product_name: 'Processing Error',
            product_thumbnail: '/default-product-image.png'
          };
        }
      });

      setProducts(processedProducts);
      setFilteredProducts(processedProducts);

      const initialImageLoading = {};
      processedProducts.forEach(product => {
        initialImageLoading[product.pid] = true;
      });
      setImageLoading(initialImageLoading);

      const uniqueCategories = ['All categories', ...new Set(processedProducts.map(p => p.product_type))];
      setCategories(uniqueCategories);

    } catch (error) {
      console.error('Products Fetch Error:', error);

      if (error.response) {
        console.error('Server Response Error:', {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers
        });

        switch (error.response.status) {
          case 401:
            setError('Authentication failed. Please log in again.');
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            break;
          case 403:
            setError('You do not have permission to access products.');
            break;
          case 404:
            setError('Product endpoint not found. Please contact support.');
            break;
          case 500:
            setError('Internal server error. Please try again later.');
            break;
          default:
            setError('An unexpected error occurred while fetching products.');
        }
      } else if (error.request) {
        console.error('No Response Received:', error.request);

        if (error.code === 'ECONNABORTED') {
          setError('Request timed out. Please check your network connection.');
        } else if (error.message.includes('Network Error')) {
          setError('Unable to connect to the server. Please check your network or server status.');
        } else {
          setError('No response from server. Please check your network connection.');
        }
      } else {
        console.error('Request Setup Error:', error.message);
        setError(`Request error: ${error.message}`);
      }

      setProducts([]);
      setFilteredProducts([]);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'All categories' ||
        product.product_type === selectedCategory;
      const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  const cartTotals = {
    subTotal: cart.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0),
    productDiscount: 0,
    extraDiscount: 0,
    couponDiscount: 0,
    tax: 0,
  };
  const total = cartTotals.subTotal - cartTotals.productDiscount - cartTotals.extraDiscount -
    cartTotals.couponDiscount + cartTotals.tax;
  const changeAmount = paidAmount - total;

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="flex h-screen bg-gray-100">
            {/* Left Section - Products */}
            <div className="w-2/3 p-4 overflow-y-auto">
              <div className="mb-4 flex gap-4">
                <select
                  className="border p-2 rounded-md w-48"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Search by name or sku"
                  className="border p-2 rounded-md flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.product_sku}
                    className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowModal(true);
                    }}
                  >
                    <img
                      src={product.product_thumbnail}
                      alt={product.product_name}
                      className="mb-4 overflow-hidden relative h-34"
                    />
                    <h3 className="font-semibold">{product.product_name}</h3>
                    <p className="text-blue-600">${product.unit_price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section - Billing */}
            <div className="w-1/3 bg-white p-4 border-l">
              <div className="flex justify-between mb-4">
                <select
                  className="border p-2 rounded-md"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                >
                  <option value="Walking customer">Walking customer</option>
                  {/* Add more customer options here */}
                </select>
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-md">
                  Add New Customer
                </button>
              </div>

              <div className="flex justify-between mb-4">
                <button className="text-blue-600" onClick={() => setCart([])}>
                  Clear Cart
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                  New Order
                </button>
              </div>

              <table className="w-full mb-4">
                <thead>
                  <tr>
                    <th className="text-left">Item</th>
                    <th className="text-center">Qty</th>
                    <th className="text-right">Price</th>
                    <th className="text-right">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product_name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">${(item.unit_price * item.quantity).toFixed(2)}</td>
                      <td className="text-right">
                        <button
                          className="text-red-500"
                          onClick={() => setCart(cart.filter((_, i) => i !== index))}
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Sub Total:</span>
                  <span>${cartTotals.subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Product Discount:</span>
                  <span>${cartTotals.productDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Extra Discount:</span>
                  <span>${cartTotals.extraDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Coupon Discount:</span>
                  <span>${cartTotals.couponDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${cartTotals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="mb-2">Paid By:</p>
                <div className="flex gap-2">
                  <button
                    className={`px-4 py-2 rounded-md ${paymentMethod === 'Cash' ? 'bg-blue-600 text-white' : 'border'}`}
                    onClick={() => setPaymentMethod('Cash')}
                  >
                    Cash
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md ${paymentMethod === 'Card' ? 'bg-blue-600 text-white' : 'border'}`}
                    onClick={() => setPaymentMethod('Card')}
                  >
                    Card
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div>
                  <label>Paid Amount:</label>
                  <input
                    type="number"
                    className="border p-2 rounded-md w-full"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label>Change Amount:</label>
                  <input
                    type="text"
                    className="border p-2 rounded-md w-full"
                    value={`$${changeAmount.toFixed(2)}`}
                    disabled
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-red-500 text-white py-2 rounded-md">
                  Cancel Order
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-md">
                  Place Order
                </button>
              </div>
            </div>

            {/* Product Modal */}
            {showModal && selectedProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg max-w-md w-full p-6">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">{selectedProduct.product_name}</h2>
                    <button onClick={() => setShowModal(false)}>
                      <X size={24} />
                    </button>
                  </div>
                  <img
                    src={selectedProduct.product_thumbnail}
                    alt={selectedProduct.product_name}
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                  <div className="space-y-2 mb-4">
                    <p><span className="font-semibold">Category:</span> {selectedProduct.product_category}</p>
                    <p><span className="font-semibold">SKU:</span> {selectedProduct.product_sku}</p>
                    <p><span className="font-semibold">Price:</span> ${selectedProduct.unit_price.toFixed(2)}</p>
                  </div>
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-md"
                    onClick={() => {
                      setCart([...cart, { ...selectedProduct, quantity: 1 }]);
                      setShowModal(false);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Pos;