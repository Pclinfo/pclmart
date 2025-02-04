import React, { useState, useEffect } from 'react';
import { MapPin, Home, Briefcase, Truck, Receipt, Navigation, Edit, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import config from '../pages/config';

const MyAddress = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        pinCode: '',
        locality: '',
        address: '',
        state: '',
        landmark: '',
        alternatePhone: '',
        addressType: 'home',
        latitude: '',
        longitude: ''
    });

    const [activeAddressType, setActiveAddressType] = useState('home');
    const [activeAddressPurpose, setActiveAddressPurpose] = useState('shipping');
    const [isLoading, setIsLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [editingAddressId, setEditingAddressId] = useState(null);

    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to continue');
                return;
            }

            const response = await fetch(`${config.apiUrl}/user-address`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSavedAddresses(data.address);
            } else {
                if (response.status === 401) {
                    alert('Session expired. Please login again');
                } else {
                    alert('Failed to fetch addresses');
                }
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            alert('Error loading addresses');
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getAddressFromCoords = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
                {
                    headers: {
                        'Accept-Language': 'en-US,en;q=0.9',
                        'User-Agent': 'MyAddressApp/1.0'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch address details');
            }

            const data = await response.json();
            const address = data.address;

            setFormData(prev => ({
                ...prev,
                address: `${address.road || ''} ${address.house_number || ''}`.trim(),
                locality: address.suburb || address.neighbourhood || address.city_district || '',
                state: address.state || '',
                pinCode: address.postcode || '',
                latitude,
                longitude
            }));
        } catch (error) {
            console.error('Error fetching address:', error);
            alert('Error fetching location details. Please enter address manually.');
        }
    };

    const getCurrentLocation = () => {
        setIsLoading(true);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    await getAddressFromCoords(latitude, longitude);
                    setIsLoading(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Error getting your location. Please ensure location services are enabled.');
                    setIsLoading(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
            setIsLoading(false);
        }
    };

    const handleEditAddress = (address) => {
        setEditingAddressId(address.id);

        // Get user ID from localStorage
        const userStoredData = JSON.parse(localStorage.getItem('user'));
        const userId = userStoredData.user;

        // Map the address fields to match backend expectations
        setFormData({
            userid: userId, // Add userid as expected by backend
            name: address.name,
            phoneNumber: address.phone_number,
            pinCode: address.pincode,
            locality: address.locality,
            address: address.address,
            state: address.state,
            landmark: address.landmark || '',
            alternatePhone: address.alternate_phone || '',
            addressType: address.address_type,
            addressPurpose: address.addresspurpose,
            latitude: address.latitude || '',
            longitude: address.longitude || ''
        });

        // Set the active address type and purpose
        setActiveAddressType(address.address_type);
        setActiveAddressPurpose(address.addresspurpose);
        setShowAddForm(true);
    };

    const handleDeleteAddress = async (addressId) => {
        if (!window.confirm('Are you sure you want to delete this address?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to continue');
                return;
            }

            const response = await fetch(`${config.apiUrl}/delete-address/${addressId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Address deleted successfully!');
                setSavedAddresses(savedAddresses.filter(addr => addr.id !== addressId));
            } else {
                if (response.status === 401) {
                    alert('Session expired. Please login again');
                } else {
                    alert('Failed to delete address');
                }
            }
        } catch (error) {
            console.error('Error deleting address:', error);
            alert('Error deleting address');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userStoredData = JSON.parse(localStorage.getItem('user'));
            const userId = userStoredData.user;
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Please log in to continue');
                return;
            }

            // Prepare the data object to match backend expectations
            const submitData = {
                userid: userId,
                name: formData.name,
                phone_number: formData.phoneNumber,
                pincode: formData.pinCode,
                locality: formData.locality,
                address: formData.address,
                state: formData.state,
                landmark: formData.landmark,
                alternate_phone: formData.alternatePhone,
                address_type: activeAddressType,
                addresspurpose: activeAddressPurpose,
                latitude: formData.latitude,
                longitude: formData.longitude
            };

            const endpoint = editingAddressId
                ? `${config.apiUrl}/edit-address/${editingAddressId}`
                : `${config.apiUrl}/add-address`;

            const response = await fetch(endpoint, {
                method: editingAddressId ? 'POST' : 'POST', // Changed to POST as per backend route
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                alert(editingAddressId ? 'Address updated successfully!' : 'Address added successfully!');
                setFormData({
                    name: '',
                    phoneNumber: '',
                    pinCode: '',
                    locality: '',
                    address: '',
                    state: '',
                    landmark: '',
                    alternatePhone: '',
                    addressType: 'home',
                    latitude: '',
                    longitude: ''
                });
                setShowAddForm(false);
                setEditingAddressId(null);
                fetchAddresses();
            } else {
                if (response.status === 401) {
                    alert('Session expired. Please login again');
                } else {
                    const data = await response.json();
                    alert(data.message || 'Failed to save address');
                }
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Error saving address');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
                <Sidebar />

                <div className="flex-1 p-4">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold">My Addresses</h1>
                            {!showAddForm && (
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Add New Address
                                </button>
                            )}
                        </div>

                        {/* Saved Addresses Section */}
                        {!showAddForm && (
                            <div className="space-y-4">
                                {savedAddresses.map((addr) => (
                                    <div key={addr.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-2">
                                                {addr.address_type === 'home' ? (
                                                    <Home className="text-blue-600" size={20} />
                                                ) : (
                                                    <Briefcase className="text-blue-600" size={20} />
                                                )}
                                                <span className="font-medium capitalize">{addr.address_type}</span>
                                                <span className="text-sm text-gray-500 capitalize">({addr.addresspurpose})</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditAddress(addr)}
                                                    className="p-1 hover:text-blue-600"
                                                    aria-label="Edit address"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteAddress(addr.id)}
                                                    className="p-1 hover:text-red-600"
                                                    aria-label="Delete address"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <p className="font-medium">{addr.name}</p>
                                            <p className="text-gray-600">{addr.address}</p>
                                            <p className="text-gray-600">{addr.locality}, {addr.state} - {addr.pincode}</p>
                                            {addr.landmark && (
                                                <p className="text-gray-600">Landmark: {addr.landmark}</p>
                                            )}
                                            <p className="text-gray-600 mt-1">
                                                Phone: {addr.phone_number}
                                                {addr.alternate_phone && `, ${addr.alternate_phone}`}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {savedAddresses.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        No saved addresses found. Add a new address to get started.
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Add/Edit Address Form */}
                        {showAddForm && (
                            <>
                                {/* Address Type Buttons */}
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setActiveAddressType('home')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeAddressType === 'home'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        <Home size={20} />
                                        Home
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveAddressType('office')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeAddressType === 'office'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        <Briefcase size={20} />
                                        Office
                                    </button>
                                </div>

                                {/* Address Purpose Buttons */}
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setActiveAddressPurpose('shipping')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeAddressPurpose === 'shipping'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        <Truck size={20} />
                                        Shipping
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveAddressPurpose('billing')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeAddressPurpose === 'billing'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        <Receipt size={20} />
                                        Billing
                                    </button>
                                </div>

                                {/* Current Location Button */}
                                <button
                                    type="button"
                                    onClick={getCurrentLocation}
                                    disabled={isLoading}
                                    className={`flex items-center gap-2 px-4 py-2 ${isLoading ? 'bg-green-400' : 'bg-green-600'
                                        } text-white rounded-lg mb-6 hover:bg-green-700 disabled:cursor-not-allowed`}
                                >
                                    <Navigation size={20} />
                                    {isLoading ? 'Getting location...' : 'Use my current location'}
                                </button>


                                {/* Address Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter your full name"
                                            />
                                        </div>


                                        {/* Phone Number */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                required
                                                pattern="[0-9]{10}"
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="10-digit mobile number"
                                            />
                                        </div>

                                        {/* Pin Code */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Pin Code *
                                            </label>
                                            <input
                                                type="text"
                                                name="pinCode"
                                                value={formData.pinCode}
                                                onChange={handleInputChange}
                                                required
                                                pattern="[0-9]{6}"
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="6-digit pin code"
                                            />
                                        </div>

                                        {/* Locality */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Locality *
                                            </label>
                                            <input
                                                type="text"
                                                name="locality"
                                                value={formData.locality}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Colony, Area, or Street name"
                                            />
                                        </div>

                                        {/* Address */}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Address (Area & Street) *
                                            </label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                rows="3"
                                                placeholder="House/Flat/Block No., Apartment, Building, Company"
                                            />
                                        </div>

                                        {/* State */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter your state"
                                            />
                                        </div>

                                        {/* Landmark */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Landmark (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                name="landmark"
                                                value={formData.landmark}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Nearby landmark"
                                            />
                                        </div>

                                        {/* Alternate Phone */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Alternate Phone (Optional)
                                            </label>
                                            <input
                                                type="tel"
                                                name="alternatePhone"
                                                value={formData.alternatePhone}
                                                onChange={handleInputChange}
                                                pattern="[0-9]{10}"
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="10-digit mobile number"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 justify-end mt-6">
                                        <button
                                            type="button"
                                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                            onClick={() => {
                                                setShowAddForm(false);
                                                setEditingAddressId(null);
                                                setFormData({
                                                    name: '',
                                                    phoneNumber: '',
                                                    pinCode: '',
                                                    locality: '',
                                                    address: '',
                                                    state: '',
                                                    landmark: '',
                                                    alternatePhone: '',
                                                    addressType: 'home',
                                                    latitude: '',
                                                    longitude: ''
                                                });
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            {editingAddressId ? 'Update Address' : 'Save Address'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAddress;