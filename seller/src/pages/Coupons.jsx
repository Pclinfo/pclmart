import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Eye, Edit, Trash2 } from 'lucide-react';

const Coupons = () => {
  const [activeContent, setActiveContent] = useState('');
  const [formData, setFormData] = useState({
    couponType: '',
    couponTitle: '',
    couponCode: 'sxzOxb6im',
    customer: '',
    limitPerUser: '',
    discountType: 'Amount',
    discountAmount: '',
    minimumPurchase: '',
    startDate: '',
    expireDate: ''
  });

  const coupons = [
    {
      id: 1,
      title: "75% discount on Purc",
      code: "rFhfx7XtCm",
      type: "Discount On Purchase",
      duration: "10 Jan, 23 - 31 Jan, 29",
      userLimit: { limit: 20, used: 0 },
      bearer: "Seller",
      status: true
    },
    {
      id: 2,
      title: "Free Delivery",
      code: "i2xDTjKF3z",
      type: "Free Delivery",
      duration: "10 Jan, 23 - 31 Jan, 29",
      userLimit: { limit: 2, used: 0 },
      bearer: "Seller",
      status: true
    },

  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleReset = () => {
    setFormData({
      couponType: '',
      couponTitle: '',
      couponCode: 'sxzOxb6im',
      customer: '',
      limitPerUser: '',
      discountType: 'Amount',
      discountAmount: '',
      minimumPurchase: '',
      startDate: '',
      expireDate: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4 md:p-6">
          {/* Coupon Setup Form */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b">
              <h1 className="text-xl font-semibold flex items-center gap-2">
                <span role="img" aria-label="gift">🎁</span>
                Coupon Setup
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Coupon Type</label>
                  <select 
                    name="couponType"
                    value={formData.couponType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select coupon type</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Coupon Title</label>
                  <input
                    type="text"
                    name="couponTitle"
                    placeholder="Title"
                    value={formData.couponTitle}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Coupon Code
                    <span className="float-right text-blue-600 text-xs cursor-pointer">Generate code</span>
                  </label>
                  <input
                    type="text"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Customer</label>
                  <select 
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select customer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Limit For Same User</label>
                  <input
                    type="text"
                    name="limitPerUser"
                    placeholder="Ex: 10"
                    value={formData.limitPerUser}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Discount Type</label>
                  <select 
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Amount">Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Discount Amount</label>
                  <input
                    type="text"
                    name="discountAmount"
                    placeholder="Ex: 5000"
                    value={formData.discountAmount}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Minimum Purchase ($)</label>
                  <input
                    type="text"
                    name="minimumPurchase"
                    placeholder="Ex: 100"
                    value={formData.minimumPurchase}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Expire Date</label>
                  <input
                    type="date"
                    name="expireDate"
                    value={formData.expireDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Coupon List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Coupon List
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">5</span>
              </h2>
              <div className="flex gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by Title or Code"
                    className="w-64 p-2 pr-8 border rounded-md"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </button>
                </div>
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 flex items-center gap-2">
                  <span className="text-green-600">📊</span> Export
                </button>
              </div>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">SL</th>
                    <th className="p-2 text-left">Coupon</th>
                    <th className="p-2 text-left">Coupon Type</th>
                    <th className="p-2 text-left">Duration</th>
                    <th className="p-2 text-left">User Limit</th>
                    <th className="p-2 text-left">Discount Bearer</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon, index) => (
                    <tr key={coupon.id} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">
                        <div>{coupon.title}</div>
                        <div className="text-sm text-gray-500">Code: {coupon.code}</div>
                      </td>
                      <td className="p-2 text-blue-600">{coupon.type}</td>
                      <td className="p-2">{coupon.duration}</td>
                      <td className="p-2">
                        Limit: {coupon.userLimit.limit}, Used: {coupon.userLimit.used}
                      </td>
                      <td className="p-2">{coupon.bearer}</td>
                      <td className="p-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={coupon.status} readOnly />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button className="text-blue-400 hover:text-blue-600">
                            <Eye size={18} />
                          </button>
                          <button className="text-blue-400 hover:text-blue-600">
                            <Edit size={18} />
                          </button>
                          <button className="text-red-400 hover:text-red-600">
                            <Trash2 size={18} />
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

export default Coupons;