import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Wallet = () => {
  const [activeContent, setActiveContent] = useState(' ');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState('All customer');

  const transactions = [
    {
      id: '05f4fb07-e72a-48e4-825c-2aa2b14e1b5a',
      customer: 'Devid Jack',
      credit: 500.00,
      extraCredit: 150.00,
      debit: 0.00,
      balance: 1725.00,
      type: 'Add fund',
      reference: 'Add funds to wallet',
      createdAt: '2023/10/12'
    },
    {
      id: '77c643a6-09de-4190-98b5-2875e3be8c4f',
      customer: 'Devid Jack',
      credit: 200.00,
      debit: 0.00,
      balance: 1225.00,
      type: 'Add fund',
      reference: 'Add funds to wallet',
      createdAt: '2023/10/12'
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💰</span>
                  <h1 className="text-xl font-semibold">Wallet</h1>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Add Fund
                </button>
              </div>

              {/* Filter Section */}
              <div className="bg-white rounded-lg p-4 mb-6">
                <h2 className="text-lg font-medium mb-4">Filter Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <select
                    className="w-full p-2 border rounded-md"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                  </select>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                  >
                    <option value="All customer">All customer</option>
                  </select>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Filter
                  </button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="bg-white rounded-lg p-4 mb-6">
                <h2 className="text-lg font-medium mb-4">Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Debit</span>
                      <span className="text-blue-600 font-semibold">$7,335.00</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Credit</span>
                      <span className="text-orange-500 font-semibold">$64,739.00</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Balance</span>
                      <span className="text-green-600 font-semibold">$57,404.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">Transactions</h2>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">14</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                    <span>Export</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SL</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credit</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Debit</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction, index) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{transaction.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${transaction.credit.toFixed(2)}
                            {transaction.extraCredit && (
                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                                +${transaction.extraCredit} admin bonus
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">${transaction.debit.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${transaction.balance.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                              {transaction.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{transaction.reference}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{transaction.createdAt}</td>
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
    </div>
  );
};

export default Wallet;