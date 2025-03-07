import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const ProductReport = () => {
  const [activeTab, setActiveTab] = useState('all-products');
  const [filterYear, setFilterYear] = useState('This Year');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterStock, setFilterStock] = useState('Stock sort by (low to high)');
  const [activeContent, setActiveContent] = useState(' ');

  const stats = [
    {
      id: 1, label: 'Total Product', value: '0', icon: '🎁', subStats: [
        { label: 'Rejected', value: '0', color: 'text-red-500' },
        { label: 'Pending', value: '0', color: 'text-blue-500' },
        { label: 'Active', value: '0', color: 'text-green-500' },
      ]
    },
    { id: 2, label: 'Total Product Sale', value: '0', icon: '💰' },
    { id: 3, label: 'Total Discount Given', value: '$0.00', icon: '🎉' }
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  <h1 className="text-xl font-semibold text-gray-800">Product Report</h1>
                </div>
                <div className="text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">ℹ️</span>
                    Warning!
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('all-products')}
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'all-products'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    All Products
                  </button>
                  <button
                    onClick={() => setActiveTab('products-stock')}
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'products-stock'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Products Stock
                  </button>
                </nav>
              </div>
            </div>

            {/* Filter Section */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <select
                className="px-4 py-2 border rounded-md text-sm"
                value={activeTab === 'all-products' ? filterYear : filterCategory}
                onChange={(e) => activeTab === 'all-products' ? setFilterYear(e.target.value) : setFilterCategory(e.target.value)}
              >
                {activeTab === 'all-products' ? (
                  <option>This Year</option>
                ) : (
                  <option>All Categories</option>
                )}
              </select>
              {activeTab === 'products-stock' && (
                <select
                  className="px-4 py-2 border rounded-md text-sm"
                  value={filterStock}
                  onChange={(e) => setFilterStock(e.target.value)}
                >
                  <option>Stock sort by (low to high)</option>
                </select>
              )}
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
                Filter
              </button>
            </div>

            {/* Stats Cards */}
            {activeTab === 'all-products' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {stats.map((stat) => (
                  <div key={stat.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{stat.icon}</span>
                      <span className="text-2xl font-semibold">{stat.value}</span>
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                    {stat.subStats && (
                      <div className="flex justify-between mt-4">
                        {stat.subStats.map((subStat, index) => (
                          <div key={index} className="text-center">
                            <div className={`text-lg font-semibold ${subStat.color}`}>
                              {subStat.value}
                            </div>
                            <div className="text-xs text-gray-500">{subStat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Search and Export */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Product Name"
                    className="w-full px-4 py-2 border rounded-md text-sm"
                  />
                  <button className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-md">
                    Search
                  </button>
                </div>
              </div>
              <button className="px-4 py-2 border rounded-md text-sm flex items-center gap-2">
                <span>📥</span> Export
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">SL</th>
                    <th className="px-4 py-3 text-left">Product Name</th>
                    <th className="px-4 py-3 text-left">
                      {activeTab === 'all-products' ? 'Product Unit Price' : 'Last Updated Stock'}
                    </th>
                    <th className="px-4 py-3 text-left">
                      {activeTab === 'all-products' ? 'Total Amount Sold' : 'Current Stock'}
                    </th>
                    <th className="px-4 py-3 text-left">
                      {activeTab === 'all-products' ? 'Average Product Value' : 'Status'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 text-center" colSpan="5">
                      No product found
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReport;