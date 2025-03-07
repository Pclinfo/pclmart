import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Withdraws = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeContent, setActiveContent] = useState(' ');

  const withdrawData = [
    { id: 1, amount: 500.00, name: 'Not found', requestTime: '2022-11-20 01:41:01', status: 'Pending' },
    { id: 2, amount: 4000.00, name: 'Not found', requestTime: '2022-11-20 01:40:43', status: 'Approved' },
    { id: 3, amount: 500.00, name: 'kamrujjaman joy', requestTime: '2022-10-12 08:39:01', status: 'Denied' },
    { id: 4, amount: 600.00, name: 'kamrujjaman joy', requestTime: '2022-10-12 07:01:17', status: 'Approved' },
    { id: 5, amount: 500.00, name: 'kamrujjaman joy', requestTime: '2022-10-12 07:01:09', status: 'Pending' },
    { id: 6, amount: 1000.00, name: 'Hanover Electronics', requestTime: '2022-10-12 06:42:09', status: 'Approved' },
    { id: 7, amount: 500.00, name: 'Hanover Electronics', requestTime: '2022-10-12 06:41:57', status: 'Pending' },
    { id: 8, amount: 92.00, name: 'fatema subarna', requestTime: '2022-04-24 02:21:04', status: 'Pending' },
    { id: 9, amount: 5067.30, name: 'fatema subarna', requestTime: '2022-04-19 05:37:05', status: 'Denied' }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-blue-100 text-blue-600';
      case 'Approved':
        return 'bg-green-100 text-green-600';
      case 'Denied':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold">Withdraw Request Table</h1>
                <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-md">12</span>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <select
                  className="border rounded-md px-3 py-1.5 text-gray-600 min-w-[120px]"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Denied">Denied</option>
                </select>

                <button className="flex items-center gap-2 px-4 py-1.5 border rounded-md text-green-600 hover:bg-green-50">
                  <span className="w-4 h-4">📊</span>
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">SL</th>
                    <th className="text-left py-3 px-4 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Request Time</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">${item.amount.toFixed(2)}</td>
                      <td className="py-3 px-4">{item.name}</td>
                      <td className="py-3 px-4">{item.requestTime}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {item.name === 'Not found' ? (
                          <span className="text-blue-500">Action disabled</span>
                        ) : (
                          <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600">
                            <Eye size={18} />
                          </button>
                        )}
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

export default Withdraws;