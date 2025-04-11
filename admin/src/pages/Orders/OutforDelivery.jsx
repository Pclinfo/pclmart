import React, { useState } from 'react';
import { ChevronDown, Eye, Download, Search } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';



const OutforDelivery = () => {
  const [orders, setOrders] = useState([
    {
      id: '100170',
      date: '10 Jan 2023, 02:45 AM',
      customer: 'Fatema Subarna',
      customerCode: '018855',
      store: 'In House',
      amount: 575.00,
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash On Delivery'
    },
    {
      id: '100161',
      date: '20 Nov 2022, 01:33 AM',
      customer: 'Fatema Subarna',
      customerCode: '018855',
      store: 'In House',
      amount: 485.00,
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash On Delivery'
    },
    {
      id: '100155',
      date: '20 Nov 2022, 12:03 AM',
      customer: 'Fatema Subarna',
      customerCode: '018855',
      store: 'Book Store',
      amount: 4850.00,
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash On Delivery'
    },
    {
      id: '100154',
      date: '20 Nov 2022, 12:02 AM',
      customer: 'Fatema Subarna',
      customerCode: '018855',
      store: 'Bicycle Shop',
      amount: 5100.00,
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash On Delivery'
    },
    {
      id: '100137',
      date: '12 Oct 2022, 07:10 AM',
      customer: 'Fatema Subarna',
      customerCode: '018855',
      store: 'Book Store',
      amount: 5400.00,
      paymentStatus: 'Paid',
      paymentMethod: 'Stripe'
    }
  ]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div className="flex items-center text-gray-700 font-medium">
            <span className="text-orange-600 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </span>
              <h1 className="text-xl">Out for delivery Orders</h1>
            </div>
            <div className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md text-sm">8</div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Filter Order</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Order Type */}
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

              {/* Store */}
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

              {/* Customer */}
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

              {/* Date Type */}
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

            <div className="flex justify-end">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md mr-2">
                Reset
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                Show data
              </button>
            </div>
          </div>

          {/* Order List Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="flex items-center mb-3 sm:mb-0">
                <h2 className="text-lg font-medium text-gray-700 mr-2">Order List</h2>
                <div className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md text-sm">8</div>
              </div>

              <div className="flex flex-wrap w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="w-full sm:w-auto flex">
                  <input
                    type="text"
                    placeholder="Search by Order ID"
                    className="border border-gray-300 rounded-l-md py-2 px-3 flex-grow sm:flex-grow-0 sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-md flex items-center justify-center">
                    <Search size={16} className="mr-1" />
                    Search
                  </button>
                </div>

                <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-2 px-4 rounded-md flex items-center justify-center">
                  <span className="mr-2">📊</span>
                  Export
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
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
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 font-medium">{order.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <div>{order.date}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.customerCode}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.store}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${order.amount.toFixed(2)}</div>
                        <div className={`text-xs px-2 py-0.5 rounded-md inline-block ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                          {order.paymentStatus}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.paymentMethod}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-1">
                          <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                            <Eye size={18} />
                          </button>
                          <button className="text-green-600 hover:bg-green-50 p-1 rounded">
                            <Download size={18} />
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

export default OutforDelivery;