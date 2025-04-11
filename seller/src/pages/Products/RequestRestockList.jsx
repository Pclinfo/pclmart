import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const RequestRestockList = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setSelectedDate('');
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedBrand('');
  };

  const handleShowData = () => {

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      setProducts([]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar setActiveContent={() => { }} />
        <main className="flex-1 p-4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex items-center mb-4">
              <h1 className="text-xl font-semibold text-gray-800">Request Restock List</h1>
              <span className="ml-2 bg-gray-200 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center text-sm">0</span>
            </div>

            {/* Filter Section */}
            <div className="mb-4">
              <h2 className="font-medium text-gray-700 mb-3">Filter Products</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Request Restock Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Request Restock Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    placeholder="Select Date"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="food">Food</option>
                  </select>
                </div>

                {/* Sub Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                  >
                    <option value="">Select Sub Category</option>
                    <option value="phones">Phones</option>
                    <option value="laptops">Laptops</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="">Select brand</option>
                    <option value="apple">Apple</option>
                    <option value="samsung">Samsung</option>
                    <option value="nike">Nike</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition duration-200"
                >
                  Reset
                </button>
                <button
                  onClick={handleShowData}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
                >
                  Show data
                </button>
              </div>
            </div>
          </div>

          {/* Request List Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <h2 className="text-lg font-medium text-gray-800">Request list</h2>
                  <span className="ml-2 bg-gray-200 text-gray-700 rounded-full h-6 w-6 flex items-center justify-center text-sm">0</span>
                </div>

                <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by Product Name"
                      className="pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200">
                    Search
                  </button>

                  <button className="px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-md transition duration-200 flex items-center justify-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
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
                      Selling Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Request Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Number Of Request
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">Loading...</td>
                    </tr>
                  ) : products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.lastRequestDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.numberOfRequests}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800">View</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="mb-4">
                            <svg className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                          </div>
                          <p className="text-gray-500 text-sm">No product found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RequestRestockList;