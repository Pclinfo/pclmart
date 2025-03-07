import React, { useState } from 'react';
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar';

const PushNotificationSetup = () => {

  const [activeContent, setActiveContent] = useState(' ');

  const [selectedLanguage, setSelectedLanguage] = useState('English(EN)');
  const [notificationStates, setNotificationStates] = useState({
    orderPending: false,
    orderConfirmation: false,
    orderProcessing: false,
    orderOutForDelivery: false,
    orderDelivered: false,
    orderReturned: false,
    orderFailed: false,
    orderCanceled: false,
    orderRefunded: false,
    refundRequestCanceled: false,
    messageFromDeliveryMan: false,
    messageFromSeller: false
  });

  const languages = [
    { id: 'en', label: 'English(EN)' },
    { id: 'ar', label: 'Arabic(SA)' },
    { id: 'bd', label: 'Bangla(BD)' },
    { id: 'hi', label: 'Hindi(IN)' }
  ];

  const handleToggle = (key) => {
    setNotificationStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div>
      <Navbar />
      <div className='flex'>
        <Sidebar setActiveContent={setActiveContent} />
        <div className='flex-1 p-4'>
          {activeContent}
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <h1 className="text-xl font-semibold">Push Notification Setup</h1>
                <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">
                  Firebase Configuration
                </button>
              </div>
              <button className="text-blue-600 hover:underline">
                Read Documentation
              </button>
            </div>

            <div className="mb-6 flex flex-wrap gap-4">
              {languages.map(lang => (
                <button
                  key={lang.id}
                  className={`px-4 py-2 rounded ${selectedLanguage === lang.label
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  onClick={() => setSelectedLanguage(lang.label)}
                >
                  {lang.label}
                </button>
              ))}
              <select className="ml-auto px-4 py-2 border rounded">
                <option>For Customer</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { key: 'orderPending', label: 'Order Pending Message', placeholder: 'order pending message' },
                { key: 'orderConfirmation', label: 'Order Confirmation Message', placeholder: 'Order confirm Message' },
                { key: 'orderProcessing', label: 'Order Processing Message', placeholder: 'Order packaging Message' },
                { key: 'orderOutForDelivery', label: 'Order Out For Delivery Message', placeholder: 'Order out for delivery Message' },
                { key: 'orderDelivered', label: 'Order Delivered Message', placeholder: 'Order delivered Message' },
                { key: 'orderReturned', label: 'Order Returned Message', placeholder: 'Order Returned Message' },
                { key: 'orderFailed', label: 'Order Failed Message', placeholder: 'Order failed Message' },
                { key: 'orderCanceled', label: 'Order Canceled Message', placeholder: 'Order is canceled' },
                { key: 'orderRefunded', label: 'Order Refunded Message', placeholder: 'Your order {orderId} is refunded' },
                { key: 'refundRequestCanceled', label: 'Refund Request Canceled Message', placeholder: 'Your refund request is canceled {orderId}' },
                { key: 'messageFromDeliveryMan', label: 'Message From Delivery Man', placeholder: 'You have a message from deliveryman {deliveryManName}' },
                { key: 'messageFromSeller', label: 'Message From Seller', placeholder: 'You have a message from seller' }
              ].map(item => (
                <div key={item.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-medium">{item.label}</label>
                    <div className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        className="opacity-0 w-0 h-0"
                        checked={notificationStates[item.key]}
                        onChange={() => handleToggle(item.key)}
                      />
                      <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${notificationStates[item.key] ? 'bg-blue-600' : 'bg-gray-300'
                        }`}>
                        <span className={`absolute h-5 w-5 bg-white rounded-full transition-all duration-300 ${notificationStates[item.key] ? 'left-6' : 'left-1'
                          }`} />
                      </span>
                    </div>
                  </div>
                  <textarea
                    className="w-full p-2 border rounded min-h-[80px] resize-none"
                    placeholder={item.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushNotificationSetup;