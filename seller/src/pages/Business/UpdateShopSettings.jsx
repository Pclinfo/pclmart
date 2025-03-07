import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const UpdateShopSettings = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [formData, setFormData] = useState({
    shopName: '',
    contact: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-semibold">Edit Shop Info</h1>
              <button 
                onClick={() => window.history.back()} 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Back
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {/* Shop Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Shop Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.shopName}
                    onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm font-medium mb-2">Contact</label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <select className="bg-transparent border-0 text-sm text-gray-500 focus:ring-0">
                        <option>+1</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      value={formData.contact}
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      className="flex-1 p-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Image</label>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <input
                        type="text"
                        placeholder="Choose File"
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                        readOnly
                      />
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Browse
                    </button>
                  </div>
                </div>

                {/* Banner Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Banner Ratio 4:1 (2000 x 500 px)
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <input
                        type="text"
                        placeholder="Choose File"
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                        readOnly
                      />
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Browse
                    </button>
                  </div>
                </div>

                {/* Preview Image */}
                <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/api/placeholder/400/128"
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          {activeContent}
        </div>
      </div>
    </div>
  );
};

export default UpdateShopSettings;