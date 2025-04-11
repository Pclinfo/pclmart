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
  const [imageLoadErrors, setImageLoadErrors] = useState(new Set());


  const handleImageError = (productId) => {
    setImageLoadErrors(prev => new Set([...prev, productId]));
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
          const defaultImage = '/default-product-image.png';
          let thumbnailUrl = defaultImage;

          if (product.product_thumbnail) {

            const cleanedUrl = product.product_thumbnail
              .replace(/^\.\//, '')
              .replace(/^\/\//, '/')
              .trim();


            if (cleanedUrl.startsWith('http')) {
              thumbnailUrl = cleanedUrl;
            } else if (cleanedUrl.startsWith('/')) {
              thumbnailUrl = `${config.apiUrl}${cleanedUrl}`;
            } else {
              thumbnailUrl = `${config.apiUrl}/${cleanedUrl}`;
            }


            try {
              new URL(thumbnailUrl);
            } catch {
              console.warn(`Invalid URL for product ${product.pid}: ${thumbnailUrl}`);
              thumbnailUrl = defaultImage;
            }
          }

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
      setImageLoadErrors(new Set()); 

    } catch (error) {
      console.error('Products Fetch Error:', error);

      if (error.response) {
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
        setError(error.code === 'ECONNABORTED'
          ? 'Request timed out. Please check your network connection.'
          : 'No response from server. Please check your network connection.');
      } else {
        setError(`Request error: ${error.message}`);
      }

      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {products.map((product) => (
                  <div
                    key={product.pid}
                    className="bg-gray-100 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
                  >
                    <div className="p-4">
                      <div className="mb-4 overflow-hidden relative h-48 bg-white rounded-lg flex items-center justify-center">
                        {imageLoadErrors.has(product.pid) ? (
                          <div className="text-center p-4">
                            <p className="text-gray-500">Image not available</p>
                          </div>
                        ) : (
                          <img
                            src={product.product_thumbnail}
                            alt={product.product_name}
                            className="w-full h-full object-contain"
                            onError={() => handleImageError(product.pid)}
                            loading="lazy"
                          />
                        )}
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