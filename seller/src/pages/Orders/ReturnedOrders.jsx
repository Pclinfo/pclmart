import React, { useState } from 'react';
import { ChevronDown, Eye, Download, Search } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const ReturnedOrders = () => {
  const [orderType, setOrderType] = useState('All');
  const [store, setStore] = useState('Inhouse');
  const [customer, setCustomer] = useState('All customer');
  const [dateType, setDateType] = useState('Select Date Type');

  const [orders, setOrders] = useState([
    {
      sl: 1,
      orderId: '100174',
      orderDate: '10 Jan 2023, 02:47 AM',
      customerInfo: { name: 'Fatema Subarna', id: '018855' },
      store: 'Golden Jewellery',
      totalAmount: '$485.00',
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash On Delivery',
    },
    {
      sl: 2,
      orderId: '100052',
      orderDate: '18 Apr 2022, 03:50 AM',
      customerInfo: { name: 'Fatema Subarna', id: '018855' },
      store: 'Bicycle Shop',
      totalAmount: '$485.00',
      paymentStatus: 'Paid',
      paymentMethod: 'Sslcommerz',
    },
    {
      sl: 3,
      orderId: '100008',
      orderDate: '17 Mar 2022, 04:51 PM',
      customerInfo: { name: 'Md.Safayet Hossain', id: '4*********' },
      store: 'Book Store',
      totalAmount: '$764.00',
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash On Delivery',
    },
    {
      sl: 4,
      orderId: '100004',
      orderDate: '16 Mar 2022, 06:19 PM',
      customerInfo: { name: 'Fatema Subarna', id: '018855' },
      store: 'Bicycle Shop',
      totalAmount: '$1,500.00',
      paymentStatus: 'Unpaid',
      paymentMethod: 'Cash On Delivery',
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold">Returned Orders</h1>
            <span className="bg-gray-200 text-gray-700 rounded-md px-2 text-sm">4</span>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Filter Order</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Type</label>
                <div className="relative">
                  <select
                    className="appearance-none w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                  >
                    <option>All</option>
                    <option>Online</option>
                    <option>In-store</option>
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
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                  >
                    <option>Inhouse</option>
                    <option>Golden Jewellery</option>
                    <option>Bicycle Shop</option>
                    <option>Book Store</option>
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
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  >
                    <option>All customer</option>
                    <option>Fatema Subarna</option>
                    <option>Md.Safayet Hossain</option>
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
                    value={dateType}
                    onChange={(e) => setDateType(e.target.value)}
                  >
                    <option>Select Date Type</option>
                    <option>Order Date</option>
                    <option>Return Date</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                Reset
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Show data
              </button>
            </div>
          </div>

          {/* Order List Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium">Order List</h2>
                <span className="bg-gray-200 text-gray-700 rounded-md px-2 text-sm">4</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by Order ID"
                    className="border border-gray-300 rounded-l-md py-2 pl-3 pr-10 w-48 md:w-64 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button className="absolute right-0 top-0 h-full bg-blue-600 text-white px-4 rounded-r-md">
                    Search
                  </button>
                </div>

                <button className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Info</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.sl} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.sl}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customerInfo.name}</div>
                        <div className="text-sm text-gray-500">{order.customerInfo.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.store}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.totalAmount}</div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.paymentMethod}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 border border-blue-600 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="text-teal-600 hover:text-teal-900 p-1 border border-teal-600 rounded">
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

export default ReturnedOrders;