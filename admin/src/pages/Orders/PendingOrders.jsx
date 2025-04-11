import React, { useState } from 'react';
import { ChevronDown, Eye, Download, Search } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const PendingOrders = () => {

  const orders = [
    {
      id: '100184',
      date: '10 Jan 2023, 02:59 AM',
      customer: 'Demo User',
      customerID: '545452',
      store: 'Golden Jewellery',
      amount: '$485.00',
      paymentMethod: 'Cash On Delivery',
      paid: false
    },
    {
      id: '100183',
      date: '10 Jan 2023, 02:59 AM',
      customer: 'Demo User',
      customerID: '545452',
      store: 'In House',
      amount: '$647.25',
      paymentMethod: 'Cash On Delivery',
      paid: false
    },
    {
      id: '100182',
      date: '10 Jan 2023, 02:59 AM',
      customer: 'Demo User',
      customerID: '545452',
      store: 'Bicycle Shop',
      amount: '$575.00',
      paymentMethod: 'Cash On Delivery',
      paid: false
    },
    {
      id: '100180',
      date: '10 Jan 2023, 02:56 AM',
      customer: 'Joy Joy',
      customerID: '+8**********',
      store: 'Golden Jewellery',
      amount: '$485.00',
      paymentMethod: 'Cash On Delivery',
      paid: false
    },
    {
      id: '100179',
      date: '10 Jan 2023, 02:56 AM',
      customer: 'Joy Joy',
      customerID: '+8**********',
      store: 'In House',
      amount: '$647.25',
      paymentMethod: 'Cash On Delivery',
      paid: false
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <div className="text-green-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold">Pending Orders</h1>
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">58</span>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Filter Order</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
                <div className="relative">
                  <select className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store</label>
                <div className="relative">
                  <select className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Inhouse</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <div className="relative">
                  <select className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>All customer</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Type</label>
                <div className="relative">
                  <select className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Select Date Type</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                Reset
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Show data
              </button>
            </div>
          </div>

          {/* Order List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h2 className="text-lg font-medium">Order List</h2>
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">58</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center rounded-md border border-gray-300 overflow-hidden">
                  <div className="flex items-center pl-3 text-gray-500">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by Order ID"
                    className="py-2 pl-2 pr-10 text-sm focus:outline-none"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 text-sm">
                    Search
                  </button>
                </div>
                <button className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <svg className="h-4 w-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Export
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SL
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Info
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Store
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                        {order.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {order.date}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="font-medium text-blue-600">{order.customer}</div>
                        <div className="text-gray-500">{order.customerID}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {order.store}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{order.amount}</div>
                        {!order.paid && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Unpaid
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {order.paymentMethod}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:bg-blue-100 p-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="text-green-600 hover:bg-green-100 p-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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

export default PendingOrders;