import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';
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

const NewProductsRequest = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [activeContent, setActiveContent] = useState(' ');
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState({});
  const [toggleStates, setToggleStates] = useState({});

  const ImageSkeleton = () => (
    <div className="w-16 h-16 bg-gray-300 animate-pulse rounded-md"></div>
  );

  const safeJSONParse = (value, fallback) => {
    if (value === null || value === undefined) return !!fallback;
    try {
      const parsed = JSON.parse(value);
      return typeof parsed === 'boolean' ? parsed : !!fallback;
    } catch (e) {
      return !!fallback;
    }
  };

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
        url: `${config.apiUrl}/admin_product_details`,
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
            active_status: product.active_status !== undefined ? product.active_status : false,
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

      const initialStates = {};
      processedProducts.forEach(product => {
        initialStates[`status_${product.pid}`] = safeJSONParse(
          localStorage.getItem(`product_status_${product.pid}`),
          product.active_status
        );
        initialStates[`featured_${product.pid}`] = safeJSONParse(
          localStorage.getItem(`product_featured_${product.pid}`),
          product.is_featured
        );
      });
      setToggleStates(initialStates);

      const initialImageLoading = {};
      processedProducts.forEach(product => {
        initialImageLoading[product.pid] = true;
      });
      setImageLoading(initialImageLoading);

    } catch (error) {
      console.error('Products Fetch Error:', error);
      handleFetchError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchError = (error) => {
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleToggleStatus = async (productId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const newStatus = !currentStatus;
      setToggleStates(prev => ({
        ...prev,
        [`status_${productId}`]: newStatus
      }));

      localStorage.setItem(`product_status_${productId}`, JSON.stringify(newStatus));

      const response = await axios.post(
        `${config.apiUrl}/product_status/${productId}`,
        { active_status: newStatus },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200 && response.data.success) {
        const updateProducts = (prevProducts) => {
          return prevProducts.map(product => {
            if (product.pid === productId) {
              return {
                ...product,
                active_status: newStatus
              };
            }
            return product;
          });
        };

        setProducts(prev => updateProducts(prev));
        setFilteredProducts(prev => updateProducts(prev));
      } else {
        throw new Error(response.data.error || 'Failed to update product status');
      }
    } catch (error) {
      console.error('Error toggling product status:', error);
      setToggleStates(prev => ({
        ...prev,
        [`status_${productId}`]: currentStatus
      }));
      localStorage.setItem(`product_status_${productId}`, JSON.stringify(currentStatus));
      alert(error.response?.data?.error || 'Failed to update product status');
    }
  };

  const handleToggleFeatured = async (productId, currentFeatured) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const newFeatured = !currentFeatured;
      setToggleStates(prev => ({
        ...prev,
        [`featured_${productId}`]: newFeatured
      }));

      localStorage.setItem(`product_featured_${productId}`, JSON.stringify(newFeatured));

      const response = await axios.post(
        `${config.apiUrl}/product_featured/${productId}`,
        { is_featured: newFeatured },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200 && response.data.success) {
        const updateProducts = (prevProducts) => {
          return prevProducts.map(product => {
            if (product.pid === productId) {
              return {
                ...product,
                is_featured: newFeatured
              };
            }
            return product;
          });
        };

        setProducts(prev => updateProducts(prev));
        setFilteredProducts(prev => updateProducts(prev));
      } else {
        throw new Error(response.data.error || 'Failed to update featured status');
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
      setToggleStates(prev => ({
        ...prev,
        [`featured_${productId}`]: currentFeatured
      }));
      localStorage.setItem(`product_featured_${productId}`, JSON.stringify(currentFeatured));
      alert(error.response?.data?.error || 'Failed to update featured status');
    }
  };

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewProduct = async (pid) => {
    try {
      const response = await axios.get(`${config.apiUrl}/product_details/${pid}`);
      console.log('Product Details:', response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert('Error fetching product details');
    }
  };

  const handleEditProduct = (pid) => {
    navigate(`/edit-product/${pid}`);
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
      alert(error.response?.data?.error || 'Failed to delete product');
    }
  };

  const handleExport = () => {
    console.log('Export functionality to be implemented');
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
                      <th className="px-4 py-3 text-left hidden sm:table-cell font-normal">Show as featured</th>
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
                        <td className="px-4 py-3 text-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={toggleStates[`featured_${product.pid}`] ?? product.is_featured}
                              onChange={() => handleToggleFeatured(
                                product.pid,
                                toggleStates[`featured_${product.pid}`] ?? product.is_featured
                              )}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={toggleStates[`status_${product.pid}`] ?? product.active_status}
                              onChange={() => handleToggleStatus(
                                product.pid,
                                toggleStates[`status_${product.pid}`] ?? product.active_status
                              )}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                          </label>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center space-x-2">
                        
                            <button
                              onClick={() => handleViewProduct(product.id)}
                              className="text-green-500 hover:text-green-700 transition"
                              title="Quick View"
                            >
                              <Eye size={18} />
                            </button>

                            <button
                              onClick={() => handleEditProduct(product.id)}
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

export default NewProductsRequest;