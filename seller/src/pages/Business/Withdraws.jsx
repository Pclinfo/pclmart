import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Withdraws = () => {
  const [activeContent, setActiveContent] = useState('');
  const [filter, setFilter] = useState('All');


  const withdrawRequests = [
    { id: 1, amount: 500.00, requestTime: 'October 12th, 2022', status: 'Denied' },
    { id: 2, amount: 600.00, requestTime: 'October 12th, 2022', status: 'Approved' },
    { id: 3, amount: 500.00, requestTime: 'October 12th, 2022', status: 'Pending' }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="flex items-center mb-4 md:mb-0">
                  <h2 className="text-xl font-semibold">Withdraw Request Table</h2>
                  <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-sm">3</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    className="px-4 py-2 border rounded-md bg-white"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Approved">Approved</option>
                    <option value="Denied">Denied</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">SL</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Request Time</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {withdrawRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{request.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">${request.amount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{request.requestTime}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                            Close
                          </button>
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

export default Withdraws;