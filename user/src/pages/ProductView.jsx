import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Shield, CreditCard, RefreshCcw, Truck } from 'lucide-react';
import axios from 'axios';
import config from '../pages/config';
import Navbar from '../components/Navbar';

const ProductView = () => {
    const { pid } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${config.apiUrl}/user_active_product/${pid}`);
                setProduct(response.data);
                setOutOfStock(response.data.stock < 1);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to load product details');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        if (pid) {
            fetchProduct();
        }
    }, [pid]);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleQuantityChange = (value) => {
        const newQuantity = Math.max(1, Math.min(10, quantity + value));
        setQuantity(newQuantity);
    };

    const calculateTotalPrice = () => {
        return (parseFloat(product?.unit_price || 0) * quantity).toFixed(2);
    };

    const getFullImageUrl = (url) => {
        if (!url) return '';
        return url.startsWith('http') ? url : `${config.apiUrl}/${url}`;
    };

    const handleBuyNow = async () => {
        if (isProcessing) return;

        setIsProcessing(true);
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/login', {
                    state: {
                        returnUrl: `/product/${pid}`,
                        message: 'Please login to continue purchase'
                    }
                });
                return;
            }

            // Verify stock availability
            if (product.stock < quantity) {
                alert('Sorry, requested quantity is not available');
                return;
            }

            // Prepare checkout data
            const checkoutData = {
                product_id: pid,
                product_name: product.product_name,
                quantity: quantity,
                unit_price: product.unit_price,
                total_price: calculateTotalPrice(),
                product_thumbnail: product.product_thumbnail,
                product_color: product.product_color,
                product_description: product.product_description
            };

            // Navigate to checkout with product data
            navigate('/checkout', {
                state: {
                    items: [checkoutData],
                    fromBuyNow: true
                }
            });

        } catch (error) {
            console.error('Error processing buy now:', error);
            alert('There was an error processing your request. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600">{error || 'Product not found'}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side - Product Image */}
                    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
                        <div className="max-w-xs w-full">
                            {imageError ? (
                                <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">Image not available</span>
                                </div>
                            ) : (
                                <div className="relative pt-[75%]">
                                    <img
                                        src={getFullImageUrl(product.product_thumbnail)}
                                        alt={product.product_name}
                                        className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
                                        onError={handleImageError}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Product Details */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-4">{product.product_name}</h1>

                        {/* Review Stars */}
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    className={`w-5 h-5 ${index < product.review_star
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                        }`}
                                />
                            ))}
                            <span className="ml-2 text-gray-600">
                                ({product.review_star} / 5)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="text-2xl font-bold text-blue-600 mb-4">
                            ${product.unit_price}
                        </div>

                        {/* Color Selection */}
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Color:</h3>
                            <div className="flex gap-2">
                                {product.product_color?.split(',').map((color, index) => (
                                    <div
                                        key={index}
                                        className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                                        style={{ backgroundColor: color.trim() }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">Quantity:</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="px-3 py-1 border rounded-md hover:bg-gray-100"
                                    disabled={isProcessing || outOfStock}
                                >
                                    -
                                </button>
                                <span className="text-lg">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="px-3 py-1 border rounded-md hover:bg-gray-100"
                                    disabled={isProcessing || outOfStock}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Total Price */}
                        <div className="text-xl font-bold mb-6">
                            Total: ${calculateTotalPrice()}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <button
                                onClick={handleBuyNow}
                                disabled={isProcessing || outOfStock}
                                className={`flex-1 py-2 px-4 rounded-md transition-colors ${isProcessing || outOfStock
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                {isProcessing ? 'Processing...' : outOfStock ? 'Out of Stock' : 'Buy Now'}
                            </button>
                            <button
                                className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                disabled={isProcessing || outOfStock}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button
                                className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                disabled={isProcessing}
                            >
                                <Heart className="w-6 h-6 text-red-500" />
                            </button>
                        </div>

                        {/* Product Features */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-blue-600" />
                                <span>100% Authentic Products</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-blue-600" />
                                <span>Safe & Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <RefreshCcw className="w-5 h-5 text-blue-600" />
                                <span>7 Days Return Policy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Truck className="w-5 h-5 text-blue-600" />
                                <span>Fast Nationwide Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Product Description</h2>
                    <div className="prose max-w-none">
                        {product.product_description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductView;