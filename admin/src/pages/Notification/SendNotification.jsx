import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const SendNotification = () => {
  const [activeContent, setActiveContent] = useState(' ');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    fetchNotifications();
  }, []);


  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/get_notifications`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      alert('Failed to fetch notifications');
    }
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleReset = () => {
    setTitle('');
    setDescription('');
    setImage(null);
  };


  const handleSendNotification = async () => {
    if (!title || !description) {
      alert('Please fill in title and description');
      return;
    }

    try {
      const response = await axios.post(`${config.apiUrl}/add_notifications`, {
        title,
        description,
        image: image || ''
      });


      handleReset();
      fetchNotifications();
      alert('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };


  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`${config.apiUrl}/edit_notifications/${id}`, {
        status: !currentStatus
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error updating notification status:', error);
      alert('Failed to update notification status');
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/del_notifications/${id}`);
      fetchNotifications();
      alert('Notification deleted successfully');
    } catch (error) {
      console.error('Error deleting notification:', error);
      alert('Failed to delete notification');
    }
  };


  const handleSearch = () => {

    const filteredNotifications = notifications.filter(notification =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setNotifications(filteredNotifications);
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
                    Image (Ratio 1:1)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <div className="bg-gray-100 w-full h-40 mb-4 rounded flex items-center justify-center">
                      {image ? (
                        <img
                          src={image}
                          alt="Uploaded"
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-white border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Choose File
                    </label>
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
                  <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-sm">
                    {notifications.length}
                  </span>
                </h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
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
                    {notifications.map((notification, index) => (
                      <tr key={notification.id} className="border-b">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{notification.title}</td>
                        <td className="p-3">{notification.description}</td>
                        <td className="p-3">
                          {notification.image && (
                            <img
                              src={notification.image}
                              alt="Notification"
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                        </td>
                        <td className="p-3">{notification.count || 0}</td>
                        <td className="p-3">
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                              type="checkbox"
                              checked={notification.status}
                              onChange={() => handleToggleStatus(notification.id, notification.status)}
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                          </div>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              // Logic for resending notification could be added here
                              alert('Resend functionality to be implemented');
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            🔄
                          </button>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                // Logic for editing notification could be added here
                                alert('Edit functionality to be implemented');
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
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