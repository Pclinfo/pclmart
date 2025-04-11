import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';


const Coupon = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);


  const [formData, setFormData] = useState({
    coupon_type: '',
    coupon_title: '',
    coupon_code: '',
    coupon_Bearer: '',
    vendor: '',
    customer: '',
    usage_limit: '',
    minimum_purchase: '',
    discount_type: '',
    discount_amount: '',
    start_date: '',
    expiry_date: ''
  });


  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, coupon_code: code });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/show_coupon`);
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editMode) {
 
        await axios.put(`${config.apiUrl}/update_coupon/${editId}`, formData);
      } else {

        await axios.post(`${config.apiUrl}/add_coupon`, formData);
      }

      resetForm();
      fetchCoupons();
    } catch (error) {
      console.error('Error saving coupon:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const resetForm = () => {
    setFormData({
      coupon_type: '',
      coupon_title: '',
      coupon_code: '',
      coupon_Bearer: '',
      vendor: '',
      customer: '',
      usage_limit: '',
      minimum_purchase: '',
      discount_type: '',
      discount_amount: '',
      start_date: '',
      expiry_date: ''
    });
    setEditMode(false);
    setEditId(null);
  };


  const handleEdit = (coupon) => {
    setEditMode(true);
    setEditId(coupon.id);

    setFormData({
      coupon_type: coupon.coupon_type,
      coupon_title: coupon.coupon_title,
      coupon_code: coupon.coupon_code,
      coupon_Bearer: coupon.coupon_Bearer,
      vendor: coupon.vendor,
      customer: coupon.customer,
      usage_limit: coupon.usage_limit,
      minimum_purchase: coupon.minimum_purchase,
      discount_type: coupon.discount_type,
      discount_amount: coupon.discount_amount,
      start_date: coupon.start_date,
      expiry_date: coupon.expiry_date
    });
  };


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await axios.delete(`${config.apiUrl}/delete_coupon/${id}`);
        fetchCoupons();
      } catch (error) {
        console.error('Error deleting coupon:', error);
      }
    }
  };


  const toggleStatus = async (coupon) => {
    try {
      await axios.put(`${config.apiUrl}/coupons/${coupon.id}`, {
        ...coupon,
        status: !coupon.status
      });
      fetchCoupons();
    } catch (error) {
      console.error('Error updating coupon status:', error);
    }
  };


  const filteredCoupons = coupons.filter(coupon =>
    coupon.coupon_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.coupon_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="w-full max-w-7xl mx-auto p-4">
            {/* Coupon Setup Section */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">
                {editMode ? 'Edit Coupon' : 'Coupon Setup'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* First Row */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Coupon Type</label>
                  <select
                    name="coupon_type"
                    value={formData.coupon_type}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">Select coupon type</option>
                    <option value="Discount On Purchase">Discount On Purchase</option>
                    <option value="Free Shipping">Free Shipping</option>
                    <option value="First Order">First Order</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Coupon Title</label>
                  <input
                    type="text"
                    name="coupon_title"
                    value={formData.coupon_title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="w-full border rounded-md p-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Coupon Code
                    <span
                      className="text-blue-600 text-sm ml-2 cursor-pointer"
                      onClick={generateCouponCode}
                    >
                      Generate code
                    </span>
                  </label>
                  <input
                    type="text"
                    name="coupon_code"
                    value={formData.coupon_code}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                  />
                </div>

                {/* Second Row */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Coupon Bearer</label>
                  <select
                    name="coupon_Bearer"
                    value={formData.coupon_Bearer}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">Select coupon bearer</option>
                    <option value="Admin">Admin</option>
                    <option value="Vendor">Vendor</option>
                    <option value="InStore">InStore</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Vendor</label>
                  <select
                    name="vendor"
                    value={formData.vendor}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">Select vendor</option>
                    <option value="1">Vendor 1</option>
                    <option value="2">Vendor 2</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Customer</label>
                  <select
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">Select customer</option>
                    <option value="all">All Customers</option>
                    <option value="specific">Specific Customer</option>
                  </select>
                </div>

                {/* Third Row */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Limit For Same User</label>
                  <input
                    type="number"
                    name="usage_limit"
                    value={formData.usage_limit}
                    onChange={handleInputChange}
                    placeholder="Ex: 10"
                    className="w-full border rounded-md p-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Discount Type</label>
                  <select
                    name="discount_type"
                    value={formData.discount_type}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="amount">Amount</option>
                    <option value="percentage">Percentage</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Discount Amount</label>
                  <input
                    type="number"
                    name="discount_amount"
                    value={formData.discount_amount}
                    onChange={handleInputChange}
                    placeholder="Ex: 500"
                    className="w-full border rounded-md p-2"
                  />
                </div>

                {/* Fourth Row */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Minimum Purchase ($)</label>
                  <input
                    type="number"
                    name="minimum_purchase"
                    value={formData.minimum_purchase}
                    onChange={handleInputChange}
                    placeholder="Ex: 100"
                    className="w-full border rounded-md p-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Expire Date</label>
                  <input
                    type="date"
                    name="expiry_date"
                    value={formData.expiry_date}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isLoading ? 'Saving...' : (editMode ? 'Update' : 'Submit')}
                </button>
              </div>
            </form>

            {/* Coupon List Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  Coupon List
                  <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-sm">
                    {filteredCoupons.length}
                  </span>
                </h2>
                <div className="flex space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by Title or Code"
                      className="border rounded-md pl-8 pr-4 py-2 w-64"
                    />
                    <span className="absolute left-2 top-2.5">🔍</span>
                  </div>
                  <button className="px-4 py-2 border rounded-md hover:bg-gray-50">Export</button>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-4">Loading coupons...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SL</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Coupon</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Coupon Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Duration</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User Limit</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Discount Bearer</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredCoupons.map((coupon, index) => (
                        <tr key={coupon.id}>
                          <td className="px-4 py-3 text-sm">{index + 1}</td>
                          <td className="px-4 py-3 text-sm">
                            {coupon.coupon_title}<br />
                            <span className="text-gray-500">Code: {coupon.coupon_code}</span>
                          </td>
                          <td className="px-4 py-3 text-sm">{coupon.coupon_type}</td>
                          <td className="px-4 py-3 text-sm">
                            {new Date(coupon.start_date).toLocaleDateString()} - {new Date(coupon.expiry_date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            Limit: {coupon.usage_limit}, Used: {coupon.usage_count || 0}
                          </td>
                          <td className="px-4 py-3 text-sm">{coupon.coupon_Bearer}</td>
                          <td className="px-4 py-3 text-sm">
                            <div
                              className="w-12 h-6 bg-blue-100 rounded-full p-1 cursor-pointer"
                              onClick={() => toggleStatus(coupon)}
                            >
                              <div
                                className={`w-4 h-4 rounded-full transition-transform duration-200 transform ${coupon.status ? 'translate-x-6 bg-blue-600' : 'translate-x-0 bg-gray-400'
                                  }`}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex space-x-2">
                              <button
                                className="p-1 text-blue-600 hover:text-blue-800"
                                title="View Details"
                              >
                                👁️
                              </button>
                              <button
                                className="p-1 text-blue-600 hover:text-blue-800"
                                onClick={() => handleEdit(coupon)}
                                title="Edit"
                              >
                                ✏️
                              </button>
                              <button
                                className="p-1 text-red-600 hover:text-red-800"
                                onClick={() => handleDelete(coupon.id)}
                                title="Delete"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredCoupons.length === 0 && (
                        <tr>
                          <td colSpan="8" className="px-4 py-3 text-sm text-center">
                            No coupons found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupon;