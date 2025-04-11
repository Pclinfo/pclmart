import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import config from '../../config';

const CustomerReviews = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('All customer');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  // Function to fetch reviews from the API
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.apiUrl}/get_customer_review`);
      console.log('API Response:', response.data); // Log the API response for debugging
      
      // Transform the API response to match the component's expected format
      const formattedReviews = response.data.map(review => ({
        id: review.review_id,
        product: review.product_id || 'Product not found',
        customer: review.customer_id || review.customer || 'Unknown',
        rating: review.rating,
        review: review.review_text || review.review,
        date: review.created_at || '20 Nov 2022',
        status: review.status === 1 || review.status === true,
      }));
      
      setReviews(formattedReviews);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch reviews');
      setLoading(false);
      console.error('Error fetching reviews:', err);
    }
  };

  // Function to handle review deletion
  const handleDeleteReview = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`${config.apiUrl}/delete_customer_review/${id}`);
        // Remove the deleted review from the state
        setReviews(reviews.filter(review => review.id !== id));
      } catch (err) {
        console.error('Error deleting review:', err);
        alert('Failed to delete review');
      }
    }
  };

  // Function to handle status toggle
  const handleStatusToggle = async (id, currentStatus, rating, reviewText) => {
    try {
      // Send the new status value (opposite of current status)
      const newStatus = !currentStatus;
      
      // Using the update endpoint from your backend to update status
      await axios.put(`${config.apiUrl}/update_customer_review/${id}`, {
        rating: rating,
        review_text: reviewText,
        status: newStatus // Send the new status value to the backend
      });
      
      // Update local state to reflect the change
      setReviews(reviews.map(review => 
        review.id === id ? {...review, status: newStatus} : review
      ));
    } catch (err) {
      console.error('Error updating review status:', err);
      alert('Failed to update review status');
    }
  };

  // Function to handle search
  const handleSearch = () => {
    // With your current backend, you'd need to fetch all and filter client-side
    fetchReviews();
    // In a future implementation, backend filtering could be added
  };

  // Function to export data (placeholder)
  const handleExport = () => {
    alert('Export functionality would be implemented here');
    // This could generate a CSV or Excel file with the reviews data
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Header */}
              <div className="flex items-center mb-6">
                <h1 className="text-xl font-semibold">Customer Reviews</h1>
                <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {reviews.length}
                </span>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Select Product</option>
                </select>

                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                  <option value="All customer">All customer</option>
                </select>

                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">--Select status--</option>
                </select>

                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-medium">Customer Reviews List</h2>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {reviews.length}
                  </span>
                </div>

                <div className="flex gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by Product or Customer"
                      className="pl-10 pr-4 py-2 border rounded-md w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={handleExport}
                  >
                    Export
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : error ? (
                  <div className="text-center text-red-500 py-4">{error}</div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reply</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reviews.map((review, index) => (
                        <tr key={review.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{review.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{review.product}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{review.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {review.rating}
                              <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </td>
                          <td className="px-6 py-4">{review.review}</td>
                          <td className="px-6 py-4">-</td>
                          <td className="px-6 py-4 whitespace-nowrap">{review.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="relative inline-block w-10 h-5">
                              <input
                                type="checkbox"
                                className="opacity-0 w-0 h-0"
                                checked={review.status}
                                onChange={() => handleStatusToggle(review.id, review.status, review.rating, review.review)}
                              />
                              <span 
                                className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${review.status ? 'bg-blue-600' : 'bg-gray-300'}`}
                                onClick={() => handleStatusToggle(review.id, review.status, review.rating, review.review)}
                              >
                                <span className={`absolute h-4 w-4 left-0.5 bottom-0.5 bg-white rounded-full transition-transform duration-200 ease-in-out ${review.status ? 'transform translate-x-5' : ''}`} />
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => handleDeleteReview(review.id)}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;