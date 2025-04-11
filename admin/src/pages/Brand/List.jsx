import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';

const List = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.apiUrl}/brands`);
      setBrands(response.data.brands);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch brands');
      setLoading(false);
      console.error('Error fetching brands:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredBrands = brands.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBrands(filteredBrands);
  };

  const handleExport = () => {

    console.log('Exporting data');
  };

  const handleStatusToggle = async (id) => {
    try {

      const updatedBrands = brands.map(brand =>
        brand.id === id ? { ...brand, status: !brand.status } : brand
      );
      setBrands(updatedBrands);
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const handleEdit = async () => {
    try {

      const formData = new FormData();
      formData.append('Brand_name', editingBrand.name);


      if (editingBrand.logoFile) {
        formData.append('image_filename', editingBrand.logoFile);
        formData.append('image_alt_name', editingBrand.name);
      }


      const response = await axios.put(
        `${config.apiUrl}/brands/${editingBrand.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );


      await fetchBrands();


      setEditingBrand(null);
    } catch (err) {
      console.error('Error editing brand:', err);
      setError('Failed to edit brand');
    }
  };

  const handleDelete = async (id) => {
    try {

      const confirmDelete = window.confirm('Are you sure you want to delete this brand?');
      if (!confirmDelete) return;


      await axios.delete(`${config.apiUrl}/brands/${id}`);

      const updatedBrands = brands.filter(brand => brand.id !== id);
      setBrands(updatedBrands);
    } catch (err) {
      console.error('Error deleting brand:', err);
      setError('Failed to delete brand');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar setActiveContent={() => { }} />
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">Brand List</h1>
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{brands.length}</span>
            </div>

            <div className="p-4 border-t border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <form onSubmit={handleSearch} className="w-full md:w-auto mb-4 md:mb-0">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Search by brand name"
                      className="w-full md:w-72 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                    >
                      Search
                    </button>
                  </div>
                </form>

                <button
                  onClick={handleExport}
                  className="flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Export
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">SL</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Brand Logo</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Total Product</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Total Order</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {brands.map((brand) => (
                      <tr key={brand.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4 text-sm text-gray-700">{brand.id}</td>
                        <td className="py-4 px-4">
                          <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded p-1">
                            <img
                              src={brand.logo ? `${config.apiUrl}/uploads/brands_image/${brand.logo}` : '/default-logo.png'}
                              alt={brand.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm font-medium text-gray-900">{brand.name}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">{brand.total_product}</td>
                        <td className="py-4 px-4 text-sm text-gray-700">{brand.total_order}</td>
                        <td className="py-4 px-4">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={brand.status}
                              onChange={() => handleStatusToggle(brand.id)}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingBrand({ ...brand, logoPreview: brand.logo ? `${config.apiUrl}/uploads/brands_image/${brand.logo}` : null })}
                              className="p-1 text-teal-600 border border-teal-600 rounded hover:bg-teal-50"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(brand.id)}
                              className="p-1 text-red-600 border border-red-600 rounded hover:bg-red-50"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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

      {/* Edit Brand Modal */}
      {editingBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Brand</h2>

            {/* Brand Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
              <input
                type="text"
                value={editingBrand.name}
                onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Enter brand name"
              />
            </div>

            {/* Logo Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setEditingBrand({
                    ...editingBrand,
                    logoFile: file,
                    logoPreview: URL.createObjectURL(file)
                  });
                }}
                className="w-full p-2 border rounded"
                accept="image/*"
              />
            </div>

            {/* Logo Preview */}
            {(editingBrand.logoPreview || editingBrand.logo) && (
              <div className="mb-4 flex justify-center">
                <img
                  src={editingBrand.logoPreview || `${config.apiUrl}/uploads/brands_image/${editingBrand.logo}`}
                  alt="Brand Logo Preview"
                  className="max-w-40 max-h-40 object-contain"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingBrand(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={!editingBrand.name}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;