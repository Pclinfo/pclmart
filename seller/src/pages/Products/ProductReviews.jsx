import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Eye, Edit, Trash2 } from 'lucide-react';
import config from '../config';

const ProductReviews = () => {
  const [activeContent, setActiveContent] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('All customer');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    Rating: 0
  });

 
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${config.apiUrl}/product_review`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        console.error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

 
  const fetchFilterData = async () => {
    try {
     
      const productsResponse = await fetch(`${config.apiUrl}/products`);
      const customersResponse = await fetch(`${config.apiUrl}/customers`);

      if (productsResponse.ok && customersResponse.ok) {
        const productsData = await productsResponse.json();
        const customersData = await customersResponse.json();

        setProducts(productsData);
        setCustomers(customersData);
      }
    } catch (error) {
      console.error('Error fetching filter data:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchFilterData();
  }, []);

  
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await fetch(`${config.apiUrl}/product_review`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: reviewId }),
        });

        if (response.ok) {
        
          setReviews(reviews.filter(review => review.id !== reviewId));
        } else {
          console.error('Failed to delete review');
        }
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

 
  const handleStatusToggle = async (review) => {
    try {
      const updatedStatus = !review.status;
      const response = await fetch(`${config.apiUrl}/product_review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: review.id,
          content: review.content,
          Rating: review.Rating,
          status: updatedStatus
        }),
      });

      if (response.ok) {
       
        setReviews(reviews.map(r =>
          r.id === review.id ? { ...r, status: updatedStatus } : r
        ));
      }
    } catch (error) {
      console.error('Error updating review status:', error);
    }
  };

 
  const handleEditClick = (review) => {
    setSelectedReview(review);
    setFormData({
      content: review.content || '',
      Rating: review.Rating || 0
    });
    setIsEditing(true);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'Rating' ? parseInt(value, 10) : value
    });
  };

  
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.apiUrl}/product_review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedReview.id,
          content: formData.content,
          Rating: formData.Rating
        }),
      });

      if (response.ok) {
        
        setReviews(reviews.map(r =>
          r.id === selectedReview.id ? { ...r, content: formData.content, Rating: formData.Rating } : r
        ));
        setIsEditing(false);
        setSelectedReview(null);
      }
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

 
  const handleFilterSubmit = async () => {
    try {
    
      const params = new URLSearchParams();
      if (selectedProduct) params.append('product_id', selectedProduct);
      if (selectedCustomer && selectedCustomer !== 'All customer') params.append('user_login_id', selectedCustomer);
      if (selectedStatus) params.append('status', selectedStatus);
      if (dateFrom) params.append('date_from', dateFrom);
      if (dateTo) params.append('date_to', dateTo);

      const response = await fetch(`${config.apiUrl}/product_review?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  const renderRatingStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

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
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
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
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
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
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
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
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md"
                  onClick={handleFilterSubmit}
                >
                  Filter
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md flex items-center gap-2">
                  <span className="text-green-600">📊</span> Export
                </button>
              </div>
            </div>

            {/* Table Section */}
            <div className="p-4 overflow-x-auto">
              {loading ? (
                <div className="text-center py-4">Loading reviews...</div>
              ) : reviews.length > 0 ? (
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
                        <td className="p-2 text-blue-600">{review.product_name}</td>
                        <td className="p-2">{review.customer_name}</td>
                        <td className="p-2">
                          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded">
                            {review.Rating} {renderRatingStars(review.Rating)}
                          </span>
                        </td>
                        <td className="p-2">{review.content}</td>
                        <td className="p-2">{review.reply || "-"}</td>
                        <td className="p-2">{new Date(review.created_at).toLocaleDateString()}</td>
                        <td className="p-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={review.status}
                              onChange={() => handleStatusToggle(review)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </td>
                        <td className="p-2 flex gap-2">
                          <button className="text-blue-400 hover:text-blue-600">
                            <Eye size={20} />
                          </button>
                          <button
                            className="text-green-400 hover:text-green-600"
                            onClick={() => handleEditClick(review)}
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            className="text-red-400 hover:text-red-600"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-4">No reviews found</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Review Modal */}
      {isEditing && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Review</h2>
            <form onSubmit={handleSubmitEdit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Rating</label>
                <select
                  name="Rating"
                  className="w-full p-2 border rounded-md"
                  value={formData.Rating}
                  onChange={handleInputChange}
                >
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Review Content</label>
                <textarea
                  name="content"
                  className="w-full p-2 border rounded-md min-h-24"
                  value={formData.content}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="border border-gray-300 px-4 py-2 rounded-md"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedReview(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;