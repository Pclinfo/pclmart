import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios'; 
import config from '../../config';

const DealsOfTheDay = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [activeLanguage, setActiveLanguage] = useState('English(EN)');
  const [searchQuery, setSearchQuery] = useState('');
  const [deals, setDeals] = useState([]);
  const [products, setProducts] = useState([]); 
  const [formData, setFormData] = useState({
    title: '',
    product: '',
    status: true
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const languages = [
    { id: 'en', name: 'English(EN)' },
    { id: 'sa', name: 'Arabic(SA)' },
    { id: 'bd', name: 'Bangla(BD)' },
    { id: 'in', name: 'Hindi(IN)' }
  ];


  const fetchDeals = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/day_deals`);
      if (response.data.success) {
        setDeals(response.data.deals);
      } else {
        console.error("Failed to fetch deals:", response.data.error);
      }
      console.log(response); 
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  useEffect(() => {
    fetchDeals();
  
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
   
        const response = await axios.put(`${config.apiUrl}/day_deals/${editId}`, formData);
        if (response.data.success) {
          resetForm();
          fetchDeals();
        } else {
          console.error("Failed to update deal:", response.data.error);
        }
      } else {
    
        const response = await axios.post(`${config.apiUrl}/day_deals`, formData);
        if (response.data.success) {
          resetForm();
          fetchDeals();
        } else {
          console.error("Failed to add deal:", response.data.error);
        }
      }
    } catch (error) {
      console.error("Error saving deal:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      product: '',
      status: true
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (deal) => {
    setFormData({
      title: deal.title,
      product: deal.product,
      status: deal.status
    });
    setEditMode(true);
    setEditId(deal.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        const response = await axios.delete(`${config.apiUrl}/day_deals/${id}`);
        if (response.data.success) {
          fetchDeals();
        } else {
          console.error("Failed to delete deal:", response.data.error);
        }
      } catch (error) {
        console.error("Error deleting deal:", error);
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const dealToUpdate = deals.find(deal => deal.id === id);
      if (dealToUpdate) {
        const updatedDeal = {
          ...dealToUpdate,
          status: !currentStatus
        };

        const response = await axios.put(`${config.apiUrl}/day_deals/${id}`, updatedDeal);
        if (response.data.success) {
          fetchDeals();
        } else {
          console.error("Failed to update status:", response.data.error);
        }
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handleSearch = () => {

  };

  const filteredDeals = deals.filter(deal =>
    deal.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="w-full max-w-7xl mx-auto p-4">
            {/* Deals Setup Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-red-500">🎯</span>
                <h2 className="text-xl font-semibold">Deal Of The Day</h2>
              </div>

              {/* Language Tabs */}
              <div className="border-b mb-6">
                <div className="flex flex-wrap -mb-px">
                  {languages.map((lang) => (
                    <button
                      key={lang.id}
                      className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${activeLanguage === lang.name
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      onClick={() => setActiveLanguage(lang.name)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Title (EN)
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Ex: LUX"
                    className="w-full border rounded-md p-2"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Products
                  </label>
                  <select
                    className="w-full border rounded-md p-2"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Product</option>
                    {/* If you have products from API, map them here */}
                    {products.length > 0 ? (
                      products.map(product => (
                        <option key={product.id} value={product.name}>{product.name}</option>
                      ))
                    ) : (
                      // Fallback option if no products API
                      <option value="Exquisite 18K White Gold Diamond Necklace Set">
                        Exquisite 18K White Gold Diamond Necklace Set
                      </option>
                    )}
                  </select>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editMode ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>

            {/* Deals List Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-wrap justify-between items-center mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  Deal of the day
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-sm">
                    {filteredDeals.length}
                  </span>
                </h2>
                <div className="mt-4 sm:mt-0">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by Title"
                      className="border rounded-md pl-8 pr-4 py-2 w-full sm:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="absolute left-2 top-2.5">🔍</span>
                    <button
                      className="absolute right-2 top-2 px-2 py-0.5 bg-blue-600 text-white rounded text-sm"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Deals Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        SL
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Product Info
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredDeals.length > 0 ? (
                      filteredDeals.map((deal, index) => (
                        <tr key={deal.id}>
                          <td className="px-4 py-3 text-sm">{index + 1}</td>
                          <td className="px-4 py-3 text-sm">{deal.title}</td>
                          <td className="px-4 py-3 text-sm">{deal.product}</td>
                          <td className="px-4 py-3 text-sm">
                            <div
                              className="w-12 h-6 bg-blue-100 rounded-full p-1 cursor-pointer"
                              onClick={() => toggleStatus(deal.id, deal.status)}
                            >
                              <div
                                className={`w-4 h-4 rounded-full transition-transform duration-200 transform ${deal.status
                                  ? 'translate-x-6 bg-blue-600'
                                  : 'translate-x-0 bg-gray-400'
                                  }`}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex space-x-2">
                              <button
                                className="p-1 text-blue-600 hover:text-blue-800"
                                onClick={() => handleEdit(deal)}
                              >
                                ✏️
                              </button>
                              <button
                                className="p-1 text-red-600 hover:text-red-800"
                                onClick={() => handleDelete(deal.id)}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                          No deals found. Add a new deal to see it here.
                        </td>
                      </tr>
                    )}
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

export default DealsOfTheDay;