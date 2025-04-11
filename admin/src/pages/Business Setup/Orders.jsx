import React, { useState, useEffect } from 'react';
import config from '../../config';

const Toggle = ({ isEnabled, onToggle }) => (
  <button 
    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
    onClick={onToggle}
  >
    <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

const InfoIcon = () => (
  <svg className="w-4 h-4 text-gray-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

const Orders = () => {
  const [settings, setSettings] = useState({
    order_delivery_verification: true,
    minimum_order_amount: true,
    show_billing_address: true,
    free_delivery: true,
    guest_checkout: true,
    refund_days: 5,
    delivery_responsibility: 'Admin',
    free_delivery_over: 1000.00
  });

  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState({ message: '', isError: false });

  // Fetch order settings on component mount
  useEffect(() => {
    fetchOrderSettings();
  }, []);

  const fetchOrderSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.apiUrl}/get_order_settings`);
      if (!response.ok) {
        throw new Error(`Error fetching settings: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Update state with fetched settings
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch order settings:", error);
      setSaveStatus({
        message: "Failed to load settings. Please try again.",
        isError: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setSaveStatus({ message: 'Saving...', isError: false });
      
      const response = await fetch(`${config.apiUrl}/save_order_settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error(`Error saving settings: ${response.statusText}`);
      }

      const result = await response.json();
      setSaveStatus({ message: result.message, isError: false });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveStatus({ message: '', isError: false });
      }, 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      setSaveStatus({
        message: "Failed to save settings. Please try again.",
        isError: true
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 flex justify-center items-center h-64">
        <p className="text-gray-700">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <svg className="w-6 h-6 text-gray-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <h1 className="text-xl font-semibold text-gray-800">Order Settings</h1>
      </div>

      {/* Status message */}
      {saveStatus.message && (
        <div className={`mb-4 p-3 rounded-md ${saveStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {saveStatus.message}
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Order Delivery Verification */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-700">Order Delivery Verification</span>
            <InfoIcon />
          </div>
          <Toggle 
            isEnabled={settings.order_delivery_verification}
            onToggle={() => handleToggle('order_delivery_verification')}
          />
        </div>

        {/* Minimum Order Amount */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-700">Minimum order amount</span>
            <InfoIcon />
          </div>
          <Toggle 
            isEnabled={settings.minimum_order_amount}
            onToggle={() => handleToggle('minimum_order_amount')}
          />
        </div>

        {/* Show Billing Address */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-700">Show Billing Address In Checkout</span>
            <InfoIcon />
          </div>
          <Toggle 
            isEnabled={settings.show_billing_address}
            onToggle={() => handleToggle('show_billing_address')}
          />
        </div>

        {/* Free Delivery */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-700">Free Delivery</span>
            <InfoIcon />
          </div>
          <Toggle 
            isEnabled={settings.free_delivery}
            onToggle={() => handleToggle('free_delivery')}
          />
        </div>

        {/* Free Delivery Responsibility */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="text-gray-700">Free Delivery Responsibility</span>
          </div>
          <select 
            value={settings.delivery_responsibility}
            onChange={(e) => handleInputChange('delivery_responsibility', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Admin">Admin</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>

        {/* Free Delivery Over */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="text-gray-700">Free Delivery Over($)</span>
            <InfoIcon />
          </div>
          <input
            type="number"
            value={settings.free_delivery_over}
            onChange={(e) => handleInputChange('free_delivery_over', parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            step="0.01"
            min="0"
          />
        </div>

        {/* Refund Order Validity */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="text-gray-700">Refund Order Validity (Days)</span>
          </div>
          <input
            type="number"
            value={settings.refund_days}
            onChange={(e) => handleInputChange('refund_days', parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            min="0"
          />
        </div>

        {/* Guest Checkout */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-700">Guest checkout</span>
            <InfoIcon />
          </div>
          <Toggle 
            isEnabled={settings.guest_checkout}
            onToggle={() => handleToggle('guest_checkout')}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          onClick={handleSaveSettings}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Orders;