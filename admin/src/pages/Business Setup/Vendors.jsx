import React, { useState, useEffect } from 'react';
import config from '../../config';

const Vendors = () => {
    const [formData, setFormData] = useState({
        commission: '15',
        enablePOS: true,
        vendorRegistration: true,
        minimumOrder: false,
        vendorCanReply: false,
        forgotPasswordMethod: 'phone',
        needProductApproval: {
            newProduct: true,
            productWiseShipping: true
        }
    });
    const [settingId, setSettingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Fetch existing settings on component mount
    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${config.apiUrl}/vendor_settings`);
            
            if (response.ok) {
                const data = await response.json();
                if (data.settings && data.settings.length > 0) {
                    // Get the first/latest setting
                    const latestSetting = data.settings[0];
                    setSettingId(latestSetting.id);
                    setFormData({
                        commission: latestSetting.commission.toString(),
                        enablePOS: latestSetting.enable_pos,
                        vendorRegistration: latestSetting.vendor_registration,
                        minimumOrder: latestSetting.minimum_order,
                        vendorCanReply: latestSetting.vendor_can_reply,
                        forgotPasswordMethod: latestSetting.forgot_password_method,
                        needProductApproval: {
                            newProduct: latestSetting.need_approval_new_product,
                            productWiseShipping: latestSetting.need_approval_product_shipping
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleToggle = (name) => {
        setFormData(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const handleRadioChange = (value) => {
        setFormData(prev => ({
            ...prev,
            forgotPasswordMethod: value
        }));
    };

    const handleCheckboxChange = (name) => {
        setFormData(prev => ({
            ...prev,
            needProductApproval: {
                ...prev.needProductApproval,
                [name]: !prev.needProductApproval[name]
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        
        try {
            const url = settingId 
                ? `${config.apiUrl}/update_vendor_settings/${settingId}`
                : `${config.apiUrl}/vendor_settings`;
                
            const method = settingId ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setMessage(data.message);
                if (!settingId && data.id) {
                    setSettingId(data.id);
                }
            } else {
                setMessage(`Error: ${data.message || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage('Failed to save settings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const InfoIcon = () => (
        <span className="text-gray-400 cursor-help">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z" />
            </svg>
        </span>
    );

    const ToggleSwitch = ({ isOn, onToggle }) => (
        <button
            type="button"
            onClick={onToggle}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${isOn ? 'bg-blue-600' : 'bg-gray-300'}`}
        >
            <div
                className={`w-4 h-4 rounded-full bg-white transform transition-transform ${isOn ? 'translate-x-6' : 'translate-x-0'}`}
            />
        </button>
    );

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <span className="text-gray-600">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                        <path d="M20 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V6H20V18Z" />
                    </svg>
                </span>
                <h2 className="text-lg font-medium">Vendor Setup</h2>
            </div>

            {/* Messages */}
            {message && (
                <div className={`p-3 rounded-md ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}

            {/* Main Form Content */}
            <div className="space-y-6">
                {/* Commission and Toggles Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Commission Input */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <label htmlFor="commission" className="text-sm text-gray-700">
                                Default Commission
                            </label>
                            <InfoIcon />
                        </div>
                        <input
                            id="commission"
                            name="commission"
                            type="text"
                            value={formData.commission}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Enable POS Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span>Enable POS in Vendor Panel</span>
                            <InfoIcon />
                        </div>
                        <ToggleSwitch
                            isOn={formData.enablePOS}
                            onToggle={() => handleToggle('enablePOS')}
                        />
                    </div>

                    {/* Vendor Registration Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span>Vendor registration</span>
                            <InfoIcon />
                        </div>
                        <ToggleSwitch
                            isOn={formData.vendorRegistration}
                            onToggle={() => handleToggle('vendorRegistration')}
                        />
                    </div>
                </div>

                {/* Additional Settings Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Minimum Order Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span>Set minimum order amount</span>
                            <InfoIcon />
                        </div>
                        <ToggleSwitch
                            isOn={formData.minimumOrder}
                            onToggle={() => handleToggle('minimumOrder')}
                        />
                    </div>

                    {/* Vendor Reply Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span>Vendor Can Reply on Review</span>
                            <InfoIcon />
                        </div>
                        <ToggleSwitch
                            isOn={formData.vendorCanReply}
                            onToggle={() => handleToggle('vendorCanReply')}
                        />
                    </div>

                    {/* Password Reset Options */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span>Forgot Password Verification By</span>
                            <InfoIcon />
                        </div>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="forgotPasswordMethod"
                                    checked={formData.forgotPasswordMethod === 'email'}
                                    onChange={() => handleRadioChange('email')}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span>Email</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="forgotPasswordMethod"
                                    checked={formData.forgotPasswordMethod === 'phone'}
                                    onChange={() => handleRadioChange('phone')}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span>Phone (OTP)</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Product Approval Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <span>Need Product Approval</span>
                        <InfoIcon />
                    </div>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.needProductApproval.newProduct}
                                onChange={() => handleCheckboxChange('newProduct')}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span>New Product</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.needProductApproval.productWiseShipping}
                                onChange={() => handleCheckboxChange('productWiseShipping')}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <span>Product Wise Shipping Cost</span>
                            <span className="text-xs text-blue-500">
                                ( This Feature Will Activate Whenever A Vendor Add A Product Or Modifies The Shipping Cost Of Any Product )
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
};

export default Vendors;