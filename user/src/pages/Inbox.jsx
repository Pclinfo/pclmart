import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Inbox = () => {
  const [activeTab, setActiveTab] = useState('Vendor');
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row flex-grow bg-gray-50">
        <Sidebar />
        <div className="flex-grow flex flex-col">
          {/* Tabs and Search Section */}
          <div className="border-b">
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center px-4 py-3">
              {/* Tabs */}
              <div className="flex space-x-8 mb-4 md:mb-0">
                <button 
                  className={`pb-2 font-medium ${activeTab === 'Vendor' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('Vendor')}
                >
                  Vendor
                </button>
                <button 
                  className={`pb-2 font-medium ${activeTab === 'Deliveryman' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('Deliveryman')}
                >
                  Deliveryman
                </button>
              </div>
              
              {/* Search bar */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Messages content area */}
          <div className="flex-grow flex flex-col items-center justify-center p-6 bg-white">
            <div className="text-center text-gray-500">
              You have not any conversation yet
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inbox