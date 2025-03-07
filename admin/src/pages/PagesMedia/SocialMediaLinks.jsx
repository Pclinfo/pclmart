import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';

const SocialMediaLinks = () => {
  const [socialMediaLink, setSocialMediaLink] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [activeContent, setActiveContent] = useState(' ');
  const [socialMediaData, setSocialMediaData] = useState([
    { id: 1, name: 'facebook', link: '', status: true },
    { id: 2, name: 'instagram', link: '', status: true },
    { id: 3, name: 'pinterest', link: '', status: true },
    { id: 4, name: 'X', link: '', status: true },
    { id: 5, name: 'linkedin', link: '', status: true },
    { id: 6, name: 'whatsapp', link: '', status: true }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Load initial social media data
  useEffect(() => {

  }, []);

  const handleSave = async () => {
    if (!selectedPlatform || !socialMediaLink) {
      setError('Please select a platform and enter a link');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create a payload where only the selected platform has a value
      const payload = {};
      payload[selectedPlatform.toLowerCase()] = socialMediaLink;

      // Send the request to the backend
      const response = await axios.post(`${config.apiUrl}/social_media`, payload);

      // Update the local state with the new data
      setSocialMediaData(prevData =>
        prevData.map(item =>
          item.name.toLowerCase() === selectedPlatform.toLowerCase()
            ? { ...item, link: socialMediaLink }
            : item
        )
      );

      // Show success message
      setSuccessMessage(`${selectedPlatform} updated successfully`);
      setTimeout(() => setSuccessMessage(''), 3000);

      // Reset form
      setSocialMediaLink('');
      setSelectedPlatform('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update social media link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen">
            <div className="container mx-auto px-4">
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-blue-600 text-xl">🌐</span>
                <h1 className="text-xl font-semibold">Social Media</h1>
              </div>

              {/* Form Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <h2 className="text-lg font-medium mb-4">Social media form</h2>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMessage}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedPlatform}
                      onChange={(e) => setSelectedPlatform(e.target.value)}
                    >
                      <option value="">--Select--</option>
                      {socialMediaData.map(platform => (
                        <option key={platform.id} value={platform.name}>
                          {platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Social Media Link</label>
                    <input
                      type="text"
                      placeholder="Enter Social Media Link"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={socialMediaLink}
                      onChange={(e) => setSocialMediaLink(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                    >
                      {isLoading ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm overflow-x-auto">
                <h2 className="text-lg font-medium mb-4">Social media table</h2>

                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">SI</th>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Link</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {socialMediaData.map((platform) => (
                      <tr key={platform.id} className="border-b">
                        <td className="p-3">{platform.id}</td>
                        <td className="p-3">{platform.name.charAt(0).toUpperCase() + platform.name.slice(1)}</td>
                        <td className="p-3 text-blue-600">{platform.link || "-"}</td>
                        <td className="p-3">
                          <div className={`w-12 h-6 ${platform.status ? 'bg-blue-600' : 'bg-gray-300'} rounded-full p-1 cursor-pointer`}>
                            <div className={`bg-white w-4 h-4 rounded-full ${platform.status ? 'ml-auto' : ''}`}></div>
                          </div>
                        </td>
                        <td className="p-3">
                          <button
                            className="p-1 border border-blue-600 rounded hover:bg-blue-50"
                            onClick={() => {
                              setSelectedPlatform(platform.name);
                              setSocialMediaLink(platform.link);
                            }}
                          >
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
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

export default SocialMediaLinks;