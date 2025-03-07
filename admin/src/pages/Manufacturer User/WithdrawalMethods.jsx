import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';


const WithdrawalMethods = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeContent, setActiveContent] = useState(' ');

  const methods = [
    {
      id: 1,
      name: 'Bank',
      fields: [
        { name: 'Account number', type: 'string', placeholder: '1234 5667 8976', isRequired: true }
      ],
      isActive: true,
      isDefault: false
    },
    {
      id: 2,
      name: 'bkash',
      fields: [
        { name: 'Mobile number', type: 'number', placeholder: '+8********', isRequired: true }
      ],
      isActive: true,
      isDefault: false
    },
    {
      id: 3,
      name: 'VISA Card',
      fields: [
        { name: 'Name', type: 'string', placeholder: 'Jhon Doe', isRequired: true },
        { name: 'Card number', type: 'string', placeholder: '1234 5678 9876', isRequired: true }
      ],
      isActive: true,
      isDefault: true
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="p-4 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">Withdraw Method List</h1>
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  {methods.length}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0">
                  <input
                    type="text"
                    placeholder="Search Method Name"
                    className="w-full md:w-64 px-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded">
                    Search
                  </button>
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg whitespace-nowrap">
                  + Add method
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left font-medium text-gray-600">SL</th>
                    <th className="p-4 text-left font-medium text-gray-600">Method Name</th>
                    <th className="p-4 text-left font-medium text-gray-600">Method Fields</th>
                    <th className="p-4 text-left font-medium text-gray-600">Active Status</th>
                    <th className="p-4 text-left font-medium text-gray-600">Default Method</th>
                    <th className="p-4 text-left font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {methods.map((method) => (
                    <tr key={method.id} className="border-b">
                      <td className="p-4">{method.id}</td>
                      <td className="p-4">{method.name}</td>
                      <td className="p-4">
                        <div className="space-y-2">
                          {method.fields.map((field, index) => (
                            <div
                              key={index}
                              className="bg-emerald-400 text-white p-2 rounded text-sm"
                            >
                              Name: {field.name} | Type: {field.type} | Placeholder: {field.placeholder} | Is Required: {field.isRequired ? 'Yes' : 'No'}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                          <div className={`w-6 h-6 rounded-full absolute transition-all ${method.isActive ? 'bg-blue-600 right-0' : 'bg-gray-400 left-0'}`} />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                          <div className={`w-6 h-6 rounded-full absolute transition-all ${method.isDefault ? 'bg-blue-600 right-0' : 'bg-gray-400 left-0'}`} />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          {method.id !== 3 && (
                            <button className="text-red-600 hover:text-red-800">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          )}
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

export default WithdrawalMethods;