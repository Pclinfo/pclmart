import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';

const DeniedProducts = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {

      const params = new URLSearchParams();
      if (selectedBrand !== 'All Brands') params.append('brand', selectedBrand);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedSubCategory) params.append('sub_category', selectedSubCategory);
      if (selectedSubSubCategory) params.append('sub_sub_category', selectedSubSubCategory);
      if (filters.search || searchQuery) params.append('search', filters.search || searchQuery);


      const response = await axios.get(`${config.apiUrl}/denied_products_list?${params.toString()}`);

      if (response.data.status === 'success') {
        setProducts(response.data.products || []);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProducts({ search: searchQuery });
  };

  const handleReset = () => {
    setSelectedBrand('All Brands');
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedSubSubCategory('');

    setSearchQuery('');
  };

  const handleShowData = () => {
    fetchProducts();
  };

  const handleExport = () => {

    console.log('Exporting data...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          <div className="bg-white rounded-md shadow-sm">
            <div className="flex items-center gap-2 p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-blue-700 rounded-md"></div>
                <h1 className="text-xl font-medium text-blue-700">Denied Products</h1>
              </div>
              <span className="bg-gray-200 text-gray-600 rounded-full px-2 py-0.5 text-xs">
                {products.length}
              </span>
            </div>

            {/* Filter Section */}
            <div className="p-4 border-b">
              <h2 className="text-base font-medium mb-4">Filter Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All Brands">All Brands</option>
                    {/* Dynamically add brand options from API */}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select category</option>
                    {/* Dynamically add category options from API */}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Sub Category</option>
                    {/* Dynamically add sub category options from API */}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sub Sub Category</label>
                  <select
                    value={selectedSubSubCategory}
                    onChange={(e) => setSelectedSubSubCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Sub Sub Category</option>
                    {/* Dynamically add sub sub category options from API */}
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition"
                >
                  Reset
                </button>
                <button
                  onClick={handleShowData}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                >
                  Show data
                </button>
              </div>
            </div>

            {/* Search and Product List */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex w-2/3 md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search by Product Name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md transition"
                  >
                    Search
                  </button>
                </div>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-white border border-green-600 text-green-600 hover:bg-green-50 rounded-md transition flex items-center gap-2"
                >
                  <span className="hidden md:inline">Export</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>

              {/* Loading and Error State */}
              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
                  {error}
                </div>
              )}

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SL
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Type
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Show As Featured
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Active Status
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {!loading && !error && products.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-4 py-16 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="w-16 h-16 mb-4 text-gray-300">
                              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <p className="text-gray-500">No product found</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      products.map((product, index) => (
                        <tr key={product.pid || index}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              {product.product_thumbnail && (
                                <img
                                  src={product.product_thumbnail}
                                  alt={product.product_name}
                                  className="h-10 w-10 rounded-md object-cover mr-3"
                                />
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">{product.product_name}</div>
                                <div className="text-xs text-gray-500">SKU: {product.product_sku}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {product.product_type}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            ${parseFloat(product.unit_price).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.is_featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {product.is_featured ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Denied
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button className="p-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button className="p-1 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button className="p-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
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

export default DeniedProducts;