import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const ApprovedProduct = () => {
  const [activeContent, setActiveContent] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: 1, name: 'Norton Utilities Ult...', type: 'Digital', price: '$40.00', verifyStatus: 'Approved', active: true, image: '/path/to/norton.png' },
    { id: 2, name: 'Office 2021 Professi...', type: 'Digital', price: '$150.00', verifyStatus: 'Approved', active: true, image: '/path/to/office.png' },
    { id: 3, name: '125 Childrens AudioB...', type: 'Digital', price: '$50.00', verifyStatus: 'Approved', active: true, image: '/path/to/audiobook.png' },
    { id: 4, name: 'Kill Code fiction', type: 'Physical', price: '$16.00', verifyStatus: 'Approved', active: true, image: '/path/to/killcode.png' },
    { id: 5, name: 'Science Fiction-Myth...', type: 'Physical', price: '$20.00', verifyStatus: 'Approved', active: true, image: '/path/to/science.png' },
    { id: 6, name: 'Hydration Backpack', type: 'Physical', price: '$40.00', verifyStatus: 'Approved', active: true, image: '/path/to/backpack.png' },
    { id: 7, name: 'Hydration Pack', type: 'Physical', price: '$50.00', verifyStatus: 'Approved', active: true, image: '/path/to/pack.png' },
  ];

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
                <h1 className="text-xl font-semibold text-gray-800">Approved Products</h1>
              </div>
              <div className="ml-2 bg-gray-200 text-gray-700 px-2 rounded-full text-sm">20</div>
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
              <div className="flex space-x-2 w-full md:w-auto justify-end">
                <button className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-2 bg-white hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Export</span>
                </button>
                <button className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-2 bg-teal-500 text-white hover:bg-teal-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  <span>Limited Stocks</span>
                </button>
                <button className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-2 bg-blue-600 text-white hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>Add new product</span>
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
                      Active Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-3">
                            <div className="h-10 w-10 border border-gray-200 bg-gray-100 rounded flex items-center justify-center">
                              {/* Placeholder for product image */}
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.verifyStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <label className="inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={product.active} className="sr-only peer" />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1">
                        <div className="flex space-x-1">
                          <button className="text-blue-600 hover:text-blue-800 border border-blue-600 p-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                          </button>
                          <button className="text-blue-600 hover:text-blue-800 border border-blue-600 p-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="text-blue-600 hover:text-blue-800 border border-blue-600 p-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="text-red-600 hover:text-red-800 border border-red-600 p-1.5 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
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

export default ApprovedProduct;