import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';

const PaymentOptions = () => {
  const [paymentMethods, setPaymentMethods] = useState({
    cashOnDelivery: false,
    digitalPayment: false,
    offlinePayment: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState({
    show: false,
    message: '',
    isError: false
  });

  // Fetch initial payment options when component mounts
  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  const fetchPaymentOptions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${config.apiUrl}/get_payment`);
      setPaymentMethods(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching payment options:', error);
      setIsLoading(false);
      showStatusMessage('Failed to load payment options', true);
    }
  };

  const showStatusMessage = (message, isError = false) => {
    setSaveStatus({
      show: true,
      message,
      isError
    });
    
    // Auto hide the message after 3 seconds
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleToggle = async (method) => {
    try {
      // Update local state optimistically
      const updatedMethods = {
        ...paymentMethods,
        [method]: !paymentMethods[method]
      };
      
      setPaymentMethods(updatedMethods);
      
      // Save to server immediately
      await axios.post(`${config.apiUrl}/save_payment`, updatedMethods);
      showStatusMessage(`${method.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} updated successfully`);
    } catch (error) {
      console.error(`Error updating ${method}:`, error);
      
      // Revert the change on error
      setPaymentMethods(paymentMethods);
      showStatusMessage(`Failed to update ${method.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`, true);
    }
  };

  if (isLoading) {
    return <div className="w-full max-w-4xl mx-auto p-4 text-center">Loading payment options...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-lg font-medium mb-4">Payment Methods</h2>
      
      {saveStatus.show && (
        <div className={`mb-4 p-2 rounded ${saveStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {saveStatus.message}
        </div>
      )}
      
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
    </div>
  );
};

export default PaymentOptions;