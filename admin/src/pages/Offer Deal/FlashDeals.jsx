import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';

const FlashDeals = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [selectedLanguage, setSelectedLanguage] = useState('English(EN)');
  const [searchQuery, setSearchQuery] = useState('');
  const [flashDealsData, setFlashDealsData] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    image: null,
    isPublished: false,
    activeProducts: 0,
    status: 'Active'
  });

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [currentDealId, setCurrentDealId] = useState(null);

  const languages = [
    { id: 'en', name: 'English(EN)' },
    { id: 'sa', name: 'Arabic(SA)' },
    { id: 'bd', name: 'Bangla(BD)' },
    { id: 'in', name: 'Hindi(IN)' }
  ];

  // Fetch flash deals data from the API
  const fetchFlashDeals = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/flash-deals`);
      setFlashDealsData(response.data);
      setFilteredDeals(response.data);
    } catch (error) {
      console.error('Error fetching flash deals:', error);
    }
  };

  // Search functionality
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredDeals(flashDealsData);
    } else {
      const filtered = flashDealsData.filter(deal =>
        deal.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDeals(filtered);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Format dates for duration
  const formatDuration = (startDate, endDate) => {
    return `${startDate} - ${endDate}`;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dealData = {
      title: formData.title,
      duration: formatDuration(formData.startDate, formData.endDate),
      status: formData.status,
      activeProducts: formData.activeProducts,
      isPublished: formData.isPublished
    };

    try {
      if (editMode) {
        // Update existing flash deal
        await axios.put(`${config.apiUrl}/flash-deals/${currentDealId}`, dealData);
      } else {
        // Add new flash deal
        await axios.post(`${config.apiUrl}/flash-deals`, dealData);
      }

      // Reset form and fetch updated data
      resetForm();
      fetchFlashDeals();
    } catch (error) {
      console.error('Error saving flash deal:', error);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      startDate: '',
      endDate: '',
      image: null,
      isPublished: false,
      activeProducts: 0,
      status: 'Active'
    });
    setEditMode(false);
    setCurrentDealId(null);
  };

  // Edit flash deal
  const handleEdit = (deal) => {
    // Parse duration to get start and end dates
    const [startDate, endDate] = deal.duration.split('- ');

    setFormData({
      title: deal.title,
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      status: deal.status,
      activeProducts: deal.active_products,
      isPublished: deal.is_published
    });

    setEditMode(true);
    setCurrentDealId(deal.id);
  };

  // Toggle publication status
  const togglePublish = async (deal) => {
    const updatedDeal = {
      ...deal,
      isPublished: !deal.is_published
    };

    try {
      await axios.put(`${config.apiUrl}/flash-deals/${deal.id}`, updatedDeal);
      fetchFlashDeals();
    } catch (error) {
      console.error('Error updating publication status:', error);
    }
  };

  // Delete flash deal
  const handleDelete = async (dealId) => {
    if (window.confirm('Are you sure you want to delete this flash deal?')) {
      try {
        await axios.delete(`${config.apiUrl}/flash-deals/${dealId}`);
        fetchFlashDeals();
      } catch (error) {
        console.error('Error deleting flash deal:', error);
      }
    }
  };

  // Add product to flash deal (placeholder function)
  const handleAddProduct = (dealId) => {
    // This would typically open a modal or redirect to a product selection page
    console.log(`Add product to deal ${dealId}`);
  };

  // Load data on component mount
  useEffect(() => {
    fetchFlashDeals();
  }, []);

  // Update filtered deals when search query changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-yellow-500">⚡</span>
                  Flash Deals
                </h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Product priority Setup
                </button>
              </div>

              {/* Language Tabs */}
              <div className="mb-8">
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px space-x-8">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        className={`py-2 px-1 border-b-2 text-sm font-medium ${selectedLanguage === lang.name
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        onClick={() => setSelectedLanguage(lang.name)}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title ({selectedLanguage.split('(')[1].split(')')[0]})
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Ex: Summer Flash Sale"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Upload Image ( Ratio 5:1 )</p>
                    <input
                      type="file"
                      className="hidden"
                      id="imageUpload"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    />
                    <label
                      htmlFor="imageUpload"
                      className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mb-8">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm"
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
                  >
                    {editMode ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>

              {/* Table Section */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">Flash Deal Table</h2>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm">{filteredDeals.length}</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Search by Title"
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Products</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publish</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDeals.map((deal, index) => (
                        <tr key={deal.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deal.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deal.duration}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${deal.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                              {deal.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deal.active_products}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button
                                onClick={() => togglePublish(deal)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${deal.is_published ? 'bg-blue-500' : 'bg-gray-200'
                                  }`}
                              >
                                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${deal.is_published ? 'translate-x-5' : 'translate-x-0'
                                  }`} />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                              <button
                                className="text-blue-500 border border-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-50"
                                onClick={() => handleAddProduct(deal.id)}
                              >
                                + Add Product
                              </button>
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => handleEdit(deal)}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDelete(deal.id)}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
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
    </div>
  );
};

export default FlashDeals;