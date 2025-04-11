import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const NewProductRequest = () => {
  const [activeContent, setActiveContent] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center p-4 border-b">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-md bg-red-600 mr-2"></div>
                <h1 className="text-xl font-semibold text-gray-800">Pending For Approval Products</h1>
              </div>
              <div className="ml-2 bg-gray-200 text-gray-700 px-2 rounded-full text-sm">0</div>
            </div>

            {/* Filter Section */}
            <div className="p-4 border-b">
              <h2 className="text-lg font-medium mb-4">Filter Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option>All Brands</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select category</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Sub Category</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Sub Category</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Sub Sub Category</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">
                  Reset
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Show data
                </button>
              </div>
            </div>

            {/* Search and Action Section */}
            <div className="p-4 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <div className="flex w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search by Product Name"
                  className="border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
                  Search
                </button>
              </div>
              <div className="flex w-full md:w-auto justify-end">
                <button className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-2 bg-white hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Empty state */}
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-24 h-24 mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                            <circle cx="12" cy="17" r="1"></circle>
                            <path d="M12 12v.01"></path>
                          </svg>
                        </div>
                        <p className="text-gray-500 text-sm">No product found</p>
                      </div>
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

export default NewProductRequest;