import React, { useState } from 'react';
import { Search, Eye, Trash2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';


const Messages = () => {
  const [activeContent, setActiveContent] = useState(' ');

  const [searchQuery, setSearchQuery] = useState('');

  const messages = [
    {
      id: 1,
      customerName: 'Jack',
      contact: {
        phone: '0********',
        email: 'c********@customer.com'
      },
      subject: 'Some Information',
      time: '12 Oct,2022 07:23 AM',
      replyStatus: 'No'
    },
    {
      id: 2,
      customerName: 'Jhon Doe',
      contact: {
        phone: '0********',
        email: 'j********@gmail.com'
      },
      subject: 'payment system info',
      time: '12 Oct,2022 04:48 AM',
      replyStatus: 'Yes'
    },
    {
      id: 3,
      customerName: 'Lisa',
      contact: {
        phone: '0********',
        email: 'l********@gmail.com'
      },
      subject: 'information for order the digital product',
      time: '12 Oct,2022 04:44 AM',
      replyStatus: 'Yes'
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Header */}
            <div className="flex items-center mb-6">
              <h1 className="text-xl font-semibold flex items-center">
                <span className="bg-orange-100 p-2 rounded-lg mr-2">📝</span>
                Customer Message
              </h1>
              <span className="ml-2 bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">3</span>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by Name or Mobile No"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Search
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                  <span className="mr-2">Filter</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">SL</th>
                    <th className="py-3 px-4 text-left">Customer Name</th>
                    <th className="py-3 px-4 text-left">Contact Info</th>
                    <th className="py-3 px-4 text-left">Subject</th>
                    <th className="py-3 px-4 text-left">Time & Date</th>
                    <th className="py-3 px-4 text-left">Reply Status</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message) => (
                    <tr key={message.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{message.id}</td>
                      <td className="py-3 px-4">{message.customerName}</td>
                      <td className="py-3 px-4">
                        <div>{message.contact.phone}</div>
                        <div className="text-gray-500">{message.contact.email}</div>
                      </td>
                      <td className="py-3 px-4">{message.subject}</td>
                      <td className="py-3 px-4">{message.time}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${message.replyStatus === 'Yes'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}>
                          {message.replyStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-1 text-blue-500 hover:bg-blue-50 rounded">
                            <Eye className="w-5 h-5" />
                          </button>
                          <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                            <Trash2 className="w-5 h-5" />
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

export default Messages;