import React, { useState, useEffect } from 'react';
import { Calendar, Plus, X, Trash2, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import config from '../pages/config';

const SupportTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);

  const [ticketForm, setTicketForm] = useState({
    subject: '',
    type: '',
    priority: '',
    description: '',
    attachment: null
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const fetchTickets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${config.apiUrl}/view-ticket`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch tickets');
      }

      const data = await response.json();
      setTickets(data.ticket || []); 
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTicketForm(prev => ({
      ...prev,
      attachment: file
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!ticketForm.subject.trim()) errors.subject = 'Subject is required';
    if (!ticketForm.type) errors.type = 'Type is required';
    if (!ticketForm.priority) errors.priority = 'Priority is required';
    if (!ticketForm.description.trim()) errors.description = 'Description is required';
    return errors;
  };

  const validateFile = (file) => {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; 

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only PDF, PNG, JPG, DOC, and DOCX files are allowed.');
    }
    if (file.size > maxSize) {
      throw new Error('File size exceeds 5MB limit.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setError('Please fill in all required fields');
        return;
      }

      if (ticketForm.attachment) {
        validateFile(ticketForm.attachment);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const formData = new FormData();
      Object.keys(ticketForm).forEach(key => {
        if (ticketForm[key] !== null) {
          formData.append(key, ticketForm[key]);
        }
      });

      const response = await fetch(`${config.apiUrl}/create-ticket`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create ticket');
      }

      await fetchTickets();
      setIsModalOpen(false);
      setTicketForm({
        subject: '',
        type: '',
        priority: '',
        description: '',
        attachment: null
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (ticketId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.apiUrl}/delete-ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ pid: ticketId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete ticket');
      }

      await fetchTickets();
    } catch (error) {
      setError(error.message);
    }
  };

  const TicketModal = () => (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Submit new ticket</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">You will get response.</p>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="w-full p-2 border rounded"
                  value={ticketForm.subject}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="type"
                    className="w-full p-2 border rounded"
                    value={ticketForm.type}
                    onChange={handleInputChange}
                  >
                    <option value="">Choose type</option>
                    <option value="Website Problem">Website Problem</option>
                    <option value="Partner Request">Partner Request</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Info Inquiry">Info Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select
                    name="priority"
                    className="w-full p-2 border rounded"
                    value={ticketForm.priority}
                    onChange={handleInputChange}
                  >
                    <option value="">Choose priority</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Describe your issue</label>
                <textarea
                  name="description"
                  className="w-full p-2 border rounded h-32"
                  value={ticketForm.description}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Attachment</label>
                <div className="border-2 border-dashed rounded p-4 text-center">
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="w-16 h-16 mx-auto border rounded flex items-center justify-center">
                      <Plus className="w-6 h-6 text-gray-400" />
                    </div>
                    {ticketForm.attachment && (
                      <p className="mt-2 text-sm text-gray-600">
                        {ticketForm.attachment.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isLoading ? 'Submitting...' : 'Submit a ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex-1 p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Support Ticket</h1>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add New Ticket
                </button>
              </div>

              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="block text-sm font-medium text-gray-700 mb-2">
                {isLoading ? (
                  <div className="text-center py-4">Loading tickets...</div>
                ) : (
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left p-4">Topic</th>
                        <th className="text-left p-4">Submission date</th>
                        <th className="text-left p-4">Type</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Action</th>
                        <th className="text-left p-4">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets && tickets.length > 0 ? (
                        tickets.map((ticket) => (
                          <tr key={ticket.pid} className="border-b hover:bg-gray-50">
                            <td className="p-4">{ticket.subject}</td>
                            <td className="p-4">{formatDate(ticket.created_at)}</td>
                            <td className="p-4">{ticket.type}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-sm ${ticket.priority === 'Urgent'
                                  ? 'bg-red-100 text-red-800'
                                  : ticket.priority === 'High'
                                    ? 'bg-orange-100 text-orange-800'
                                    : ticket.priority === 'Medium'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-green-100 text-green-800'
                                }`}>
                                {ticket.priority}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {ticket.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <button
                                className="p-2 hover:bg-gray-100 rounded text-red-500 hover:text-red-700"
                                onClick={() => handleDelete(ticket.pid)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-4 text-gray-500">
                            No tickets found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          <TicketModal />
        </div>
      </div>
    </div>
  );
};

export default SupportTicket;