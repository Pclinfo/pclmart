import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const Post = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [status, setStatus] = useState('inactive');
  const [backgroundColor, setBackgroundColor] = useState('#ebebeb');
  const [textColor, setTextColor] = useState('#000000');
  const [announcementText, setAnnouncementText] = useState(
    'Get 50% discount for specific products from June 2024 to December2024.'
  );
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchAnnouncements();
  }, []);


  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/get_announcement`);
      setAnnouncements(response.data);
    } catch (err) {
      setError('Failed to fetch announcements');
      console.error(err);
    }
  };


  const handleSubmit = async () => {
    try {
      const announcementData = {
        status,
        backgroundColor,
        textColor,
        announcementText
      };

      if (editingId) {

        await axios.put(`${config.apiUrl}/edit_announcement/${editingId}`, announcementData);
      } else {

        await axios.post(`${config.apiUrl}/create_announcement`, announcementData);
      }

      fetchAnnouncements();


      resetForm();
    } catch (err) {
      setError('Failed to save announcement');
      console.error(err);
    }
  };


  const handleEdit = (announcement) => {
    setEditingId(announcement.id);
    setStatus(announcement.status);
    setBackgroundColor(announcement.backgroundColor);
    setTextColor(announcement.textColor);
    setAnnouncementText(announcement.announcementText);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/delete_announcement/${id}`);
      fetchAnnouncements();
    } catch (err) {
      setError('Failed to delete announcement');
      console.error(err);
    }
  };


  const resetForm = () => {
    setStatus('inactive');
    setBackgroundColor('#ebebeb');
    setTextColor('#000000');
    setAnnouncementText('Get 50% discount for specific products from June 2024 to December2024.');
    setEditingId(null);
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-sm">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                {error}
              </div>
            )}

            <h2 className="text-xl font-semibold mb-6">
              {editingId ? 'Edit Announcement' : 'Create Announcement'}
            </h2>

            <div className="mb-8">
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio w-4 h-4"
                      checked={status === 'active'}
                      onChange={() => setStatus('active')}
                    />
                    <span className="ml-2">Active</span>
                  </label>

                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio w-4 h-4"
                      checked={status === 'inactive'}
                      onChange={() => setStatus('inactive')}
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block mb-2 font-medium">Background Color</label>
                <div className="flex items-center space-x-4">
                  <div
                    className="w-16 h-16 border border-gray-300 rounded cursor-pointer"
                    style={{ backgroundColor }}
                    onClick={() => document.getElementById('bgColorPicker').click()}
                  />
                  <input
                    id="bgColorPicker"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-sm font-mono">{backgroundColor}</span>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">Text Color</label>
                <div className="flex items-center space-x-4">
                  <div
                    className="w-16 h-16 border border-gray-300 rounded cursor-pointer"
                    style={{ backgroundColor: textColor }}
                    onClick={() => document.getElementById('textColorPicker').click()}
                  />
                  <input
                    id="textColorPicker"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-sm font-mono">{textColor}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block mb-2 font-medium">Text</label>
              <textarea
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-4">
              {editingId && (
                <button
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {editingId ? 'Update' : 'Publish'}
              </button>
            </div>

            {/* Existing Announcements List */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Existing Announcements</h3>
              {announcements.length === 0 ? (
                <p className="text-gray-500">No announcements found.</p>
              ) : (
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border rounded-lg p-4 flex justify-between items-center"
                      style={{
                        backgroundColor: announcement.backgroundColor,
                        color: announcement.textColor
                      }}
                    >
                      <div>
                        <p className="font-medium">{announcement.announcementText}</p>
                        <p className="text-sm">Status: {announcement.status}</p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleEdit(announcement)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(announcement.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;