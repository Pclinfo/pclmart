import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const VendorReport = () => {
  const [selectedVendor, setSelectedVendor] = useState('All vendors');
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Year');
  const [activeContent, setActiveContent] = useState('');
  
  const vendorData = [
    {
      id: 1,
      name: 'Golden Jewellery',
      company: 'Abc Abc',
      totalOrder: '$1,435.00',
      commission: '$0.00',
      refundRate: '0%'
    },

  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-700 flex items-center">
              <span className="mr-2">📊</span> Vendor Reports
            </h1>
          </div>

          {/* Filter Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-3">Filter Data</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedVendor}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                >
                  <option>All vendors</option>
                  {/* Add more vendor options as needed */}
                </select>
              </div>
              <div className="flex-1">
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                >
                  <option>This Year</option>
                  <option>Last Year</option>
                  <option>This Month</option>
                  <option>Last Month</option>
                </select>
              </div>
              <div>
                <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Products Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg mr-4">
                  <span className="text-2xl">🎁</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">0</h3>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
              </div>
            </div>

            {/* Total Orders Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <span className="text-2xl">🛒</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">111</h3>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="text-center">
                  <p className="text-sm font-bold text-red-500">11</p>
                  <p className="text-xs text-gray-500">Cancelled</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-blue-500">57</p>
                  <p className="text-xs text-gray-500">Ongoing</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-green-500">43</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
            </div>

            {/* Deliveryman Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg mr-4">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">0</h3>
                  <p className="text-sm text-gray-600">Total Deliveryman</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chart and Earnings Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Order Statistics Chart */}
            <div className="bg-white p-4 rounded-lg shadow-sm lg:col-span-2">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Order Statistics</h2>
              <div className="h-64">
                {/* Chart would go here - using a placeholder */}
                <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 800 300">
                    <path d="M0,250 Q100,100 200,250 T400,250 T600,250 T800,250" 
                          fill="none" 
                          stroke="#3B82F6" 
                          strokeWidth="3"/>
                    <path d="M0,250 Q100,50 200,250 T400,250 T600,250 T800,250" 
                          fill="url(#gradient)" 
                          fillOpacity="0.2" 
                          stroke="none"/>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-xs text-gray-500">Jan</span>
                <span className="text-xs text-gray-500">Feb</span>
                <span className="text-xs text-gray-500">Mar</span>
                <span className="text-xs text-gray-500">Apr</span>
                <span className="text-xs text-gray-500">May</span>
                <span className="text-xs text-gray-500">Jun</span>
                <span className="text-xs text-gray-500">Jul</span>
                <span className="text-xs text-gray-500">Aug</span>
                <span className="text-xs text-gray-500">Sep</span>
                <span className="text-xs text-gray-500">Oct</span>
                <span className="text-xs text-gray-500">Nov</span>
                <span className="text-xs text-gray-500">Dec</span>
              </div>
            </div>

            {/* Total Shop Earnings */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-center items-center">
              <div className="mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h2 className="text-lg font-medium text-gray-700 mb-2">Total Shop Earnings</h2>
              <p className="text-3xl font-bold text-gray-800">$159,457.84</p>
            </div>
          </div>

          {/* Vendor Table */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-lg font-medium text-gray-700 mb-2 md:mb-0">
                Total Vendor <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">5</span>
              </h2>
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="Search by vendor info" 
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="absolute right-0 top-0 bottom-0 px-3 text-gray-500">
                    🔍
                  </button>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Search
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                  Export
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SL
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor Info
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Order
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Refund Rate
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vendorData.map((vendor) => (
                    <tr key={vendor.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {vendor.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                        <div className="text-sm text-gray-500">{vendor.company}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vendor.totalOrder}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vendor.commission}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {vendor.refundRate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button className="bg-blue-100 text-blue-600 p-2 rounded-md hover:bg-blue-200 transition">
                          👁️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorReport;