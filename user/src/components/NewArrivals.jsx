import React, { useState, useEffect, useCallback } from 'react';
import config from '../pages/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const ProductCard = ({ product, onImageLoad }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });
  const navigate = useNavigate();

  const handleImageLoad = () => {
    setImageLoaded(true);
    onImageLoad(product.pid);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/default-product-image.png';
    setImageLoaded(true);
  };

  return (
    <div 
      ref={ref}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4"
      onClick={() => navigate(`/product/${product.pid}`)}
    >
      <div className="relative aspect-square mb-4">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
        )}
        {inView && (
          <img
            src={product.product_thumbnail}
            alt={product.product_name}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-sm px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.product_name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {product.original_price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.original_price}
              </span>
            )}
            <div className="text-lg font-semibold text-gray-900">
              ${product.unit_price}
            </div>
          </div>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.pid}`);
            }}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const formatPrice = useCallback((price) => {
    if (typeof price === 'string') {
      price = parseFloat(price.replace(/[^\d.-]/g, ''));
    }
    return typeof price === 'number' && !isNaN(price) ? price.toFixed(2) : '0.00';
  }, []);

  const getProcessedThumbnailUrl = useCallback((thumbnailPath) => {
    if (!thumbnailPath) return '/default-product-image.png';
    if (thumbnailPath.startsWith('http')) return thumbnailPath;
    return `${config.apiUrl.replace(/\/+$/, '')}/${thumbnailPath.replace(/^\/+/, '')}`;
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${config.apiUrl}/new_arrivals`);

      if (!response.data || !Array.isArray(response.data.new_arrivals)) {
        throw new Error('Invalid response format');
      }

      const processedProducts = response.data.new_arrivals.map(product => ({
        ...product,
        product_thumbnail: getProcessedThumbnailUrl(product.product_thumbnail),
        unit_price: formatPrice(product.unit_price),
        original_price: product.original_price ? formatPrice(product.original_price) : null,
      }));

      setProducts(processedProducts);
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      setError('Failed to load new arrivals. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [formatPrice, getProcessedThumbnailUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleImageLoad = (productId) => {
    setLoadedImages(prev => new Set([...prev, productId]));
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading New Arrivals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
        <a href="/products" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </a>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No new arrivals available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.pid}
              product={product}
              onImageLoad={handleImageLoad}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;