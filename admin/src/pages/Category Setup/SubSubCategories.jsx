import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const SubSubCategorySetup = () => {
  const [newSubSubCategory, setNewSubSubCategory] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [subSubCategories, setSubSubCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [editingCategory, setEditingCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMainCategories();
    fetchSubSubCategories();
  }, []);

  const fetchMainCategories = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/category`);
      setMainCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching main categories:', error);
      setError('Failed to fetch main categories');
    }
  };

  const fetchSubSubCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.apiUrl}/get_sub_sub_category`);
      setSubSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching sub sub categories:', error);
      setError('Failed to fetch sub sub categories');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubCategories = async (mainCategoryId) => {
    if (!mainCategoryId) {
      setSubCategories([]);
      return;
    }

    try {
      const response = await axios.get(`${config.apiUrl}/get_sub_category`);
      setSubCategories(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching sub categories:', error);
      setError('Failed to fetch sub categories');
      setSubCategories([]);
    }
  };

  const handleMainCategoryChange = (e) => {
    const selectedMainCategoryId = e.target.value;
    setSelectedMainCategory(selectedMainCategoryId);
    setSelectedSubCategory('');

    if (selectedMainCategoryId) {
      fetchSubCategories(selectedMainCategoryId);
    } else {
      setSubCategories([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!newSubSubCategory || !selectedMainCategory || !selectedSubCategory) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const payload = {
        name: newSubSubCategory,
        category_id: selectedMainCategory,
        sub_category_id: selectedSubCategory,
        priority: selectedPriority || 1
      };

      if (editingCategory) {

        await axios.put(`${config.apiUrl}/update_sub_sub_categories/${editingCategory.id}`, payload);
        setEditingCategory(null);
      } else {

        await axios.post(`${config.apiUrl}/add_sub_sub_category`, payload);
      }


      handleReset();
      fetchSubSubCategories();
    } catch (error) {
      console.error('Error submitting sub sub category:', error);
      setError('Failed to submit sub sub category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setNewSubSubCategory(category.name);
    setSelectedMainCategory(category.category_id);
    fetchSubCategories(category.category_id);
    setSelectedSubCategory(category.sub_category_id);
    setSelectedPriority(category.priority);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sub sub category?')) {
      try {
        await axios.delete(`${config.apiUrl}/delete_sub_sub_category/${id}`);
        fetchSubSubCategories();
      } catch (error) {
        console.error('Error deleting sub sub category:', error);
        setError('Failed to delete sub sub category');
      }
    }
  };

  const handleReset = () => {
    setNewSubSubCategory('');
    setSelectedMainCategory('');
    setSelectedSubCategory('');
    setSelectedPriority('');
    setEditingCategory(null);
    setSubCategories([]);
    setError(null);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.apiUrl}/get_sub_sub_category`, {
        params: { search: searchQuery }
      });
      setSubSubCategories(response.data);
    } catch (error) {
      console.error('Error searching sub sub categories:', error);
      setError('Failed to search sub sub categories');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 bg-orange-500 rounded"></div>
              <h1 className="text-xl font-semibold text-gray-800">
                {editingCategory ? 'Edit Sub Sub Category' : 'Sub Sub Category Setup'}
              </h1>
            </div>

            {/* Error Handling */}
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Form Section */}
            <div className="bg-white rounded-md shadow-sm mb-6 p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="subSubCategoryName" className="block text-sm font-medium text-gray-700 mb-1">
                    Sub Sub Category Name * (EN)
                  </label>
                  <input
                    type="text"
                    id="subSubCategoryName"
                    value={newSubSubCategory}
                    onChange={(e) => setNewSubSubCategory(e.target.value)}
                    placeholder="New Sub Sub Category"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="mainCategory" className="block text-sm font-medium text-gray-700 mb-1">
                      Main Category *
                    </label>
                    <div className="relative">
                      <select
                        id="mainCategory"
                        value={selectedMainCategory}
                        onChange={handleMainCategoryChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select main category</option>
                        {mainCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subCategory" className="block text-sm font-medium text-gray-700 mb-1">
                      Sub Category Name *
                    </label>
                    <div className="relative">
                      <select
                        id="subCategory"
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        disabled={!selectedMainCategory}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">
                          {selectedMainCategory ? 'Select sub category' : 'Select main category first'}
                        </option>
                        {subCategories.map((subCategory) => (
                          <option key={subCategory.id} value={subCategory.id}>
                            {subCategory.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <div className="relative">
                      <select
                        id="priority"
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Set Priority</option>
                        {[1, 2, 3, 10].map((priorityValue) => (
                          <option key={priorityValue} value={priorityValue}>
                            {priorityValue}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {editingCategory ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>

            {/* List Section */}
            <div className="bg-white rounded-md shadow-sm p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="flex items-center mb-2 md:mb-0">
                  <h2 className="text-base font-medium text-gray-800">Sub Sub Category List</h2>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full">
                    {subSubCategories.length}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by sub sub category"
                      className="border border-gray-300 rounded-md pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => {/* Export logic */ }}
                    className="flex items-center border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50"
                  >
                    <svg className="h-4 w-4 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <>
                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Sub Category Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub Category Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {subSubCategories.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.sub_category_name}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.category_name}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.priority}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="p-1 bg-teal-50 text-teal-500 rounded border border-teal-200 hover:bg-teal-100"
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="p-1 bg-red-50 text-red-500 rounded border border-red-200 hover:bg-red-100"
                                >
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                  {/* No Items Message */}
                  {subSubCategories.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No sub sub categories found. Try a different search or add a new sub sub category.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubSubCategorySetup;