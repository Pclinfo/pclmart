import React, { useState } from 'react';

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
    orderDeliveryVerification: true,
    minimumOrderAmount: true,
    showBillingAddress: true,
    freeDelivery: true,
    guestCheckout: true
  });

  const [refundDays, setRefundDays] = useState('5');
  const [deliveryResponsibility, setDeliveryResponsibility] = useState('Admin');
  const [freeDeliveryOver, setFreeDeliveryOver] = useState('1000');

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <svg className="w-6 h-6 text-gray-700 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <h1 className="text-xl font-semibold text-gray-800">Order Settings</h1>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Order Delivery Verification */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-700">Order Delivery Verification</span>
            <InfoIcon />
          </div>
          <Toggle 
            isEnabled={settings.orderDeliveryVerification}
            onToggle={() => handleToggle('orderDeliveryVerification')}
          />
        </div>

        {/* Minimum Order Amount */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-700">Minimum order amount</span>
            <InfoIcon />
          </div>
          <Toggle 
            isEnabled={settings.minimumOrderAmount}
            onToggle={() => handleToggle('minimumOrderAmount')}
          />
        </div>

        {/* Show Billing Address */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-700">Show Billing Address In Checkout</span>
            <InfoIcon />
          </div>
          <Toggle 
            isEnabled={settings.showBillingAddress}
            onToggle={() => handleToggle('showBillingAddress')}
          />
        </div>

        {/* Free Delivery */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-700">Free Delivery</span>
            <InfoIcon />
          </div>
          <Toggle 
            isEnabled={settings.freeDelivery}
            onToggle={() => handleToggle('freeDelivery')}
          />
        </div>

        {/* Free Delivery Responsibility */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="text-gray-700">Free Delivery Responsibility</span>
          </div>
          <select 
            value={deliveryResponsibility}
            onChange={(e) => setDeliveryResponsibility(e.target.value)}
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
            type="text"
            value={freeDeliveryOver}
            onChange={(e) => setFreeDeliveryOver(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Refund Order Validity */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center mb-2">
            <span className="text-gray-700">Refund Order Validity (Days)</span>
          </div>
          <input
            type="text"
            value={refundDays}
            onChange={(e) => setRefundDays(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Guest Checkout */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-700">Guest checkout</span>
            <InfoIcon />
          </div>
          <Toggle 
            isEnabled={settings.guestCheckout}
            onToggle={() => handleToggle('guestCheckout')}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Save
        </button>
      </div>
    </div>
  );
};

export default Orders;