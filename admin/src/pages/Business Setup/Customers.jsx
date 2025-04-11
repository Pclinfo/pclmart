import React, { useState, useEffect } from 'react';
import config from '../../config';

const Customers = () => {
    const [settings, setSettings] = useState({
        id: null,
        customerWallet: true,
        loyaltyPoint: true,
        referralEarning: true,
        addRefundToWallet: true,
        addFundToWallet: true,
        maxAddFundAmount: '1000',
        minAddFundAmount: '100',
        equivalentPoint: '10',
        loyaltyPointEarnPercentage: '5',
        minPointToConvert: '200',
        referralEarnings: '0'
    });
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState('');

    // Fetch customer settings on component mount
    useEffect(() => {
        fetchCustomerSettings();
    }, []);

    const fetchCustomerSettings = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${config.apiUrl}/customer_settings`);
            if (response.ok) {
                const data = await response.json();
                setSettings({
                    id: data.id,
                    customerWallet: data.customer_wallet,
                    loyaltyPoint: data.loyalty_point,
                    referralEarning: data.referral_earning,
                    addRefundToWallet: data.add_refund_to_wallet,
                    addFundToWallet: data.add_fund_to_wallet,
                    maxAddFundAmount: data.max_add_fund_amount,
                    minAddFundAmount: data.min_add_fund_amount,
                    equivalentPoint: data.equivalent_point,
                    loyaltyPointEarnPercentage: data.loyalty_point_earn_percentage,
                    minPointToConvert: data.min_point_to_convert,
                    referralEarnings: data.referral_earnings
                });
            } else {
                console.log('No settings found or error fetching settings');
            }
        } catch (error) {
            console.error('Error fetching customer settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const saveSettings = async () => {
        try {
            setSaveStatus('Saving...');
            const response = await fetch(`${config.apiUrl}/update_customer_settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings),
            });
            
            const data = await response.json();
            if (response.ok) {
                setSaveStatus('Settings saved successfully!');
                setTimeout(() => setSaveStatus(''), 3000);
                // Refetch to ensure we have the latest data
                fetchCustomerSettings();
            } else {
                setSaveStatus(`Error: ${data.error || 'Unknown error'}`);
                setTimeout(() => setSaveStatus(''), 3000);
            }
        } catch (error) {
            console.error('Error saving customer settings:', error);
            setSaveStatus('Failed to save settings. Please try again.');
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    const InfoIcon = () => (
        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
    );

    const ToggleSwitch = ({ isOn, onToggle }) => (
        <button
            type="button"
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isOn ? 'bg-blue-600' : 'bg-gray-200'
                }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'
                    }`}
            />
        </button>
    );

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading customer settings...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">
            {/* Top Row Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                        <span>Customer Wallet</span>
                        <InfoIcon />
                    </div>
                    <ToggleSwitch
                        isOn={settings.customerWallet}
                        onToggle={() => handleToggle('customerWallet')}
                    />
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                        <span>Customer Loyalty Point</span>
                        <InfoIcon />
                    </div>
                    <ToggleSwitch
                        isOn={settings.loyaltyPoint}
                        onToggle={() => handleToggle('loyaltyPoint')}
                    />
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2">
                        <span>Customer referral earning</span>
                        <InfoIcon />
                    </div>
                    <ToggleSwitch
                        isOn={settings.referralEarning}
                        onToggle={() => handleToggle('referralEarning')}
                    />
                </div>
            </div>

            {/* Wallet Settings Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>
                    <h2 className="text-lg font-medium">Customer Wallet Settings</h2>
                    <InfoIcon />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                            <span>Add Refund Amount to Wallet</span>
                            <InfoIcon />
                        </div>
                        <ToggleSwitch
                            isOn={settings.addRefundToWallet}
                            onToggle={() => handleToggle('addRefundToWallet')}
                        />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                            <span>Add Fund to Wallet</span>
                            <InfoIcon />
                        </div>
                        <ToggleSwitch
                            isOn={settings.addFundToWallet}
                            onToggle={() => handleToggle('addFundToWallet')}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Maximum Add Fund Amount (USD)
                        </label>
                        <input
                            type="text"
                            name="maxAddFundAmount"
                            value={settings.maxAddFundAmount}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Minimum Add Fund Amount (USD)
                        </label>
                        <input
                            type="text"
                            name="minAddFundAmount"
                            value={settings.minAddFundAmount}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Loyalty Points Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
                    </svg>
                    <h2 className="text-lg font-medium">Customer Loyalty Point Settings</h2>
                    <InfoIcon />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Equivalent Point To 1 Unit Currency
                        </label>
                        <input
                            type="text"
                            name="equivalentPoint"
                            value={settings.equivalentPoint}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Loyalty Point Earn On Each Order(%)
                        </label>
                        <input
                            type="text"
                            name="loyaltyPointEarnPercentage"
                            value={settings.loyaltyPointEarnPercentage}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Minimum Point Required To Convert
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                name="minPointToConvert"
                                value={settings.minPointToConvert}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <InfoIcon />
                        </div>
                    </div>
                </div>
            </div>

            {/* Referral Settings Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                    <h2 className="text-lg font-medium">Customer Referrer Settings</h2>
                    <InfoIcon />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Earnings To Each Referral (USD)
                        </label>
                        <InfoIcon />
                    </div>
                    <input
                        type="text"
                        name="referralEarnings"
                        value={settings.referralEarnings}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Save Button and Status */}
            <div className="flex justify-end items-center gap-4">
                {saveStatus && (
                    <span className={`text-sm ${saveStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {saveStatus}
                    </span>
                )}
                <button
                    type="button"
                    onClick={saveSettings}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default Customers;