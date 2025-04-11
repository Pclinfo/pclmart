import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const SubCategories = () => {
  const [activeTab, setActiveTab] = useState('English(EN)');
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newSubCategory, setNewSubCategory] = useState({
    name: '',
    categoryId: '',
    priority: '1'
  });

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/category`);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories');
    }
  };

  const fetchSubCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.apiUrl}/get_sub_category`);
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setError('Failed to fetch subcategories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSubCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newSubCategory.name);
      formData.append('category_id', newSubCategory.categoryId);
      formData.append('priority', newSubCategory.priority || '1');

      await axios.post(`${config.apiUrl}/add_sub_category`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchSubCategories();

      setNewSubCategory({
        name: '',
        categoryId: '',
        priority: '1'
      });

      alert('Subcategory added successfully!');
    } catch (error) {
      console.error('Error adding subcategory:', error);
      setError('Failed to add subcategory');
    }
  };

  const handleReset = () => {
    setNewSubCategory({
      name: '',
      categoryId: '',
      priority: '1'
    });
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    if (!window.confirm('Are you sure you want to delete this subcategory?')) return;

    try {
      await axios.delete(`${config.apiUrl}/delete_sub_category/${subCategoryId}`);
      fetchSubCategories();
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      setError('Failed to delete subcategory');
    }
  };

  const handleEditSubCategory = (subCategory) => {
    setNewSubCategory({
      id: subCategory.id,
      name: subCategory.name,
      categoryId: subCategory.category_id,
      priority: subCategory.priority
    });
  };

  const filteredSubCategories = subCategories.filter(subCategory =>
    subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 bg-orange-500 rounded"></div>
              <h1 className="text-xl font-semibold text-gray-800">Sub Category Setup</h1>
            </div>

            {/* Error Handling */}
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Sub Category Setup Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* Language Tabs */}
              <div className="border-b mb-6">
                <div className="flex flex-wrap -mb-px">
                  {['English(EN)'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`mr-4 py-2 px-1 border-b-2 ${activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      onClick={() => handleTabChange(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sub Category Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub Category Name <span className="text-red-500">*</span> (EN)
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newSubCategory.name}
                    onChange={handleInputChange}
                    placeholder="New Sub Category"
                    required
                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Main Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="categoryId"
                      value={newSubCategory.categoryId}
                      onChange={handleInputChange}
                      required
                      className="w-full appearance-none border border-gray-300 rounded p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select main category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    Priority
                    <span className="ml-1 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      name="priority"
                      value={newSubCategory.priority}
                      onChange={handleInputChange}
                      className="w-full appearance-none border border-gray-300 rounded p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {newSubCategory.id ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>

            {/* Sub Category List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                  <h2 className="text-lg font-medium text-gray-800">Sub Category List</h2>
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                    {filteredSubCategories.length}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by sub category name"
                      className="pl-8 pr-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Search
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                // Sub Category Table
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sub Category Name
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category Name
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSubCategories.map((subCategory) => (
                        <tr key={subCategory.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {subCategory.id}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-sm font-medium text-blue-600">{subCategory.name}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {categories.find(cat => cat.id === subCategory.category_id)?.name || 'N/A'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                            {subCategory.priority}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditSubCategory(subCategory)}
                                className="p-1 text-teal-500 border border-teal-500 rounded hover:bg-teal-50"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteSubCategory(subCategory.id)}
                                className="p-1 text-red-500 border border-red-500 rounded hover:bg-red-50"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              )}

              {/* No Subcategories Message */}
              {!isLoading && !error && filteredSubCategories.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No subcategories found. Try a different search or add a new subcategory.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategories;