import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const Invoice = () => {
    const [businessIdentity, setBusinessIdentity] = useState('taxId');
    const [termsText, setTermsText] = useState('');
    const [businessIdText, setBusinessIdText] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasExistingSettings, setHasExistingSettings] = useState(false);

    useEffect(() => {
        // Fetch existing invoice settings when component mounts
        fetchInvoiceSettings();
    }, []);

    const fetchInvoiceSettings = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${config.apiUrl}/invoice_settings`);
            const data = response.data;
            
            if (data.message && data.message === "No invoice settings found.") {
                // No settings found, we'll create new ones with POST
                setHasExistingSettings(false);
                return;
            }
            
            // Settings found, we'll update with PUT
            setHasExistingSettings(true);
            setTermsText(data.terms || '');
            setBusinessIdentity(data.business_identity_type || 'taxId');
            setBusinessIdText(data.business_identity_value || '');
            setIsActive(data.is_active || false);
            
            if (data.logo_url) {
                // For preview, use absolute URL
                setLogoPreview(`${config.apiUrl}${data.logo_url}`);
            }
        } catch (error) {
            console.error('Error fetching invoice settings:', error);
            if (error.response && error.response.status === 404) {
                // No settings found (404 response), we'll create new ones
                setHasExistingSettings(false);
            } else {
                setError('Failed to load invoice settings');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleLogoChange(e.dataTransfer.files[0]);
        }
    };

    const handleLogoChange = (file) => {
        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setError('Image size should not exceed 2MB');
            return;
        }
        
        setLogo(file);
        setError('');
        
        // Create a preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setLogoPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleBrowseFile = () => {
        document.getElementById('logo-upload').click();
    };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleLogoChange(e.target.files[0]);
        }
    };

    const handleToggleChange = () => {
        setIsActive(!isActive);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError('');
            
            const formData = new FormData();
            formData.append('terms', termsText);
            formData.append('businessIdentityType', businessIdentity);
            formData.append('businessIdentityValue', businessIdText);
            formData.append('isActive', isActive.toString());
            
            if (logo) {
                formData.append('logo', logo);
            }
            
            // Determine if we should use POST or PUT based on if we have existing settings
            const method = hasExistingSettings ? 'PUT' : 'POST';
            
            const response = await axios({
                method,
                url: `${config.apiUrl}/invoice_settings`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data.message) {
                alert('Invoice settings saved successfully');
                // After successful save, make sure we use PUT for future updates
                setHasExistingSettings(true);
                fetchInvoiceSettings(); // Refresh data
            }
        } catch (error) {
            console.error('Error saving invoice settings:', error);
            setError('Failed to save invoice settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm max-w-7xl mx-auto">
            {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <img
                        src="/api/placeholder/24/24"
                        alt="Invoice settings icon"
                        className="w-6 h-6"
                    />
                    <h2 className="text-lg font-medium">Invoice Settings</h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                        {isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button 
                        type="button"
                        onClick={handleToggleChange}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                        <span 
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${isActive ? 'translate-x-6' : 'translate-x-1'}`} 
                        />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Terms & Condition
                        </label>
                        <textarea
                            value={termsText}
                            onChange={(e) => setTermsText(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                            placeholder="Terms & Condition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Business Identity
                        </label>
                        <div className="flex gap-4 mb-3">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="businessIdentity"
                                    value="taxId"
                                    checked={businessIdentity === 'taxId'}
                                    onChange={(e) => setBusinessIdentity(e.target.value)}
                                    className="mr-2"
                                />
                                Tax Id
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="businessIdentity"
                                    value="binNumber"
                                    checked={businessIdentity === 'binNumber'}
                                    onChange={(e) => setBusinessIdentity(e.target.value)}
                                    className="mr-2"
                                />
                                Bin Number
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="businessIdentity"
                                    value="musak"
                                    checked={businessIdentity === 'musak'}
                                    onChange={(e) => setBusinessIdentity(e.target.value)}
                                    className="mr-2"
                                />
                                Musak
                            </label>
                        </div>
                        <input
                            type="text"
                            value={businessIdText}
                            onChange={(e) => setBusinessIdText(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Invoice Logo <span className="text-gray-500">(1000 X 308 Px)</span>
                    </label>
                    <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center"
                    >
                        {logoPreview ? (
                            <div className="text-center">
                                <img 
                                    src={logoPreview} 
                                    alt="Logo preview" 
                                    className="w-auto h-auto" 
                                />
                                <button 
                                    type="button"
                                    onClick={() => { setLogo(null); setLogoPreview(''); }}
                                    className="text-red-600 hover:text-red-700 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    Drag and drop file or{' '}
                                    <button 
                                        type="button"
                                        onClick={handleBrowseFile}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Browse file
                                    </button>
                                </p>
                                <input
                                    id="logo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileInputChange}
                                    className="hidden"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default Invoice;