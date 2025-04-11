import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const RejectedRefunds = () => {
 
  
  const refundRequests = [
    {
      sl: 1,
      refundId: 11,
      orderId: 100140,
      productInfo: "Product name not found",
      customerInfo: {
        name: "David Jack",
        phoneNumber: "8*********"
      },
      totalAmount: 525.00
    },
    {
      sl: 2,
      refundId: 5,
      orderId: 100053,
      productInfo: {
        name: "iPhone 14 Pro Max",
        qty: 3,
        image: "/iphone.png"
      },
      customerInfo: {
        name: "fatema subarna",
        phoneNumber: "018855"
      },
      totalAmount: 1425.00
    },
    {
      sl: 3,
      refundId: 4,
      orderId: 100041,
      productInfo: "Product name not found",
      customerInfo: {
        name: "fatema subarna",
        phoneNumber: "018855"
      },
      totalAmount: 52.25
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div className="flex items-center mr-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Rejected Refund Requests</h1>
            <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-sm">3</span>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex-1 max-w-xl">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search by order id or refund id"
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-200">
                  Search
                </button>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center border border-gray-300 px-4 py-2 rounded-md bg-white hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export
              </button>
              <div className="relative">
                <button className="flex items-center justify-between border border-gray-300 px-4 py-2 rounded-md bg-white hover:bg-gray-50 min-w-32">
                  <span>All</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Refund ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Id
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Info
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Info
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {refundRequests.map((request) => (
                  <tr key={request.refundId} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.sl}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                      {request.refundId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                      {request.orderId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {typeof request.productInfo === 'object' ? (
                          <>
                            <img src={request.productInfo.image} alt="Product" className="w-8 h-8 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{request.productInfo.name}</div>
                              <div className="text-sm text-gray-500">QTY : {request.productInfo.qty}</div>
                            </div>
                          </>
                        ) : (
                          <span className="text-sm text-gray-900">{request.productInfo}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.customerInfo.name}</div>
                      <div className="text-sm text-gray-500">{request.customerInfo.phoneNumber}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${request.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="p-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
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
  );
};

export default RejectedRefunds;