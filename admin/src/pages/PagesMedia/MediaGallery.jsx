import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const MediaGallery = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [folders, setFolders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchFileStructure();
  }, []);

  const fetchFileStructure = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/uploads/media`);


      const processedFolders = response.data
        .filter(item => item.folder !== '')
        .map((folder, index) => ({
          id: index + 1,
          name: folder.folder,
          count: folder.files ? folder.files.length : 0
        }));

      setFolders(processedFolders);
    } catch (error) {
      console.error('Error fetching file structure:', error);
      alert('Failed to fetch file structure');
    }
  };

  const handleFolderSelect = async (folderName) => {
    try {
      const response = await axios.get(`${config.apiUrl}/uploads/media/${folderName}`);

      if (response.data && response.data.length > 0) {

        localStorage.setItem('selectedFolderName', folderName);
        localStorage.setItem('selectedFolderFiles', JSON.stringify(response.data));
        navigate('/pagesmedia/file-view');
      } else {
        alert(`No files found in folder: ${folderName}`);
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      alert(`Failed to fetch files for folder: ${folderName}`);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file && selectedFolder) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', selectedFolder);

      try {
        await axios.post(`${config.apiUrl}/uploads/media`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Refresh the file structure after upload
        fetchFileStructure();
        event.target.value = null;
        alert('File uploaded successfully');
      } catch (error) {
        console.error('File upload error:', error);
        alert('File upload failed');
      }
    }
  };

  // Rest of the component remains the same as in the original code
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="max-w-7xl mx-auto p-4 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">📁</span>
                <h1 className="text-xl font-semibold">File Manager</h1>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  className="mr-2 p-2 border rounded"
                >
                  <option value="">Select Folder</option>
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.name}>
                      {folder.name}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={!selectedFolder}
                />
                <label
                  htmlFor="file-upload"
                  className={`px-4 py-2 rounded-md flex items-center gap-2 ${selectedFolder
                    ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  <span>+</span>
                  Add New
                </label>
              </div>
            </div>

            {/* Folders Section */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-blue-600 font-medium mb-4 border-b-2 border-blue-600 inline-block">
                  Local storage
                </h2>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-medium">Public</h3>
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded-full">
                    {folders.reduce((total, folder) => total + folder.count, 0)}
                  </span>
                </div>

                {/* Grid of Folders */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {folders.map((folder) => (
                    <div
                      key={folder.id}
                      onClick={() => handleFolderSelect(folder.name)}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center gap-2"
                    >
                      <svg
                        className="w-16 h-16 text-orange-400"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10z" />
                      </svg>
                      <span className="text-sm text-center break-all">
                        {folder.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {folder.count} files
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;