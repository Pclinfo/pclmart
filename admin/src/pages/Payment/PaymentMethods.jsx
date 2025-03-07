import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';


const PaymentMethods = () => {
  const [activeTab, setActiveTab] = useState('digital');
  const [activeStatus, setActiveStatus] = useState('all');
  const [mercadopagoEnabled, setMercadopagoEnabled] = useState(true);
  const [liqpayEnabled, setLiqpayEnabled] = useState(false);
  const [activeContent, setActiveContent] = useState(' ');

  const offlinePaymentMethods = [
    {
      id: 1,
      name: 'MFTS',
      paymentInfo: 'Service Name : Mobile Banking',
      requiredInfo: ['Mobile Number', 'Reference', 'Date'],
      status: true
    },
    {
      id: 2,
      name: 'Bank Payment',
      paymentInfo: 'Bank Name : EX: Bank XYZ',
      requiredInfo: ['Account Number', 'Amount', 'Reference'],
      status: true
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
            <div className="p-4 lg:p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">🏢</span>
                <h1 className="text-xl font-semibold">Payment Methods</h1>
              </div>

              {/* Payment Method Tabs */}
              <div className="mb-6">
                <nav className="flex gap-4 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('digital')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors
                ${activeTab === 'digital'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Digital Payment Methods
                  </button>
                  <button
                    onClick={() => setActiveTab('offline')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors
                ${activeTab === 'offline'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    Offline Payment Methods
                  </button>
                </nav>
              </div>

              {activeTab === 'digital' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mercadopago Section */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="font-medium">MERCADOPAGO</h2>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={mercadopagoEnabled}
                          onChange={() => setMercadopagoEnabled(!mercadopagoEnabled)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Live</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Access Token *</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Public Key *</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Payment Gateway Title *</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="Mercadopago" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Choose Logo</label>
                        <input type="file" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div className="flex justify-end">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Liqpay Section */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="font-medium">LIQPAY</h2>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={liqpayEnabled}
                          onChange={() => setLiqpayEnabled(!liqpayEnabled)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Live</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Private Key *</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Public Key *</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Payment Gateway Title *</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" defaultValue="Liqpay" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Choose Logo</label>
                        <input type="file" className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div className="flex justify-end">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm">
                  {/* Status Tabs */}
                  <div className="p-4 border-b border-gray-200">
                    <nav className="flex gap-4">
                      {['All', 'Active', 'Inactive'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setActiveStatus(status.toLowerCase())}
                          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
                      ${activeStatus === status.toLowerCase()
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          {status}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Search and Add New */}
                  <div className="p-4 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        placeholder="Search by payment method name"
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                      />
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Search
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      + Add New Method
                    </button>
                  </div>

                  {/* Payment Methods Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">SL</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Payment Method Name</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Payment Info</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Required Info From Customer</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {offlinePaymentMethods.map((method) => (
                          <tr key={method.id}>
                            <td className="px-4 py-3 text-sm text-gray-600">{method.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{method.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{method.paymentInfo}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {method.requiredInfo.join(', ')}
                            </td>
                            <td className="px-4 py-3">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={method.status}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button className="p-1 text-blue-500 hover:text-blue-600">
                                  <span className="text-lg">✏️</span>
                                </button>
                                <button className="p-1 text-red-500 hover:text-red-600">
                                  <span className="text-lg">🗑️</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;