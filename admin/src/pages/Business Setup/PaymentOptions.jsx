import React, { useState } from 'react';

const PaymentOptions = () => {
  const [paymentMethods, setPaymentMethods] = useState({
    cashOnDelivery: false,
    digitalPayment: false,
    offlinePayment: false
  });

  const handleToggle = (method) => {
    setPaymentMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-lg font-medium mb-4">Payment Methods</h2>
      
      <div className="space-y-3 md:space-y-4">
        {/* Cash on delivery option */}
        <div className="flex items-center justify-between p-3 border rounded-lg hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-2">
            <span className="font-medium">Cash on delivery</span>
            <button 
              className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center"
              title="More information"
            >
              <span className="text-gray-500 text-sm">i</span>
            </button>
          </div>
          <button
            onClick={() => handleToggle('cashOnDelivery')}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              paymentMethods.cashOnDelivery ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
              paymentMethods.cashOnDelivery ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Digital payment option */}
        <div className="flex items-center justify-between p-3 border rounded-lg hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-2">
            <span className="font-medium">Digital payment</span>
            <button 
              className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center"
              title="More information"
            >
              <span className="text-gray-500 text-sm">i</span>
            </button>
          </div>
          <button
            onClick={() => handleToggle('digitalPayment')}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              paymentMethods.digitalPayment ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
              paymentMethods.digitalPayment ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Offline payment option */}
        <div className="flex items-center justify-between p-3 border rounded-lg hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-2">
            <span className="font-medium">Offline payment</span>
            <button 
              className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center"
              title="More information"
            >
              <span className="text-gray-500 text-sm">i</span>
            </button>
          </div>
          <button
            onClick={() => handleToggle('offlinePayment')}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              paymentMethods.offlinePayment ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
              paymentMethods.offlinePayment ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          SAVE
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;