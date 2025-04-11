import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const DeniedProductRequest = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: 'All Brands',
    category: '',
    subCategory: '',
    subSubCategory: ''
  });

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  const handleReset = () => {
    setFilters({
      brand: 'All Brands',
      category: '',
      subCategory: '',
      subSubCategory: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {/* Header with product icon and count */}
            <div className="flex items-center mb-6">
              <div className="bg-amber-100 p-2 rounded-md mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Denied Product Request</h1>
              <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">0</span>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-lg mb-6">
              <h2 className="text-md font-medium text-gray-700 mb-4">Filter Products</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={filters.brand}
                    onChange={(e) => handleFilterChange('brand', e.target.value)}
                  >
                    <option>All Brands</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <option>Select category</option>
                  </select>
                </div>

                {/* Sub Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={filters.subCategory}
                    onChange={(e) => handleFilterChange('subCategory', e.target.value)}
                  >
                    <option>Select Sub Category</option>
                  </select>
                </div>

                {/* Sub Sub Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Sub Category</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={filters.subSubCategory}
                    onChange={(e) => handleFilterChange('subSubCategory', e.target.value)}
                  >
                    <option>Select Sub Sub Category</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 mr-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Reset
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Show data
                </button>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div className="flex mb-4 md:mb-0">
                <input
                  type="text"
                  placeholder="Search by Product Name"
                  className="border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-64"
                />
                <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">
                  Search
                </button>
              </div>

              <div className="flex space-x-2">
                <button className="flex items-center border border-gray-300 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Export
                </button>
                <button className="flex items-center bg-cyan-500 text-white rounded-md px-3 py-2 hover:bg-cyan-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                  </svg>
                  Limited Stocks
                </button>
                <button className="flex items-center bg-blue-600 text-white rounded-md px-3 py-2 hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add new product
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SL
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verify Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Active Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="text-gray-400 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                          </div>
                          <p className="text-gray-500">No product found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    // Products would be mapped here
                    null
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeniedProductRequest;