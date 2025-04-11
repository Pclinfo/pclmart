import React, { useState } from 'react';
import { ChevronDown, Eye, Download, Search } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const ConfirmedOrders = () => {
  const [filterType, setFilterType] = useState('All');
  const [filterStore, setFilterStore] = useState('Inhouse');
  const [filterCustomer, setFilterCustomer] = useState('All customer');
  const [filterDateType, setFilterDateType] = useState('Select Date Type');
  const [searchQuery, setSearchQuery] = useState('');


  const orders = [
    {
      id: '100171',
      date: '10 Jan 2023, 02:45 AM',
      customerName: 'Fatema Subarna',
      customerID: '018855',
      store: 'Book Store',
      amount: '$1,704.00',
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash On Delivery'
    },
    {
      id: '100143',
      date: '12 Oct 2022, 08:47 AM',
      customerName: 'Fatema Subarna',
      customerID: '018855',
      store: 'Book Store',
      amount: '$4,808.00',
      paymentStatus: 'Paid',
      paymentMethod: 'Stripe'
    },
    {
      id: '100141',
      date: '12 Oct 2022, 08:46 AM',
      customerName: 'Fatema Subarna',
      customerID: '018855',
      store: 'Book Store',
      amount: '$583.00',
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash On Delivery'
    },
    {
      id: '100139',
      date: '12 Oct 2022, 07:21 AM',
      customerName: 'Fatema Subarna',
      customerID: '018855',
      store: 'In House',
      amount: '$980.00',
      paymentStatus: 'Paid',
      paymentMethod: 'Pay By Wallet'
    },
    {
      id: '100130',
      date: '12 Oct 2022, 06:52 AM',
      customerName: 'Fatema Subarna',
      customerID: '018855',
      store: 'Book Store',
      amount: '$5,000.00',
      paymentStatus: 'Paid',
      paymentMethod: 'Paypal'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <span className="text-blue-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              <h1 className="text-xl font-bold text-gray-800">Confirmed Orders</h1>
              <span className="ml-2 bg-blue-600 text-white px-2 py-0.5 rounded-md text-sm">21</span>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-medium mb-4 text-gray-700">Filter Order</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
                <div className="relative">
                  <select
                    className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Inhouse">Inhouse</option>
                    <option value="Online">Online</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store</label>
                <div className="relative">
                  <select
                    className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filterStore}
                    onChange={(e) => setFilterStore(e.target.value)}
                  >
                    <option value="Inhouse">Inhouse</option>
                    <option value="Book Store">Book Store</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <div className="relative">
                  <select
                    className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filterCustomer}
                    onChange={(e) => setFilterCustomer(e.target.value)}
                  >
                    <option value="All customer">All customer</option>
                    <option value="Fatema Subarna">Fatema Subarna</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Type</label>
                <div className="relative">
                  <select
                    className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filterDateType}
                    onChange={(e) => setFilterDateType(e.target.value)}
                  >
                    <option value="Select Date Type">Select Date Type</option>
                    <option value="Order Date">Order Date</option>
                    <option value="Delivery Date">Delivery Date</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Reset</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Show data</button>
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
              <div className="flex items-center mb-2 sm:mb-0">
                <h2 className="text-lg font-medium text-gray-700">Order List</h2>
                <span className="ml-2 bg-blue-600 text-white px-2 py-0.5 rounded-md text-sm">21</span>
              </div>
              <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search by Order ID"
                    className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                    Search
                  </button>
                </div>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-gray-700">
                    <th className="px-4 py-3 font-medium">SL</th>
                    <th className="px-4 py-3 font-medium">Order ID</th>
                    <th className="px-4 py-3 font-medium">Order Date</th>
                    <th className="px-4 py-3 font-medium">Customer Info</th>
                    <th className="px-4 py-3 font-medium">Store</th>
                    <th className="px-4 py-3 font-medium">Total Amount</th>
                    <th className="px-4 py-3 font-medium">Payment Method</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id} className="border-t border-gray-200 text-sm">
                      <td className="px-4 py-3 text-gray-800">{index + 1}</td>
                      <td className="px-4 py-3 text-blue-600 font-medium">{order.id}</td>
                      <td className="px-4 py-3 text-gray-600">{order.date}</td>
                      <td className="px-4 py-3">
                        <div className="text-gray-800 font-medium">{order.customerName}</div>
                        <div className="text-gray-600">{order.customerID}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-800">{order.store}</td>
                      <td className="px-4 py-3">
                        <div className="text-gray-800 font-medium">{order.amount}</div>
                        <div className={`text-sm ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                          {order.paymentStatus}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-800">{order.paymentMethod}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-1">
                          <button className="p-1 bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="p-1 bg-green-50 text-green-600 rounded border border-green-200 hover:bg-green-100">
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

export default ConfirmedOrders;