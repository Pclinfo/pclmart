import React, { useState } from 'react';
import { FaEye, FaDownload } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { RiFileExcel2Line } from 'react-icons/ri';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const DeliveredOrders = () => {

  const [orderType, setOrderType] = useState('All');
  const [store, setStore] = useState('Inhouse');
  const [customer, setCustomer] = useState('All customer');
  const [dateType, setDateType] = useState('Select Date Type');
  const [searchQuery, setSearchQuery] = useState('');


  const orders = [
    {
      id: '100191',
      pos: true,
      date: '18 Mar 2025, 03:11 PM',
      customer: 'Walking customer',
      store: 'In House',
      amount: '$60.00',
      status: 'Paid',
      paymentMethod: 'Cash'
    },
    {
      id: '100190',
      pos: false,
      date: '10 Jan 2024, 06:28 PM',
      customer: 'Devid Jack 8**********',
      store: 'Hanover Electronics',
      amount: '$5,600.01',
      status: 'Paid',
      paymentMethod: 'Cash On Delivery'
    },
    {
      id: '100189',
      pos: false,
      date: '10 Jan 2024, 06:24 PM',
      customer: 'Devid Jack 8**********',
      store: 'Hanover Electronics',
      amount: '$519.00',
      status: 'Paid',
      paymentMethod: 'Cash On Delivery'
    },
    {
      id: '100188',
      pos: false,
      date: '10 Jan 2024, 06:22 PM',
      customer: 'Devid Jack 8**********',
      store: 'Book Store',
      amount: '$535.00',
      status: 'Paid',
      paymentMethod: 'Cash On Delivery'
    },
    {
      id: '100187',
      pos: false,
      date: '10 Jan 2024, 06:22 PM',
      customer: 'Devid Jack 8**********',
      store: 'In House',
      amount: '$4,750.00',
      status: 'Paid',
      paymentMethod: 'Cash On Delivery'
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
          <span className="text-violet-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
            <h1 className="text-xl font-semibold">Delivered Orders</h1>
            <span className="ml-2 bg-gray-200 px-2 py-1 rounded-md text-sm">77</span>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Filter Order</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Order Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Order Type</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                  >
                    <option>All</option>
                    <option>Regular</option>
                    <option>POS</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Store Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Store</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                  >
                    <option>Inhouse</option>
                    <option>Book Store</option>
                    <option>Hanover Electronics</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Customer Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Customer</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  >
                    <option>All customer</option>
                    <option>Walking customer</option>
                    <option>Devid Jack</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Date Type</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={dateType}
                    onChange={(e) => setDateType(e.target.value)}
                  >
                    <option>Select Date Type</option>
                    <option>Order Date</option>
                    <option>Delivery Date</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end mt-6 space-x-4">
              <button className="px-6 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition">
                Reset
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Show data
              </button>
            </div>
          </div>

          {/* Order List Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-medium inline-block">Order List</h2>
                <span className="ml-2 bg-gray-200 px-2 py-1 rounded-md text-sm">77</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Search by Order ID"
                    className="border border-gray-300 rounded-l-md py-2 px-4 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700 transition">
                    <IoSearch className="text-lg" />
                  </button>
                </div>
                <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition w-full md:w-auto justify-center">
                  <RiFileExcel2Line className="mr-2 text-green-600" />
                  Export
                </button>
              </div>
            </div>

            {/* Order Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Info</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600">
                          {order.id} {order.pos && <span className="text-gray-500">(POS)</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.store}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.amount}</div>
                        <div className="text-xs text-green-500 bg-green-50 px-2 py-0.5 rounded inline-block">Paid</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{order.paymentMethod}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50">
                            <FaEye />
                          </button>
                          <button className="p-2 text-green-600 border border-green-200 rounded-md hover:bg-green-50">
                            <FaDownload />
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

export default DeliveredOrders;