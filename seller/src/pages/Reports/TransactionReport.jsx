import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Search, Download, FileText } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const TransactionReport = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [filterYear, setFilterYear] = useState('This Year');
  const [filterCustomer, setFilterCustomer] = useState('All customer');
  const [filterAll, setFilterAll] = useState('All');
  const [activeContent, setActiveContent] = useState(' ');

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    value: 0
  }));

  const statsCards = {
    orders: [
      { icon: "🛒", title: "Total Products", value: "20", subtitle: "" },
      { icon: "📦", title: "Active Products", value: "19", subtitle: "" },
      { icon: "⏸️", title: "Inactive Products", value: "1", subtitle: "" },
      { icon: "⌛", title: "Pending Products", value: "0", subtitle: "" }
    ],
    expenses: [
      { icon: "💰", title: "Total Expense", value: "$0.00", subtitle: "" },
      { icon: "🚚", title: "Free Delivery", value: "$0.00", subtitle: "" },
      { icon: "🎫", title: "Coupon Discount", value: "$0.00", subtitle: "" }
    ]
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">📊</span>
                  <h1 className="text-xl font-semibold">Transaction Report</h1>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex gap-1">
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`px-4 py-2 text-sm font-medium transition-colors
                  ${activeTab === 'orders'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Order Transactions
                    </button>
                    <button
                      onClick={() => setActiveTab('expenses')}
                      className={`px-4 py-2 text-sm font-medium transition-colors
                  ${activeTab === 'expenses'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Expense Transactions
                    </button>
                  </nav>
                </div>
              </div>

              {/* Filter Section */}
              <div className="mb-6">
                <h2 className="text-sm font-medium mb-2">Filter Data</h2>
                <div className="flex flex-wrap gap-4">
                  {activeTab === 'orders' && (
                    <>
                      <select
                        value={filterAll}
                        onChange={(e) => setFilterAll(e.target.value)}
                        className="px-4 py-2 border rounded-md min-w-[200px]"
                      >
                        <option>All</option>
                      </select>
                      <select
                        value={filterCustomer}
                        onChange={(e) => setFilterCustomer(e.target.value)}
                        className="px-4 py-2 border rounded-md min-w-[200px]"
                      >
                        <option>All customer</option>
                      </select>
                    </>
                  )}
                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="px-4 py-2 border rounded-md min-w-[200px]"
                  >
                    <option>This Year</option>
                  </select>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-md">
                    Filter
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statsCards[activeTab].map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <div>
                        <p className="text-3xl font-semibold">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">
                    {activeTab === 'orders' ? 'Order Statistics' : 'Expense Statistics'}
                  </h3>
                  <LineChart width={800} height={300} data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#2563eb" />
                  </LineChart>
                </div>

                {activeTab === 'orders' && (
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Payment Statistics</h3>
                    <div className="space-y-4">
                      <p className="text-2xl font-semibold">$0.00</p>
                      <p className="text-sm text-gray-600">Completed payments</p>
                      <div className="space-y-2">
                        <p className="text-sm">Cash payments ($0.00)</p>
                        <p className="text-sm">Digital payments ($0.00)</p>
                        <p className="text-sm">Wallet ($0.00)</p>
                        <p className="text-sm">Offline payments ($0.00)</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Total Transactions</h3>
                  <div className="flex gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search by orders id or tran"
                        className="pl-10 pr-4 py-2 border rounded-md"
                      />
                      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                    <button className="px-4 py-2 border rounded-md flex items-center gap-2">
                      <Download size={20} />
                      Download PDF
                    </button>
                    <button className="px-4 py-2 border rounded-md flex items-center gap-2">
                      <FileText size={20} />
                      Export
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        {activeTab === 'orders' ? (
                          <>
                            <th className="p-3 text-left">SL</th>
                            <th className="p-3 text-left">Order Id</th>
                            <th className="p-3 text-left">Customer Name</th>
                            <th className="p-3 text-left">Total Product Amount</th>
                            <th className="p-3 text-left">Product Discount</th>
                            <th className="p-3 text-left">Coupon Discount</th>
                            <th className="p-3 text-left">VAT/TAX</th>
                            <th className="p-3 text-left">Shipping Charge</th>
                            <th className="p-3 text-left">Order Amount</th>
                          </>
                        ) : (
                          <>
                            <th className="p-3 text-left">SL</th>
                            <th className="p-3 text-left">XID</th>
                            <th className="p-3 text-left">Transaction Date</th>
                            <th className="p-3 text-left">Order ID</th>
                            <th className="p-3 text-left">Expense Amount</th>
                            <th className="p-3 text-left">Expense Type</th>
                            <th className="p-3 text-left">Action</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={activeTab === 'orders' ? 9 : 7} className="p-8 text-center text-gray-500">
                          <div className="flex flex-col items-center">
                            <img src="/api/placeholder/100/100" alt="No data" className="mb-4" />
                            No data found
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionReport;