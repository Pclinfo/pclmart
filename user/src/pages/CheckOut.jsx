import React, { useState, useEffect, useContext } from 'react';
import { ChevronDown, ChevronUp, Home, Briefcase, CreditCard, Wallet, Package, Trash2 } from 'lucide-react';
import { BsBank } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import Navbar from '../components/Navbar';
import config from '../pages/config';

const CheckoutAccordion = ({ title, isOpen, onClick, children, isCompleted }) => (
    <div className="mb-4 border rounded-lg">
        <button
            className={`w-full p-4 flex items-center justify-between ${isCompleted ? 'bg-green-50' : 'bg-gray-50'} rounded-t-lg`}
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{title}</h2>
                {isCompleted && (
                    <span className="text-green-600 text-sm">(Completed)</span>
                )}
            </div>
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {isOpen && (
            <div className="p-4 border-t">
                {children}
            </div>
        )}
    </div>
);

const CheckOut = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AuthContext);


    const [activeStep, setActiveStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState(new Set());
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [addresses, setAddresses] = useState([]);
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');


    const checkoutItems = location.state?.items || [];
    const fromBuyNow = location.state?.fromBuyNow || false;


    const orderSummary = {
        items: checkoutItems,
        delivery: 0,
        platformFee: 3,
        total: checkoutItems.reduce((acc, item) =>
            acc + (parseFloat(item.unit_price) * item.quantity), 0) + 3
    };

    const fetchUserAddresses = async () => {
  
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No authentication token found');
            return;
        }

        setIsLoadingAddresses(true);
        try {
            const response = await fetch(`${config.apiUrl}/user-address`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();


            const addressList = data.address || [];

            const shippingAddresses = addressList.filter(addr => addr.addresspurpose === 'shipping');
            const otherAddresses = addressList.filter(addr => addr.addresspurpose !== 'shipping');
            const sortedAddresses = [...shippingAddresses, ...otherAddresses];

            setAddresses(sortedAddresses);

            const defaultAddress = shippingAddresses.length > 0 ? shippingAddresses[0] : sortedAddresses[0];
            if (defaultAddress) {
                setSelectedAddress(defaultAddress.id);
                completeStep(1); 
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            if (error.response?.status === 401) {
                alert('Session expired. Please login again');
            } else {
                alert('Failed to fetch addresses');
            }
        } finally {
            setIsLoadingAddresses(false);
        }
    };


    useEffect(() => {
        if (isAuthenticated) {
            fetchUserAddresses();
        }
    }, [isAuthenticated]);



    const completeStep = (step) => {
        setCompletedSteps(prev => new Set([...prev, step]));
        setActiveStep(step + 1);
    };


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setLoginError('');

        try {
            const response = await axios.post(`${config.apiUrl}/user_login`, loginData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.data && response.data.token) {
                completeStep(1);
                await fetchUserAddresses();
            }
        } catch (error) {
            setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoggingIn(false);
        }
    };


    const handleAddressSelection = (addressId) => {
        setSelectedAddress(addressId);
    };

    const handleAddressConfirmation = () => {
        if (selectedAddress) {
            completeStep(2);
        }
    };

    const handleAddNewAddress = () => {
        navigate('/my-address', { state: { returnTo: '/checkout' } });
    };


    const handleRemoveItem = (itemId) => {
        const updatedItems = checkoutItems.filter(item => item.product_id !== itemId);
        if (updatedItems.length === 0) {
            navigate('/cart');
            return;
        }
        window.history.replaceState(
            { ...location.state, items: updatedItems },
            ''
        );
        window.location.reload();
    };

    const handleOrderSummaryConfirmation = () => {
        completeStep(3);
    };

    const handlePaymentSubmit = async () => {
        if (!selectedPaymentMethod) {
            alert('Please select a payment method');
            return;
        }

        if (!selectedAddress) {
            alert('Please select a delivery address');
            return;
        }

        if (!user || !user.token) {
            alert('Please log in to place an order');
            return;
        }

        try {

            const shippingAddress = addresses.find(addr => addr.id === selectedAddress);
            if (!shippingAddress) {
                alert('Invalid shipping address');
                return;
            }


            const subtotal = checkoutItems.reduce((acc, item) =>
                acc + (parseFloat(item.unit_price) * item.quantity), 0
            );


            const orderPayload = {
                items: checkoutItems.map(item => ({
                    product_id: item.product_id,
                    seller_id: item.seller_id || null,
                    quantity: item.quantity,
                    unit_price: parseFloat(item.unit_price),
                    product_name: item.product_name,
                    product_thumbnail: item.product_thumbnail
                })),
                shipping_address_id: selectedAddress,
                shipping_address: {
                    name: shippingAddress.name,
                    address: shippingAddress.address,
                    locality: shippingAddress.locality,
                    state: shippingAddress.state,
                    pincode: shippingAddress.pincode,
                    phone_number: shippingAddress.phone_number,
                    alternate_phone: shippingAddress.alternate_phone
                },
                payment_method: selectedPaymentMethod,
                subtotal: subtotal,
                platform_fee: orderSummary.platformFee,
                shipping: 0, 
                discount: 0,
                total_amount: orderSummary.total,
                status: 'processing', 
                order_date: new Date().toISOString()
            };

    
            const response = await axios.post(`${config.apiUrl}/insert_order`, orderPayload, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });


            if (response.data && response.data.order_id) {

                completeStep(4);

                navigate('/orders', {
                    state: {
                        success: true,
                        message: 'Order placed successfully!',
                        newOrderId: response.data.order_id,
                        paymentMethod: selectedPaymentMethod
                    }
                });
            } else {
                throw new Error('Order creation failed');
            }
        } catch (error) {
            console.error('Order placement error:', error);

            if (error.response) {
                alert(error.response.data.message || 'Order placement failed. Please try again.');
            } else if (error.request) {
                alert('No response from server. Please check your internet connection.');
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    const getFullImageUrl = (url) => {
        if (!url) return '/api/placeholder/100/100';
        return url.startsWith('http') ? url : `${config.apiUrl}/${url}`;
    };


    const renderLoginContent = () => {
        if (isAuthenticated && user) {
            return (
                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
                        <div>
                            <p className="text-green-700 font-medium">Logged in Successfully</p>
                            <p className="text-gray-700">{user.email}</p>
                        </div>
                        <button
                            onClick={() => setActiveStep(2)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                        <p>{loginError}</p>
                    </div>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                    disabled={isLoggingIn}
                >
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                </button>
            </form>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {/* Login Section */}
                        <CheckoutAccordion
                            title="1. Login"
                            isOpen={activeStep === 1}
                            onClick={() => setActiveStep(1)}
                            isCompleted={completedSteps.has(1)}
                        >
                            {renderLoginContent()}
                        </CheckoutAccordion>

                        {/* Delivery Address Section */}
                        <CheckoutAccordion
                            title="2. Delivery Address"
                            isOpen={activeStep === 2}
                            onClick={() => isAuthenticated && setActiveStep(2)}
                            isCompleted={completedSteps.has(2)}
                        >
                            <div className="space-y-4">
                                {isLoadingAddresses ? (
                                    <div className="text-center py-4">Loading addresses...</div>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-medium">Select Delivery Address</h3>
                                            <button
                                                onClick={handleAddNewAddress}
                                                className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                                            >
                                                + Add New Address
                                            </button>
                                        </div>

                                        {addresses.map(addr => (
                                            <div key={addr.id} className="border rounded p-4">
                                                <div className="flex items-start gap-4">
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        checked={selectedAddress === addr.id}
                                                        onChange={() => handleAddressSelection(addr.id)}
                                                        className="mt-1"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="font-semibold">{addr.name}</span>
                                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                                {addr.address_type}
                                                            </span>
                                                            {addr.addresspurpose === 'shipping' && (
                                                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                                    Shipping Address
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-gray-600 text-sm">
                                                            {addr.address}, {addr.locality}, {addr.state} - {addr.pincode}
                                                        </div>
                                                        <div className="text-gray-600 text-sm">
                                                            Phone: {addr.phone_number}
                                                            {addr.alternate_phone && `, ${addr.alternate_phone}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {addresses.length === 0 && (
                                            <div className="text-center py-8 text-gray-500">
                                                No addresses found. Please add a new address to continue.
                                            </div>
                                        )}

                                        {selectedAddress && (
                                            <button
                                                onClick={handleAddressConfirmation}
                                                className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
                                            >
                                                DELIVER HERE
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </CheckoutAccordion>


                        {/* Order Summary Section */}
                        <CheckoutAccordion
                            title="3. Order Summary"
                            isOpen={activeStep === 3}
                            onClick={() => completedSteps.has(2) && setActiveStep(3)}
                            isCompleted={completedSteps.has(3)}
                        >
                            <div className="space-y-4">
                                {orderSummary.items.map(item => (
                                    <div key={item.product_id} className="flex gap-4 border-b pb-4">
                                        <img
                                            src={getFullImageUrl(item.product_thumbnail)}
                                            alt={item.product_name}
                                            className="w-24 h-24 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium">{item.product_name}</h3>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {item.quantity} {item.quantity > 1 ? 'units' : 'unit'}
                                            </p>
                                            <p className="font-semibold">₹{parseFloat(item.unit_price).toFixed(2)}</p>
                                            {!fromBuyNow && (
                                                <button
                                                    onClick={() => handleRemoveItem(item.product_id)}
                                                    className="text-red-600 text-sm flex items-center gap-1 mt-2"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={handleOrderSummaryConfirmation}
                                    className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 mt-4"
                                >
                                    CONTINUE
                                </button>
                            </div>
                        </CheckoutAccordion>

                        {/* Payment Options Section */}
                        <CheckoutAccordion
                            title="4. Payment Options"
                            isOpen={activeStep === 4}
                            onClick={() => completedSteps.has(3) && setActiveStep(4)}
                            isCompleted={completedSteps.has(4)}
                        >
                            <div className="space-y-4">
                                <div className="border rounded p-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="upi"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                            checked={selectedPaymentMethod === 'upi'}
                                        />
                                        UPI
                                    </label>
                                </div>

                                <div className="border rounded p-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="wallet"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                            checked={selectedPaymentMethod === 'wallet'}
                                        />
                                        <Wallet className="w-4 h-4" /> Wallet
                                    </label>
                                </div>

                                <div className="border rounded p-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                            checked={selectedPaymentMethod === 'card'}
                                        />
                                        <CreditCard className="w-4 h-4" /> Credit / Debit / ATM Card
                                    </label>
                                    {selectedPaymentMethod === 'card' && (
                                        <div className="space-y-4 pl-6 mt-4">
                                            <input
                                                type="text"
                                                placeholder="Card Number"
                                                className="w-full p-2 border rounded"
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Valid Thru (MM/YY)"
                                                    className="w-full p-2 border rounded"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="CVV"
                                                    className="w-full p-2 border rounded"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border rounded p-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="netbanking"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                            checked={selectedPaymentMethod === 'netbanking'}
                                        />
                                        <BsBank className="w-4 h-4" /> Net Banking
                                    </label>
                                </div>

                                <div className="border rounded p-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                            checked={selectedPaymentMethod === 'cod'}
                                        />
                                        <Package className="w-4 h-4" /> Cash on Delivery
                                    </label>
                                </div>

                                <button
                                    onClick={handlePaymentSubmit}
                                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full"
                                    disabled={!selectedPaymentMethod}
                                >
                                    Pay ₹{orderSummary.total.toFixed(2)}
                                </button>
                            </div>
                        </CheckoutAccordion>
                    </div>

                    {/* Price Details Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="border rounded-lg p-4 sticky top-4">
                            <h2 className="text-lg font-semibold mb-4">Price Details</h2>
                            <div className="space-y-2 pb-4 border-b">
                                <div className="flex justify-between">
                                    <span>Price ({orderSummary.items.length} items)</span>
                                    <span>₹{orderSummary.items.reduce((acc, item) =>
                                        acc + (parseFloat(item.unit_price) * item.quantity), 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Platform Fee</span>
                                    <span>₹{orderSummary.platformFee.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between pt-4 font-semibold">
                                <span>Total Payable</span>
                                <span>₹{orderSummary.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;