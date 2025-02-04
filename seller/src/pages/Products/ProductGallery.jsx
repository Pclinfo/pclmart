import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../config';

const ProductGallery = () => {
  const [products, setProducts] = useState([]);
  const [activeContent, setActiveContent] = useState(' ');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      // Reset error state and start loading
      setError(null);
      setLoading(true);

      // Enhanced token retrieval with multiple fallback methods
      const getToken = () => {
        // Check localStorage first
        const localToken = localStorage.getItem('token');
        if (localToken) return localToken;

        // Then check sessionStorage
        const sessionToken = sessionStorage.getItem('token');
        if (sessionToken) return sessionToken;

        // If no token found, log and throw an error
        console.warn('No authentication token found');
        throw new Error('Authentication token is missing');
      };

      // Get token for authorization
      const token = getToken();

      // Prepare axios configuration with enhanced error handling
      const axiosConfig = {
        method: 'get',
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

      // Make the API call with additional error prevention
      const response = await axios(axiosConfig);

      // Validate response more robustly
      if (!response.data || !Array.isArray(response.data.products)) {
        throw new Error('Invalid response format: Expected an array of products');
      }

      // Process products with comprehensive error handling
      const processedProducts = response.data.products.map(product => {
        try {
          // Default values and sanitization
          let thumbnailUrl = '/default-product-image.png';

          // Process thumbnail URL with multiple fallback mechanisms
          if (product.product_thumbnail) {
            const cleanedThumbnailPath = product.product_thumbnail
              .replace(/^\.\//, '') // Remove leading './'
              .replace(/^\/\//, '/') // Replace double slashes with single slash
              .trim(); // Remove any whitespace

            // Construct full URL with error prevention
            thumbnailUrl = cleanedThumbnailPath.startsWith('http')
              ? cleanedThumbnailPath
              : `${config.apiUrl}${cleanedThumbnailPath}`;
          }

          // Comprehensive product object creation with default values
          return {
            ...product,
            product_name: product.product_name || 'Unnamed Product',
            product_category: product.product_category || 'N/A',
            sub_category: product.sub_category || 'N/A',
            product_type: product.product_type || 'N/A',
            product_sku: product.product_sku || 'N/A',
            product_description: product.product_description || 'No description available',
            unit_price: Number(product.unit_price) || 0,
            verify_status: product.verify_status || 'Not Verified',
            active_status: product.active_status !== undefined
              ? product.active_status
              : false,
            product_thumbnail: thumbnailUrl,
            pid: product.pid || product.id || Date.now() // Fallback unique identifier
          };
        } catch (productProcessingError) {
          console.error('Error processing individual product:', productProcessingError);
          // Return a minimal safe object if processing fails
          return {
            pid: Date.now(),
            product_name: 'Processing Error',
            product_thumbnail: '/default-product-image.png'
          };
        }
      });

      // Update state with processed products
      setProducts(processedProducts);

      // Optional: Log successful fetch
      console.log(`Successfully fetched ${processedProducts.length} products`);

    } catch (error) {
      // Comprehensive error handling
      console.error('Products Fetch Error:', error);

      // Detailed error type checking
      if (error.response) {
        console.error('Server Response Error:', {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers
        });

        // Specific error messages based on status
        switch (error.response.status) {
          case 401:
            setError('Authentication failed. Please log in again.');
            // Clear tokens
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

      // Clear products on error
      setProducts([]);

    } finally {
      // Ensure loading is set to false regardless of success or failure
      setLoading(false);
    }
  };

  // Trigger fetch on component mount
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  // Render Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Products...</p>
        </div>
      </div>
    );
  }

  // Render Error State
  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}

          <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {products.map((product) => (
                  <div
                    key={product.pid}
                    className="bg-gray-100 rounded-lg overflow-hidden shadow-md"
                  >
                    <div className="p-4">
                      <div className="mb-4 overflow-hidden relative h-34">
                        <img
                          src={product.product_thumbnail}
                          alt={product.product_name}
                          className="w-full h-28 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/default-product-image.png';
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold truncate">
                          {product.product_name}
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Category:</strong> {product.product_category}</p>
                          <p><strong>Sub-Category:</strong> {product.sub_category}</p>
                          <p><strong>Type:</strong> {product.product_type}</p>
                          <p><strong>SKU:</strong> {product.product_sku}</p>
                          <p className="line-clamp-2"><strong>Description:</strong> {product.product_description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Products Found */}
              {products.length === 0 && (
                <div className="text-center py-8 bg-gray-50">
                  <p className="text-gray-600">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;