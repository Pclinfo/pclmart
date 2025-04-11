import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';

const Categories = () => {
  const [activeTab, setActiveTab] = useState('English(EN)');
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const imageCache = useRef(new Map());

  const [categoryForm, setCategoryForm] = useState({
    id: null,
    name: '',
    priority: 1,
    image: null,
    homeCategory: false
  });


  const processImageUrl = (imagePath) => {

    if (!imagePath) return '/default-category-logo.png';

    if (imageCache.current.has(imagePath)) {
      return imageCache.current.get(imagePath);
    }


    if (imagePath.startsWith('http')) {
      imageCache.current.set(imagePath, imagePath);
      return imagePath;
    }

    const cleanPath = imagePath
      .replace(/^\.\//, '')
      .replace(/^\/+/, '')
      .trim();

    const fullUrl = `${config.apiBaseUrl}/uploads/category/${cleanPath}`;


    imageCache.current.set(imagePath, fullUrl);
    return fullUrl;
  };


  const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error('Image failed to load'));
      img.src = url;
    });
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${config.apiUrl}/category`, {
        params: { search: searchTerm }
      });

      const categoriesData = Array.isArray(response.data.categories)
        ? response.data.categories
        : [];


      categoriesData.forEach(category => {
        if (category.image) {
          const imageUrl = processImageUrl(category.image);

          preloadImage(imageUrl).catch(() => {

            imageCache.current.set(category.image, '/default-category-logo.png');
          });
        }
      });

      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories. Please try again.');
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchCategories();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {

          setPreviewImage(reader.result);
        };
        img.onerror = () => {

          console.error('Invalid image file');
          setError('Invalid image file. Please select a valid image.');
          e.target.value = '';
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);

      setCategoryForm(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleEditCategory = (category) => {
    setCategoryForm({
      id: category.id,
      name: category.name,
      priority: category.priority,
      image: null,
      homeCategory: category.home_category
    });


    if (category.image) {
      const imageUrl = processImageUrl(category.image);

      preloadImage(imageUrl)
        .then(url => setPreviewImage(url))
        .catch(() => setPreviewImage('/default-category-logo.png'));
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', categoryForm.name);
      formData.append('priority', categoryForm.priority);
      formData.append('home_category', categoryForm.homeCategory);

      if (categoryForm.image) {
        formData.append('image', categoryForm.image);
      }

      if (categoryForm.id) {

        await axios.put(`${config.apiUrl}/edit_category/${categoryForm.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {

        await axios.post(`${config.apiUrl}/category`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }


      imageCache.current.clear();


      setCategoryForm({
        id: null,
        name: '',
        priority: 1,
        image: null,
        homeCategory: false
      });
      setPreviewImage(null);
      fetchCategories();
    } catch (error) {
      console.error('Error submitting category:', error);
      setError('Failed to submit category. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    setIsLoading(true);
    try {
      await axios.delete(`${config.apiUrl}/delete_category/${categoryId}`);

      imageCache.current.clear();
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleHomeCategory = async (category) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', category.name);
      formData.append('priority', category.priority);
      formData.append('home_category', !category.home_category);

      await axios.put(`${config.apiUrl}/edit_category/${category.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      fetchCategories();
    } catch (error) {
      console.error('Error toggling home category:', error);
      setError('Failed to update home category status.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCategoryForm({
      id: null,
      name: '',
      priority: 1,
      image: null,
      homeCategory: false
    });
    setPreviewImage(null);
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 bg-orange-500 rounded"></div>
              <h1 className="text-xl font-semibold text-gray-800">Category Setup</h1>
            </div>

            {/* Category Setup Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* Language Tabs */}
              <div className="border-b mb-6">
                <div className="flex flex-wrap -mb-px">
                  {['English(EN)'].map((tab) => (
                    <button
                      key={tab}
                      className={`mr-4 py-2 px-1 border-b-2 ${activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmitCategory} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Category Name */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category Name <span className="text-red-500">*</span> (EN)
                    </label>
                    <input
                      type="text"
                      placeholder="New Category"
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      required
                      className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Priority */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      Priority
                    </label>
                    <div className="relative">
                      <select
                        value={categoryForm.priority}
                        onChange={(e) => setCategoryForm({ ...categoryForm, priority: parseInt(e.target.value) })}
                        className="w-full appearance-none border border-gray-300 rounded p-2 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>

                  {/* Home Category Toggle */}
                  <div className="mb-6">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        checked={categoryForm.homeCategory}
                        onChange={(e) => setCategoryForm({ ...categoryForm, homeCategory: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2">Show on Home Page</span>
                    </label>
                  </div>

                  {/* Category Logo */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category Logo <span className="text-red-500">*</span> Ratio 1:1 (500 x 500 px)
                    </label>
                    <div className="flex">
                      <div className="flex-grow">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          {categoryForm.id && !categoryForm.image ? "Leave empty to keep current image" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-32 h-32 border-2 border-gray-200 rounded flex items-center justify-center bg-gray-50 overflow-hidden">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Category Preview"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          console.error('Image failed to load:', e);
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = '/default-category-logo.png';
                        }}
                      />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="col-span-full flex justify-end mt-6 space-x-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      categoryForm.id ? 'Update' : 'Submit'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Category List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                  <h2 className="text-lg font-medium text-gray-800">Category List</h2>
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                    {categories.length}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by category name"
                      className="pl-8 pr-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Error Handling */}
              {error && (
                <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">{error}</span>
                  <button
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    onClick={() => setError(null)}
                  >
                    <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Loading State */}
              {isLoading ? (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                !error && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category Image
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Home Category Status
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((category) => (
                          <tr key={category.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {category.id}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                                {/* Image with improved rendering and error handling */}
                                <div className="w-full h-full relative bg-gray-100">
                                  <img
                                    key={`category-${category.id}-${Date.now()}`} // Force re-render on data refresh
                                    src={processImageUrl(category.image)}
                                    alt={category.name}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                      e.target.onerror = null; // Prevent infinite loop
                                      e.target.src = '/default-category-logo.png';
                                      // Update cache with default image
                                      if (category.image) {
                                        imageCache.current.set(category.image, '/default-category-logo.png');
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                              {category.name}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                              {category.priority}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="relative inline-block w-10 align-middle select-none">
                                <input
                                  type="checkbox"
                                  name={`toggle-${category.id}`}
                                  id={`toggle-${category.id}`}
                                  className="sr-only peer"
                                  checked={category.home_category}
                                  onChange={() => handleToggleHomeCategory(category)}
                                  disabled={isLoading}
                                />
                                <label
                                  htmlFor={`toggle-${category.id}`}
                                  className={`block h-6 w-11 rounded-full bg-gray-200 cursor-pointer peer-checked:bg-blue-600 after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                ></label>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEditCategory(category)}
                                  className="p-1 text-teal-500 border border-teal-500 rounded hover:bg-teal-50"
                                  disabled={isLoading}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteCategory(category.id)}
                                  className="p-1 text-red-500 border border-red-500 rounded hover:bg-red-50"
                                  disabled={isLoading}
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
                )
              )}

              {/* No Categories Message */}
              {!isLoading && !error && categories.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No categories found. Try a different search or add a new category.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;