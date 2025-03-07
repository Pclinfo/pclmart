import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Index = () => {
  const [activeContent, setActiveContent] = useState(' ');

  const [activeTab, setActiveTab] = useState('Customer');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            <div className="flex flex-col md:flex-row h-full">
              {/* Left Sidebar */}
              <div className="w-full md:w-80 bg-white p-4 border-r border-gray-200">
                <div className="mb-6">
                  <h1 className="text-xl font-semibold mb-4">Chatting List</h1>
                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search customers..."
                      className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                      className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-4">
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'Customer'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500'
                      }`}
                    onClick={() => setActiveTab('Customer')}
                  >
                    Customer
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'Delivery Man'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500'
                      }`}
                    onClick={() => setActiveTab('Delivery Man')}
                  >
                    Delivery Man
                  </button>
                </div>

                {/* No Customer Found State */}
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500">No Customer Found</p>
                </div>
              </div>

              {/* Main Chat Area */}
              <div className="flex-1 flex items-center justify-center bg-white">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500">You have not any conversation yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;