import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../config';
import {
  Eye,
  FilePenLine,
  Trash2,
  Barcode,
  Search,
  FileSpreadsheet,
  PackageCheck,
  PackagePlus,
  Filter
} from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [activeContent, setActiveContent] = useState(' ')
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState({});

  const ImageSkeleton = () => (
    <div className="w-16 h-16 bg-gray-300 animate-pulse rounded-md"></div>
  );

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
        method: 'POST',
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
              : `${config.apiUrl}/${cleanedThumbnailPath}`;
          }

          // Comprehensive product object creation with default values
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
      setFilteredProducts(processedProducts);

      // Initialize image loading state
      const initialImageLoading = {};
      processedProducts.forEach(product => {
        initialImageLoading[product.pid] = true;
      });
      setImageLoading(initialImageLoading);

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
      setFilteredProducts([]);

    } finally {
      // Ensure loading is set to false regardless of success or failure
      setLoading(false);
    }
  };

  // Trigger fetch on component mount
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  const handleImageLoad = (productId) => {
    setImageLoading(prev => ({
      ...prev,
      [productId]: false
    }));
  };

  const handleImageError = (productId, e) => {
    e.target.onerror = null;
    e.target.src = '/default-product-image.png';
    setImageLoading(prev => ({
      ...prev,
      [productId]: false
    }));
  };


  // Search and Filtering
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase()) ||
      product.product_type.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewProduct = async (pid) => {
    try {
      if (!pid) {
        throw new Error('No product ID provided');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Verify the product exists before navigation
      const response = await axios.get(`${config.apiUrl}/product_detail/${pid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.products && response.data.products.length > 0) {
        // Product exists, navigate to view page
        navigate(`/view-product/${pid}`);
      } else {
        throw new Error('Product not found');
      }

    } catch (error) {
      console.error('Error viewing product details:', error);

      if (error.response) {
        switch (error.response.status) {
          case 404:
            alert('Product not found');
            break;
          case 401:
            alert('Please login to continue');
            navigate('/login');
            break;
          default:
            alert('Error accessing product details');
        }
      } else {
        alert('Unable to access product details. Please try again.');
      }
    }
  };


  const handleEditProduct = async (pid) => {
    try {
      if (!pid) {
        throw new Error('No product ID provided');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Verify the product exists before navigation
      const response = await axios.get(`${config.apiUrl}/product_detail/${pid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.products && response.data.products.length > 0) {
        // Product exists, navigate to edit page
        navigate(`/edit-product/${pid}`);
      } else {
        throw new Error('Product not found');
      }

    } catch (error) {
      console.error('Error handling edit product:', error);

      if (error.response) {
        switch (error.response.status) {
          case 404:
            alert('Product not found');
            break;
          case 401:
            alert('Please login to continue');
            navigate('/login');
            break;
          default:
            alert('Error accessing product details');
        }
      } else {
        alert('Unable to access product details. Please try again.');
      }
    }
  };


  const handleDeleteProduct = async (pid) => {
    if (!pid) {
      console.error('Invalid product ID: Cannot delete product');
      alert('Error: Product ID is missing');
      return;
    }

    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this product?');
      if (!confirmDelete) return;

      const response = await axios.delete(`${config.apiUrl}/delete_product/${pid}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('pid:', `${pid}`)

      if (response.status === 200) {
        const updatedProducts = products.filter(product => product.pid !== pid);
        setProducts(updatedProducts);
        setFilteredProducts(updatedProducts);
        alert('Product deleted successfully');
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);

      if (error.response) {
        alert(`Delete failed: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        alert('No response received from server. Check your network connection.');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting products...');
  };

  const handleLimitedStocks = () => {
    const limitedStockProducts = products.filter(product =>
      product.stock_quantity && product.stock_quantity < 10
    );
    setFilteredProducts(limitedStockProducts);
    setCurrentPage(1);
  };

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
              {/* Search and Action Bar */}
              <div className="p-4 bg-gray-100 flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-2 mb-2 md:mb-0">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Search Products"
                      value={searchQuery}
                      onChange={handleSearch}
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>
                <div className="flex flex-wrap space-x-2">
                  <button
                    onClick={handleExport}
                    className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    <FileSpreadsheet className="mr-2" size={18} />
                    Export
                  </button>
                  <button
                    onClick={handleLimitedStocks}
                    className="flex items-center bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    <PackageCheck className="mr-2" size={18} />
                    Low Stock
                  </button>
                  <button
                    className="flex items-center bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-600 transition"
                  >
                    <PackagePlus className="mr-2" size={18} />
                    Add Product
                  </button>
                </div>
              </div>

              {/* Product Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-normal">SL</th>
                      <th className="px-4 py-3 text-left font-normal">Product Image</th>
                      <th className="px-4 py-3 text-left font-normal">Product Name</th>
                      <th className="px-4 py-3 text-left hidden md:table-cell font-normal">Product Type</th>
                      <th className="px-4 py-3 text-right hidden md:table-cell font-normal">Unit Price</th>
                      <th className="px-4 py-3 text-left hidden sm:table-cell font-normal">Status</th>
                      <th className="px-4 py-3 text-center font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product, index) => (
                      <tr
                        key={product.pid || product.id || index}
                        className="border-b hover:bg-gray-100 transition"
                      >
                        <td className="px-4 py-3">{indexOfFirstProduct + index + 1}</td>
                        <td className="px-4 py-3">
                          {imageLoading[product.id] ? (
                            <ImageSkeleton />
                          ) : (
                            <img
                              src={product.product_thumbnail}
                              alt={product.product_name}
                              className="mb-2 py-2 overflow-hidden relative h-24 rounded-md"
                              onLoad={() => handleImageLoad(product.pid)}
                              onError={(e) => handleImageError(product.pid, e)}
                            />
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium">{product.product_name}</td>
                        <td className="px-4 py-3 hidden md:table-cell">{product.product_type}</td>
                        <td className="px-4 py-3 text-right hidden md:table-cell">
                          ${product.unit_price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold 
                          ${product.active_status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {product.active_status ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleViewProduct(product.pid)}
                              className="text-green-500 hover:text-green-700 transition"
                              title="Quick View"
                            >
                              <Eye size={18} />
                            </button>

                            <button
                              onClick={() => handleEditProduct(product.pid)}
                              className="text-yellow-500 hover:text-yellow-700 transition"
                              title="Edit Product"
                            >
                              <FilePenLine size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.pid)}
                              className="text-red-500 hover:text-red-700 transition"
                              title="Delete Product"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredProducts.length > productsPerPage && (
                <div className="flex justify-center space-x-2 p-4">
                  {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-1 rounded-md transition ${currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}

              {/* No Products Found */}
              {filteredProducts.length === 0 && (
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

export default ProductList;