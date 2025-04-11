import React, { useState, useEffect } from 'react';
import config from '../../config';

const Products = () => {
  const [reorderLevel, setReorderLevel] = useState(10);
  const [digitalProduct, setDigitalProduct] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null);

  // Fetch product settings on component mount
  useEffect(() => {
    const fetchProductSettings = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/get_product_settings`);
        const data = await response.json();
        
        setReorderLevel(data.reorderLevel);
        setDigitalProduct(data.digitalProduct);
        setShowBrand(data.showBrand);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product settings:', error);
        setLoading(false);
      }
    };

    fetchProductSettings();
  }, []);

  // Save product settings
  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      const response = await fetch(`${config.apiUrl}/save_product_settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reorderLevel,
          digitalProduct,
          showBrand,
        }),
      });

      const data = await response.json();
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (error) {
      console.error('Error saving product settings:', error);
      setSaveStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm max-w-4xl mx-auto flex justify-center">
        <div className="text-gray-500">Loading product settings...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          Product Setup
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </h2>

        <div className="space-y-4 md:space-y-6">
          {/* Re-Order Level */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="flex items-center gap-2 min-w-[150px]">
              Re-Order Level
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </label>
            <input
              type="number"
              className="flex-1 max-w-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reorderLevel}
              onChange={(e) => setReorderLevel(parseInt(e.target.value) || 0)}
            />
          </div>

          {/* Sell Digital Product */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="flex items-center gap-2 min-w-[150px]">
              Sell Digital Product
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </label>
            <div 
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${digitalProduct ? 'bg-blue-600' : 'bg-gray-200'}`}
              onClick={() => setDigitalProduct(!digitalProduct)}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${digitalProduct ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>

          {/* Show Brand */}
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <label className="flex items-center gap-2 min-w-[150px]">
              Show Brand
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </label>
            <div 
              className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${showBrand ? 'bg-blue-600' : 'bg-gray-200'}`}
              onClick={() => setShowBrand(!showBrand)}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${showBrand ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6 items-center gap-4">
        {saveStatus === 'success' && (
          <span className="text-green-600">Settings saved successfully!</span>
        )}
        {saveStatus === 'error' && (
          <span className="text-red-600">Error saving settings. Please try again.</span>
        )}
        <button 
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            saveStatus === 'saving' 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
        >
          {saveStatus === 'saving' ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default Products;