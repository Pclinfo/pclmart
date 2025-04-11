import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import refer_a_friends from '../assets/refer_a_friends.webp'

const ReferEarn = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Refer & Earn</h1>

            {/* Main Content Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              {/* Illustration */}
              <div className="flex justify-center mb-8">
                <div className="relative w-64 h-48 md:w-80 md:h-60">
                  <img
                    src={refer_a_friends}
                    alt="Refer friends illustration"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-4">
                <h2 className="text-xl md:text-2xl font-medium text-blue-600">Invite Your Friends & Businesses</h2>
                <p className="text-gray-600 mt-1">Copy your code and share your friends</p>
              </div>

              {/* Code Input */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Your personal code</p>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    value="3PSBVM5YTDTJYAJATESC"
                    readOnly
                    className="flex-grow py-3 px-4 text-gray-700 focus:outline-none"
                  />
                  <button className="bg-blue-500 text-white p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Share Options */}
              <div className="text-center mb-8">
                <p className="text-gray-500 mb-4">OR SHARE</p>
                <div className="flex justify-center space-x-4">
                  <button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* How it works */}
              <div className="bg-blue-50 rounded-lg p-4 md:p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 text-sm font-medium">i</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">How you it works?</h3>
                </div>

                <div className="ml-9">
                  <div className="mb-3 flex">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span className="text-gray-600 text-sm">1</span>
                    </div>
                    <p className="text-gray-600">Invite your friends & businesses</p>
                  </div>

                  <div className="mb-3 flex">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span className="text-gray-600 text-sm">2</span>
                    </div>
                    <p className="text-gray-600">They register PCL Mart with special offer</p>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span className="text-gray-600 text-sm">3</span>
                    </div>
                    <p className="text-gray-600">You made your earning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferEarn;