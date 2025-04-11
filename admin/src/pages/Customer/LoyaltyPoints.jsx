import React from 'react';
import { Download } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const LoyaltyPoints = () => {

  const [activeContent, setActiveContent] = useState(' ');

  const transactions = [
    {
      id: 1,
      transactionId: 'bfcc9291-6276-4a3f-b287-b484f67d48f5',
      customer: 'David Jack',
      credit: 237,
      debit: 0,
      balance: 989,
      type: 'Order place',
      reference: '100187',
      createdAt: '2024/01/10'
    },
    {
      id: 2,
      transactionId: '89648c99-291a-4674-9ab2-c53c3f153d89',
      customer: 'David Jack',
      credit: 26,
      debit: 0,
      balance: 752,
      type: 'Order place',
      reference: '100188',
      createdAt: '2024/01/10'
    },
    {
      id: 3,
      transactionId: '59855b81-d5af-4437-85b1-b9e7540cb846',
      customer: 'David Jack',
      credit: 24,
      debit: 0,
      balance: 726,
      type: 'Order place',
      reference: '100189',
      createdAt: '2024/01/10'
    },
    {
      id: 4,
      transactionId: '27742f18-db8b-497e-b25a-c23a5c3fba3a',
      customer: 'David Jack',
      credit: 278,
      debit: 0,
      balance: 702,
      type: 'Order place',
      reference: '100190',
      createdAt: '2024/01/10'
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}

          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-4 sm:p-6">
              {/* Header */}
              <h1 className="text-xl font-semibold mb-6">👑 Customer Loyalty Point Report</h1>

              {/* Filter Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-sm font-medium mb-4">Filter Options</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option>All customer</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Filter
                  </button>
                </div>
              </div>

              {/* Summary Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-sm font-medium mb-4">Summary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-4 border rounded-md">
                    <span className="text-blue-600">↓</span>
                    <div>
                      <div className="text-sm text-gray-500">Debit</div>
                      <div className="text-xl font-semibold">116</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-md">
                    <span className="text-orange-600">↑</span>
                    <div>
                      <div className="text-sm text-gray-500">Credit</div>
                      <div className="text-xl font-semibold">1763</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-md">
                    <span className="text-teal-600">=</span>
                    <div>
                      <div className="text-sm text-gray-500">Balance</div>
                      <div className="text-xl font-semibold">1647</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions Section */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Transactions <span className="text-sm text-gray-500">23</span></h2>
                  <button className="flex items-center space-x-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">SL</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Transaction ID</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Credit</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Debit</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Balance</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Transaction Type</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Reference</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 text-sm">{transaction.id}</td>
                          <td className="px-6 py-4 text-sm font-mono">{transaction.transactionId}</td>
                          <td className="px-6 py-4 text-sm">{transaction.customer}</td>
                          <td className="px-6 py-4 text-sm">{transaction.credit}</td>
                          <td className="px-6 py-4 text-sm">{transaction.debit}</td>
                          <td className="px-6 py-4 text-sm">{transaction.balance}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                              {transaction.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">{transaction.reference}</td>
                          <td className="px-6 py-4 text-sm">{transaction.createdAt}</td>
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

export default LoyaltyPoints;