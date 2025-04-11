import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const TransactionReport = () => {
  const [activeTab, setActiveTab] = useState('order');
  const [activeContent, setActiveContent] = useState('');
  const [filterStatus, setFilterStatus] = useState('All status');
  const [filterType, setFilterType] = useState('All');
  const [filterCustomer, setFilterCustomer] = useState('All customer');
  const [filterTimeframe, setFilterTimeframe] = useState('This Year');


  const paymentStats = {
    total: '$166.3K+',
    cash: '$90,656.81',
    digital: '$68,323.25',
    wallet: '$7,335.00',
    offline: '$0.00'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-700 flex items-center">
              <span className="mr-2">📊</span> Transaction Report
            </h1>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('order')}
                className={`py-3 px-1 border-b-2 ${activeTab === 'order'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors duration-200`}
              >
                Order Transactions
              </button>
              <button
                onClick={() => setActiveTab('expense')}
                className={`py-3 px-1 border-b-2 ${activeTab === 'expense'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors duration-200`}
              >
                Expense Transactions
              </button>
              <button
                onClick={() => setActiveTab('refund')}
                className={`py-3 px-1 border-b-2 ${activeTab === 'refund'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors duration-200`}
              >
                Refund Transactions
              </button>
            </nav>
          </div>

          {/* Filter Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-3">Filter Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All status</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>

              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option>All</option>
                <option>In House</option>
                <option>Vendor</option>
              </select>

              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterCustomer}
                onChange={(e) => setFilterCustomer(e.target.value)}
              >
                <option>All customer</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>

              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterTimeframe}
                onChange={(e) => setFilterTimeframe(e.target.value)}
              >
                <option>This Year</option>
                <option>Last Year</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
                Filter
              </button>
            </div>
          </div>

          {/* Stats and Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Orders Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <span className="text-2xl">🛒</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">190</h3>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <div className="text-center">
                  <p className="text-sm font-bold text-blue-500">79</p>
                  <p className="text-xs text-gray-500">In House Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-green-500">111</p>
                  <p className="text-xs text-gray-500">Vendor Orders</p>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <div className="text-center">
                  <p className="text-sm font-bold text-blue-500">4</p>
                  <p className="text-xs text-gray-500">In House Products</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-green-500">4</p>
                  <p className="text-xs text-gray-500">Vendor Products</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg mr-4">
                    <span className="text-2xl">🏪</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">0</h3>
                    <p className="text-sm text-gray-600">Total Stores</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Statistics Chart */}
            <div className="bg-white p-4 rounded-lg shadow-sm lg:col-span-1">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Order Statistics</h2>
              <div className="h-64">
                {/* Chart placeholder */}
                <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 800 300">
                    <path d="M0,250 Q100,100 200,250 T400,250 T600,250 T800,250"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3" />
                    <path d="M0,250 Q100,50 200,250 T400,250 T600,250 T800,250"
                      fill="url(#gradient)"
                      fillOpacity="0.2"
                      stroke="none" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-xs text-gray-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
              </div>
              <div className="mt-2 text-xs text-blue-500 flex items-center justify-center">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                <span>Total order amount: $0</span>
              </div>
            </div>

            {/* Payment Statistics Pie Chart */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Payment Statistics</h2>
              <div className="flex justify-center">
                <div className="relative w-40 h-40">
                  {/* Simplified pie chart - in a real implementation you'd use a chart library */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400" style={{ width: '55%' }}></div>
                  </div>
                  <div className="absolute inset-0 rounded-full overflow-hidden" style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 55% 100%)' }}>
                    <div className="h-full bg-blue-300" style={{ width: '100%' }}></div>
                  </div>
                  <div className="absolute inset-0 rounded-full overflow-hidden" style={{ clipPath: 'polygon(90% 0, 100% 0, 100% 10%, 90% 10%)' }}>
                    <div className="h-full bg-blue-800" style={{ width: '100%' }}></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <p className="text-xl font-bold">{paymentStats.total}</p>
                    <p className="text-xs text-gray-500">Completed payments</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-blue-800 rounded-full mr-2"></span>
                  <span className="text-sm">Cash payments ({paymentStats.cash})</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                  <span className="text-sm">Digital payments ({paymentStats.digital})</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-blue-300 rounded-full mr-2"></span>
                  <span className="text-sm">Wallet ({paymentStats.wallet})</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                  <span className="text-sm">Offline payments ({paymentStats.offline})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionReport;