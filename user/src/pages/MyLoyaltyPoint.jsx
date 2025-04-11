import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MyLoyaltyPoint = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6">
          <div className="mb-8">
            <h1 className="text-xl font-semibold text-gray-800 mb-6">Loyalty Point</h1>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              {/* Loyalty Points Card */}
              <div className="bg-blue-600 rounded-lg p-6 text-white w-full md:w-2/5">
                <p className="text-sm font-medium mb-2">Total Loyalty Point</p>
                <p className="text-5xl font-bold mb-4">0</p>
                <div className="flex justify-end">
                  <img src="/path-to-your-icon.svg" alt="Loyalty icon" className="w-20 h-20 opacity-30" />
                </div>
              </div>

              {/* How To Use Card */}
              <div className="bg-white rounded-lg p-6 w-full md:w-3/5 shadow-sm">
                <h2 className="text-lg font-medium text-gray-800 mb-4">How To Use</h2>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="min-w-4 mr-2">•</div>
                    <span>Convert your loyalty point to wallet money.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="min-w-4 mr-2">•</div>
                    <span>Minimum 200 Points required to convert into currency.</span>
                  </li>
                </ul>
                <div className="flex justify-start">
                  <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-1 10.707l-3.293-3.293a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Convert to currency
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
              <button className="flex items-center bg-white border border-gray-300 px-3 py-1.5 rounded text-sm">
                Filter
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Empty Transaction State */}
            <div className="bg-white rounded-lg p-10 shadow-sm flex flex-col items-center justify-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <svg className="w-16 h-16 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-center">You do not have any<br />Transaction yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLoyaltyPoint;