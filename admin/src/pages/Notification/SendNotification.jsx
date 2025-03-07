import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const SendNotification = () => {

  const [activeContent, setActiveContent] = useState(' ');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Coupon',
      description: 'From 2024, Use Code "pcuw655ytg" to get...',
      image: '📊',
      count: 1,
      status: true
    },
    {
      id: 2,
      title: 'Buy 2 get 1',
      description: 'Buy any 2 products then get any product',
      image: '👟',
      count: 2,
      status: true
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleImageUpload = (e) => {
    // Handle image upload logic here
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
  };

  const handleSendNotification = () => {
    // Handle send notification logic here
  };

  return (
    <div>
      <Navbar />
      <div className='flex'>
        <Sidebar setActiveContent={setActiveContent} />
        <div className='flex-1 p-4'>
          {activeContent}
          <div className="w-full max-w-6xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-2">📱</span>
                Send Notification
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="New notification"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image (Ratio1:1)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <div className="bg-gray-100 w-full h-40 mb-4 rounded flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <button className="bg-white border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-50">
                      Choose File
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Reset
                </button>
                <button
                  onClick={handleSendNotification}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Send Notification
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold flex items-center">
                  Push Notification Table
                  <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-sm">2</span>
                </h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Search
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">SL</th>
                      <th className="text-left p-3">Title</th>
                      <th className="text-left p-3">Description</th>
                      <th className="text-left p-3">Image</th>
                      <th className="text-left p-3">Notification Count</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Resend</th>
                      <th className="text-left p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((notification) => (
                      <tr key={notification.id} className="border-b">
                        <td className="p-3">{notification.id}</td>
                        <td className="p-3">{notification.title}</td>
                        <td className="p-3">{notification.description}</td>
                        <td className="p-3">{notification.image}</td>
                        <td className="p-3">{notification.count}</td>
                        <td className="p-3">
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                              type="checkbox"
                              checked={notification.status}
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                          </div>
                        </td>
                        <td className="p-3">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            🔄
                          </button>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                              ✏️
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                              🗑️
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
  );
};

export default SendNotification;