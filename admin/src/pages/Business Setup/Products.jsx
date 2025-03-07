import React, { useState } from 'react';

const Products = () => {
  const [digitalProduct, setDigitalProduct] = useState(false);
  const [showBrand, setShowBrand] = useState(false);

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
              defaultValue={10}
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
      <div className="flex justify-end mt-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
          Save
        </button>
      </div>
    </div>
  );
};

export default Products;