import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Search, Download } from 'lucide-react';

const OrderReport = () => {
  const [activeContent, setActiveContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('This Year');

 
  const chartData = [
    { name: 'Jan', value: 0 },
    { name: 'Feb', value: 36 },
    { name: 'Mar', value: 0 },
    { name: 'Apr', value: 0 },
    { name: 'May', value: 0 },
    { name: 'Jun', value: 0 },
    { name: 'Jul', value: 0 },
    { name: 'Aug', value: 0 },
    { name: 'Sep', value: 0 },
    { name: 'Oct', value: 0 },
    { name: 'Nov', value: 0 },
    { name: 'Dec', value: 0 }
  ];

  const orderData = [
    { id: '100193', amount: 16.00, discount: 0, coupon: 0, shipping: 0, tax: 0, commission: 0, incentive: 0, status: 'Delivered' },
    { id: '100192', amount: 20.00, discount: 0, coupon: 0, shipping: 0, tax: 0, commission: 0, incentive: 0, status: 'Delivered' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          <div className="space-y-4">
            {/* Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Filter Data</h2>
              <div className="flex gap-4">
                <select
                  className="border rounded-md px-3 py-2 w-48"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option>This Year</option>
                  <option>Last Year</option>
                </select>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  Filter
                </button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Total Orders Card */}
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-gray-600">Total Orders</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-red-500 font-semibold">0</div>
                    <div className="text-sm text-gray-600">Cancelled</div>
                  </div>
                  <div>
                    <div className="text-blue-500 font-semibold">0</div>
                    <div className="text-sm text-gray-600">Ongoing</div>
                  </div>
                  <div>
                    <div className="text-green-500 font-semibold">2</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                </div>
              </div>

              {/* Order Amount Card */}
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">$36.00</div>
                    <div className="text-gray-600">Total Order Amount</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-red-500 font-semibold">$0.00</div>
                    <div className="text-sm text-gray-600">Due Amount</div>
                  </div>
                  <div>
                    <div className="text-green-500 font-semibold">$36.00</div>
                    <div className="text-sm text-gray-600">Already Settled</div>
                  </div>
                </div>
              </div>

              {/* Payment Statistics */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Payment Statistics</h3>
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold">$36.00</div>
                        <div className="text-sm text-gray-600">Completed Payments</div>
                      </div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E7EB" strokeWidth="2" />
                      <circle cx="18" cy="18" r="16" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="100 100" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cash Payments</span>
                    <span className="font-semibold">$36.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Digital Payments</span>
                    <span className="font-semibold">$0.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Statistics Chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Order Statistics</h3>
              <div className="h-64">
                <LineChart width={800} height={240} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#60A5FA" />
                </LineChart>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Total Orders (2)</h3>
                <div className="flex gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by order id"
                      className="border rounded-md pl-10 pr-4 py-2 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">SL</th>
                      <th className="px-4 py-2 text-left">Order ID</th>
                      <th className="px-4 py-2 text-left">Total Amount</th>
                      <th className="px-4 py-2 text-left">Product Discount</th>
                      <th className="px-4 py-2 text-left">Coupon Discount</th>
                      <th className="px-4 py-2 text-left">Shipping Charge</th>
                      <th className="px-4 py-2 text-left">VAT/TAX</th>
                      <th className="px-4 py-2 text-left">Commission</th>
                      <th className="px-4 py-2 text-left">Deliveryman Incentive</th>
                      <th className="px-4 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.map((order, index) => (
                      <tr key={order.id} className="border-t">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{order.id}</td>
                        <td className="px-4 py-2">${order.amount.toFixed(2)}</td>
                        <td className="px-4 py-2">${order.discount.toFixed(2)}</td>
                        <td className="px-4 py-2">${order.coupon.toFixed(2)}</td>
                        <td className="px-4 py-2">${order.shipping.toFixed(2)}</td>
                        <td className="px-4 py-2">${order.tax.toFixed(2)}</td>
                        <td className="px-4 py-2">${order.commission.toFixed(2)}</td>
                        <td className="px-4 py-2">${order.incentive.toFixed(2)}</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {order.status}
                          </span>
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
    </div>
  );
};

export default OrderReport;