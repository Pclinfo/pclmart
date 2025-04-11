import React, { useState, useEffect, useCallback } from 'react';
import config from '../pages/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const ProductCard = ({ product, onImageLoad }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
    onImageLoad(product.pid);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = '/default-product-image.png';
    setImageLoaded(true);
  };

  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex-shrink-0 w-64 mx-2  cursor-pointer"
    >
      <div className="relative h-40 overflow-hidden">
        {!imageLoaded && (
          <div className="w-full h-40 bg-gray-200 animate-pulse rounded-t-lg" />
        )}
        {inView && (
          <img
            src={product.product_thumbnail}
            alt={product.product_name}
            className={`w-full h-40 object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            width={240}
            height={160}
          />
        )}
        {product.is_featured && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.product_name}
        </h3>
        <p className="text-gray-600 mb-2 text-sm">{product.product_type}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">₹{product.unit_price}</span>
          <button
            onClick={() => navigate(`/product/${product.pid}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};


const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [scrollPosition, setScrollPosition] = useState(0);

  const formatPrice = useCallback((price) => {
    if (typeof price === 'string') {
      price = parseFloat(price.replace(/[^\d.-]/g, ''));
    }
    return typeof price === 'number' && !isNaN(price) ? price.toFixed(2) : '0.00';
  }, []);

  const getProcessedThumbnailUrl = useCallback((thumbnailPath) => {
    if (!thumbnailPath) {
      return '/default-product-image.png';
    }
    if (thumbnailPath.startsWith('http')) {
      return thumbnailPath;
    }
    return `${config.apiUrl.replace(/\/+$/, '')}/${thumbnailPath.replace(/^\/+/, '')}`;
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${config.apiUrl}/active_products`);

      if (!response.data || !Array.isArray(response.data.products)) {
        throw new Error('Invalid response format');
      }

      const activeProducts = response.data.products
        .filter((product) => product.active_status === true)
        .map((product) => ({
          ...product,
          product_thumbnail: getProcessedThumbnailUrl(product.product_thumbnail),
          unit_price: formatPrice(product.unit_price),
        }));

      setProducts(activeProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
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

  const scroll = (direction) => {
    const container = document.getElementById('product-container');
    const scrollAmount = 280; // Width of card + margin
    if (container) {
      const newPosition = direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);

      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-16">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Latest Products</h2>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products available at the moment.</p>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            id="product-container"
            className="flex overflow-x-hidden scroll-smooth gap-4 relative"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.pid}
                product={product}
                onImageLoad={handleImageLoad}
              />
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LatestProducts;