import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';

const AddNew = () => {
  const [activeTab, setActiveTab] = useState('English');
  const [brandName, setBrandName] = useState('');
  const [imageAltText, setImageAltText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('Brand_name', brandName);
    formData.append('image_alt_name', imageAltText);
    if (imageFile) {
      formData.append('image_filename', imageFile);
    }

    try {
      const response = await axios.post(`${config.apiUrl}/brands`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess(response.data.message);
      handleReset();
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  const handleReset = () => {
    setBrandName('');
    setImageAltText('');
    setImageFile(null);

    if (document.getElementById('imageUpload')) {
      document.getElementById('imageUpload').value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar setActiveContent={() => { }} />
        <div className="flex-1 p-4 md:p-6">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Brand Setup</h1>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Language Tabs */}
              <div className="border-b mb-6">
                <div className="flex flex-wrap -mb-px">
                  <button
                    type="button"
                    className={`mr-4 py-2 px-1 border-b-2 ${activeTab === 'English' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'} font-medium text-sm`}
                    onClick={() => handleTabClick('English')}
                  >
                    English(EN)
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand Name * (EN)
                  </label>
                  <input
                    type="text"
                    id="brandName"
                    placeholder="Ex : LUX"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="imageAltText" className="block text-sm font-medium text-gray-700 mb-1">
                    Image Alt Text
                  </label>
                  <input
                    type="text"
                    id="imageAltText"
                    placeholder="Ex : Apex Brand"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={imageAltText}
                    onChange={(e) => setImageAltText(e.target.value)}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="flex flex-col md:flex-row md:items-start mb-6">
                <div className="md:w-1/2"></div>
                <div className="md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image <span className="text-xs text-gray-500">(Size: 1:1)</span>
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/jpg,image/jpeg,image/png"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="imageUpload"
                    className="border border-gray-300 rounded-md p-4 flex items-center justify-center flex-col w-full md:w-40 h-40 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {imageFile ? imageFile.name : 'Upload Image'}
                    </p>
                  </label>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">Image format : jpg, png, jpeg</p>
                    <p className="text-xs text-gray-500">Image size : Max 2 MB</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;