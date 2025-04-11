import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';

const Setup = () => {
  const [activeTab, setActiveTab] = useState('English');
  const [attributeName, setAttributeName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [editingAttribute, setEditingAttribute] = useState(null);


  useEffect(() => {
    fetchAttributes();
  }, []);


  const fetchAttributes = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/get_product_attributes`);
      setAttributes(response.data);
    } catch (error) {
      console.error('Error fetching attributes:', error);
      alert('Failed to fetch attributes');
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingAttribute) {

        const response = await axios.put(`${config.apiUrl}/update_product_attributes/${editingAttribute.id}`, {
          name: attributeName
        });


        setAttributes(attributes.map(attr =>
          attr.id === editingAttribute.id ? response.data : attr
        ));


        setEditingAttribute(null);
      } else {

        const response = await axios.post(`${config.apiUrl}/add_product_attributes`, {
          name: attributeName
        });


        setAttributes([...attributes, response.data]);
      }


      setAttributeName('');
    } catch (error) {
      console.error('Error submitting attribute:', error);
      alert('Failed to submit attribute');
    }
  };

  const handleReset = () => {
    setAttributeName('');
    setEditingAttribute(null);
  };


  const handleSearch = (e) => {
    e.preventDefault();


    if (!searchTerm.trim()) {
      fetchAttributes();
      return;
    }


    const filteredAttributes = attributes.filter(attr =>
      attr.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAttributes(filteredAttributes);
  };

  const handleEdit = (attribute) => {
    setEditingAttribute(attribute);
    setAttributeName(attribute.name);
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/delete_product_attributes/${id}`);


      setAttributes(attributes.filter(attr => attr.id !== id));
    } catch (error) {
      console.error('Error deleting attribute:', error);
      alert('Failed to delete attribute');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar setActiveContent={() => { }} />
        <div className="flex-1 p-4">
          {/* Attribute Setup Section */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 flex items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">
                {editingAttribute ? 'Edit Attribute' : 'Attribute Setup'}
              </h1>
            </div>

            <div className="p-4">
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

              {/* Attribute Name Input */}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="attributeName" className="block text-sm font-medium text-gray-700 mb-1">
                    Attribute Name* (EN)
                  </label>
                  <input
                    type="text"
                    id="attributeName"
                    placeholder="Enter Attribute Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={attributeName}
                    onChange={(e) => setAttributeName(e.target.value)}
                    required
                  />
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
                    {editingAttribute ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Attribute List Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <h2 className="text-lg font-medium text-gray-800">Attribute list</h2>
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {attributes.length}
                </span>
              </div>

              <form onSubmit={handleSearch} className="w-full max-w-xs ml-auto">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search by Attribute Name"
                    className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">SL</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Attribute Name</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attributes.map((attribute, index) => (
                    <tr key={attribute.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm text-gray-700">{index + 1}</td>
                      <td className="py-4 px-4 text-sm text-blue-600 font-medium">{attribute.name}</td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(attribute)}
                            className="p-1 text-teal-600 border border-teal-600 rounded hover:bg-teal-50"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(attribute.id)}
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
  );
};

export default Setup;