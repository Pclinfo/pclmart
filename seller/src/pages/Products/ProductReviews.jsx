import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Eye } from 'lucide-react';

const ProductReviews = () => {
  const [activeContent, setActiveContent] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('All customer');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const reviews = [
    {
      id: 19,
      product: "Leather Ladies Bag",
      customer: "fatema subarna",
      rating: 5,
      review: "product quality was good.",
      reply: "-",
      date: "12 Oct 2022",
      status: true,
      hasSpreadsheet: true
    },
    {
      id: 18,
      product: "Leather Ladies Bag",
      customer: "Devid Jack",
      rating: 4,
      review: "It is a long established fact that...",
      reply: "-",
      date: "12 Oct 2022",
      status: true,
      hasAudio: true,
      hasPdf: true,
      hasDocument: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4 md:p-6">
          <div className="bg-white rounded-lg shadow">
            {/* Header */}
            <div className="p-4 border-b">
              <h1 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-yellow-400">🎁</span>
                Product Reviews
              </h1>
            </div>

            {/* Filters Section */}
            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Products</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    <option value="">Select Product</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Customer</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                  >
                    <option value="All customer">All customer</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Choose Status</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="">---Select status---</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">From</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-md"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">To</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-md"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
                  Filter
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md flex items-center gap-2">
                  <span className="text-green-600">📊</span> Export
                </button>
              </div>
            </div>

            {/* Table Section */}
            <div className="p-4 overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">SL</th>
                    <th className="p-2 text-left">Review ID</th>
                    <th className="p-2 text-left">Product</th>
                    <th className="p-2 text-left">Customer</th>
                    <th className="p-2 text-left">Rating</th>
                    <th className="p-2 text-left">Review</th>
                    <th className="p-2 text-left">Reply</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review, index) => (
                    <tr key={review.id} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{review.id}</td>
                      <td className="p-2 text-blue-600">{review.product}</td>
                      <td className="p-2">{review.customer}</td>
                      <td className="p-2">
                        <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded">
                          {review.rating} ★
                        </span>
                      </td>
                      <td className="p-2">{review.review}</td>
                      <td className="p-2">{review.reply}</td>
                      <td className="p-2">{review.date}</td>
                      <td className="p-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked={review.status} readOnly />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                      <td className="p-2">
                        <button className="text-blue-400 hover:text-blue-600">
                          <Eye size={20} />
                        </button>
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

export default ProductReviews;