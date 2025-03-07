import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios'; // Make sure axios is installed
import config from '../../config';


const FeatureDeal = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [selectedLanguage, setSelectedLanguage] = useState('English(EN)');
  const [searchQuery, setSearchQuery] = useState('');
  const [featureDeals, setFeatureDeals] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    status: 'Active',
    is_active: true
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const languages = [
    { id: 'en', name: 'English(EN)' },
    { id: 'sa', name: 'Arabic(SA)' },
    { id: 'bd', name: 'Bangla(BD)' },
    { id: 'in', name: 'Hindi(IN)' }
  ];

  // Fetch all feature deals
  const fetchFeatureDeals = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/feature_deal`);
      setFeatureDeals(response.data);
    } catch (error) {
      console.error('Error fetching feature deals:', error);
    }
  };

  useEffect(() => {
    fetchFeatureDeals();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        // Update existing feature deal
        await axios.put(`${config.apiUrl}/feature_deal/${editId}`, formData);
      } else {
        // Add new feature deal
        await axios.post(`${config.apiUrl}/feature_deal`, formData);
      }

      // Reset form and fetch updated data
      resetForm();
      fetchFeatureDeals();
    } catch (error) {
      console.error('Error saving feature deal:', error);
    }
  };

  // Reset form to default values
  const resetForm = () => {
    setFormData({
      title: '',
      start_date: '',
      end_date: '',
      status: 'Active',
      is_active: true
    });
    setEditMode(false);
    setEditId(null);
  };

  // Edit feature deal
  const handleEdit = (deal) => {
    setFormData({
      title: deal.title,
      start_date: deal.start_date,
      end_date: deal.end_date,
      status: deal.status,
      is_active: deal.is_active
    });
    setEditMode(true);
    setEditId(deal.id);
  };

  // Toggle feature deal status
  const toggleStatus = async (id, currentStatus) => {
    try {
      const dealToUpdate = featureDeals.find(deal => deal.id === id);
      if (dealToUpdate) {
        const updatedDeal = {
          ...dealToUpdate,
          is_active: !dealToUpdate.is_active,
          status: !dealToUpdate.is_active ? 'Active' : 'Expired'
        };

        await axios.put(`${config.apiUrl}/feature_deal/${id}`, updatedDeal);
        fetchFeatureDeals();
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  // Delete feature deal
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feature deal?')) {
      try {
        await axios.delete(`${config.apiUrl}/feature_deal/${id}`);
        fetchFeatureDeals();
      } catch (error) {
        console.error('Error deleting feature deal:', error);
      }
    }
  };

  // Filter feature deals based on search query
  const filteredDeals = featureDeals.filter(deal =>
    deal && deal.title ? deal.title.toLowerCase().includes(searchQuery.toLowerCase()) : false
  );

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
                  <span className="text-yellow-500">⭐</span>
                  Feature Deal
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
              <form onSubmit={handleSubmit} className="mb-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title (EN)
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Ex: LUX"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="text"
                        name="start_date"
                        placeholder="dd-mm-yyyy"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        name="end_date"
                        placeholder="dd-mm-yyyy"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-6">
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
                <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium">Feature Deal Table</h2>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm">
                      {featureDeals.length}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Search by title"
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active / Expired</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDeals.map((deal, index) => (
                        <tr key={deal.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deal.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deal.start_date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deal.end_date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${deal.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                              }`}>
                              {deal.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button
                                onClick={() => toggleStatus(deal.id, deal.is_active)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${deal.is_active ? 'bg-blue-500' : 'bg-gray-200'
                                  }`}
                              >
                                <span
                                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${deal.is_active ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex gap-2">
                              <button className="text-blue-500 border border-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-50">
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

export default FeatureDeal;