import React, { useState } from 'react';
import { FaEye, FaDownload } from 'react-icons/fa';
import { ChevronDown, Eye, Download, Search } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const CancelledOrders = () => {
  const [filterOrderType, setFilterOrderType] = useState('All');
  const [filterStore, setFilterStore] = useState('Inhouse');
  const [filterCustomer, setFilterCustomer] = useState('All customer');
  const [filterDateType, setFilterDateType] = useState('Select Date Type');
  const [searchQuery, setSearchQuery] = useState('');

 
  const cancelledOrders = [
    {
      id: 1,
      orderId: '100173',
      orderDate: '10 Jan 2023, 02:47 AM',
      customerInfo: { name: 'Fatema Subarna', code: '018855' },
      store: 'Book Store',
      totalAmount: '$4,300.00',
      paymentMethod: 'Cash On Delivery',
      status: 'Unpaid'
    },
    {
      id: 2,
      orderId: '100088',
      orderDate: '23 Apr 2022, 06:10 AM',
      customerInfo: { name: 'Fatema Subarna', code: '018855' },
      store: 'In House',
      totalAmount: '$405.00',
      paymentMethod: 'Cash On Delivery',
      status: 'Unpaid'
    },
    {
      id: 3,
      orderId: '100087',
      orderDate: '23 Apr 2022, 05:02 AM',
      customerInfo: { name: 'Fatema Subarna', code: '018855' },
      store: 'In House',
      totalAmount: '$1,930.00',
      paymentMethod: 'Cash On Delivery',
      status: 'Unpaid'
    },
    {
      id: 4,
      orderId: '100083',
      orderDate: '23 Apr 2022, 04:43 AM',
      customerInfo: { name: 'Fatema Subarna', code: '018855' },
      store: 'Bicycle Shop',
      totalAmount: '$1,525.00',
      paymentMethod: 'Cash On Delivery',
      status: 'Unpaid'
    },
    {
      id: 5,
      orderId: '100078',
      orderDate: '22 Apr 2022, 02:45 PM',
      customerInfo: { name: 'Fatema Subarna', code: '018855' },
      store: 'In House',
      totalAmount: '$495.00',
      paymentMethod: 'Cash On Delivery',
      status: 'Unpaid'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="flex items-center mb-6">
            <div className="flex items-center text-gray-700">
              <div className="bg-orange-100 p-2 rounded-md mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold">Canceled Orders</h1>
            </div>
            <div className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded-md ml-2">
              9
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-md shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Filter Order</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
                <div className="relative">
                  <select
                    className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filterOrderType}
                    onChange={(e) => setFilterOrderType(e.target.value)}
                  >
                    <option>All</option>
                    <option>Regular</option>
                    <option>Express</option>
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
                    <option>Inhouse</option>
                    <option>Book Store</option>
                    <option>Bicycle Shop</option>
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
                    <option>All customer</option>
                    <option>Fatema Subarna</option>
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
                    <option>Select Date Type</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>Custom Range</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md mr-2 hover:bg-gray-200 transition-colors">
                Reset
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Show data
              </button>
            </div>
          </div>

          {/* Order List Section */}
          <div className="bg-white rounded-md shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <h2 className="text-lg font-medium mr-2">Order List</h2>
                <div className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded-md">
                  9
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search by Order ID"
                    className="px-4 py-2 focus:outline-none w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="ml-1">Search</span>
                  </button>
                </div>

                <button className="flex items-center space-x-1 bg-green-50 text-green-700 px-4 py-2 rounded-md border border-green-200 hover:bg-green-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Export</span>
                </button>
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
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Store
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cancelledOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-600">{order.orderId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.orderDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customerInfo.name}</div>
                        <div className="text-sm text-gray-500">{order.customerInfo.code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.store}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.totalAmount}</div>
                        <div className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded inline-block mt-1">
                          {order.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="p-1 bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 transition-colors">
                            <FaEye className="h-4 w-4" />
                          </button>
                          <button className="p-1 bg-green-50 text-green-600 rounded border border-green-200 hover:bg-green-100 transition-colors">
                            <FaDownload className="h-4 w-4" />
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

export default CancelledOrders;