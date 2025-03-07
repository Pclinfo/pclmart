import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const WalletBonusSetup = () => {
  const [activeContent, setActiveContent] = useState(' ');

  const [bonusData, setBonusData] = useState([
    {
      id: 1,
      title: 'Add fund Bonus',
      info: {
        minAmount: '$1,000.00',
        maxBonus: '$5,000.00'
      },
      bonusAmount: '35%',
      startDate: '12 Oct, 2023',
      expiryDate: '26 Nov, 2031',
      status: true
    },
    {
      id: 2,
      title: 'Flat Bonus',
      info: {
        minAmount: '$500.00',
      },
      bonusAmount: '$150.00',
      startDate: '12 Oct, 2023',
      expiryDate: '22 Nov, 2030',
      status: true
    }
  ]);

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
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-semibold">🎁 Wallet Bonus Setup</h1>
                <button className="text-blue-600 hover:text-blue-700">
                  How it works
                </button>
              </div>

              {/* Form Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Bonus Title</label>
                    <input
                      type="text"
                      placeholder="Ex:EID Dhamaka"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Short Description</label>
                    <input
                      type="text"
                      placeholder="Ex:EID Dhamaka"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Bonus Type</label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option>Percentage(%)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Bonus Amount (%)</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Minimum Add Amount ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Maximum Bonus ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">End Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                    Reset
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Submit
                  </button>
                </div>
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 flex justify-between items-center">
                  <h2 className="text-lg font-medium">Wallet Bonus Table <span className="text-sm text-gray-500">2</span></h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by bonus title"
                      className="pl-10 pr-4 py-2 border rounded-md w-64"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">SL</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Bonus Title</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Bonus Info</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Bonus Amount</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Started On</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Expires On</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {bonusData.map((bonus) => (
                        <tr key={bonus.id}>
                          <td className="px-6 py-4 text-sm">{bonus.id}</td>
                          <td className="px-6 py-4 text-sm">{bonus.title}</td>
                          <td className="px-6 py-4 text-sm">
                            <div>Minimum add amount - {bonus.info.minAmount}</div>
                            {bonus.info.maxBonus && <div>Maximum bonus - {bonus.info.maxBonus}</div>}
                          </td>
                          <td className="px-6 py-4 text-sm">{bonus.bonusAmount}</td>
                          <td className="px-6 py-4 text-sm">{bonus.startDate}</td>
                          <td className="px-6 py-4 text-sm">{bonus.expiryDate}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="w-12 h-6 bg-gray-200 rounded-full p-1 cursor-pointer">
                              <div className={`h-4 w-4 rounded-full transition-transform duration-200 transform ${bonus.status ? 'bg-blue-600 translate-x-6' : 'bg-gray-400 translate-x-0'}`} />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex space-x-2">
                              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
      </div>
    </div>
  );
};

export default WalletBonusSetup;