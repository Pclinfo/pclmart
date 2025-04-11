import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const PendingRefunds = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('All');
  
 
  const refundRequests = [
    {
      sl: 1,
      refundId: 10,
      orderId: 100134,
      product: {
        name: 'Leather Ladies Bag',
        image: '/images/bag.jpg',
        qty: 1
      },
      customer: {
        name: 'Devid Jack',
        phone: '8**********'
      },
      amount: 6290.00
    },
    {
      sl: 2,
      refundId: 9,
      orderId: 100136,
      product: {
        name: 'Product name not found',
        image: '',
        qty: 0
      },
      customer: {
        name: 'Devid Jack',
        phone: '8**********'
      },
      amount: 441.00
    },
    {
      sl: 3,
      refundId: 8,
      orderId: 100124,
      product: {
        name: 'Product name not found',
        image: '',
        qty: 0
      },
      customer: {
        name: 'fatema subarna',
        phone: '018855'
      },
      amount: 5820.00
    },
    {
      sl: 4,
      refundId: 2,
      orderId: 100019,
      product: {
        name: 'Copper Alloy Inlaid Zircon Round Ring',
        image: '/images/ring.jpg',
        qty: 1
      },
      customer: {
        name: 'fatema subarna',
        phone: '018855'
      },
      amount: 5000.00
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4 lg:p-6">
          <div className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" fillRule="evenodd"></path>
                  </svg>
                  <h2 className="ml-2 text-lg font-semibold">Pending Refund Requests</h2>
                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-200 rounded-full">4</span>
                </div>
              </div>
            </div>

            {/* Search and filter */}
            <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <form onSubmit={handleSearch} className="w-full md:w-1/2">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search by order id or refund id"
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Search
                  </button>
                </div>
              </form>
              <div className="flex items-center gap-2 self-end">
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-50">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                  <span>Export</span>
                </button>
                <select
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
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
                      Refund ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Id
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {refundRequests.map((request) => (
                    <tr key={request.refundId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.sl}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {request.refundId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {request.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {request.product.image ? (
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full object-cover" src={request.product.image} alt="" />
                            </div>
                          ) : null}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{request.product.name}</div>
                            {request.product.qty > 0 && (
                              <div className="text-sm text-gray-500">QTY : {request.product.qty}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{request.customer.name}</div>
                        <div className="text-sm text-gray-500">{request.customer.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${request.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination - Optional */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                      1
                    </a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingRefunds;