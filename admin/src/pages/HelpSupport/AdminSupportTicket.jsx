import React, { useState, useEffect } from 'react';
import { Search, Eye, Send } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const AdminSupportTicket = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All Priority');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.apiUrl}/admin_view_ticket`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTickets(data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleReplySubmit = async (ticketId) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('message', newMessage);
      if (attachment) {
        formData.append('attachment', attachment);
      }

      const response = await fetch(`${config.apiUrl}/admin/tickets/${ticketId}/reply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setNewMessage('');
        setAttachment(null);
        fetchTickets();
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === 'All Priority' || ticket.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'All Status' || ticket.status === selectedStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const TicketCard = ({ ticket }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <img
            src="/placeholder-avatar.png"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-medium">User #{ticket.user_id}</h3>
            <div className="mt-2">
              <p className="text-sm"><span className="font-medium">Subject:</span> {ticket.subject}</p>
              <p className="text-sm"><span className="font-medium">Type:</span> {ticket.type}</p>
              <div className="flex space-x-4">
                <span className="text-sm"><span className="font-medium">Priority:</span> {ticket.priority}</span>
                <span className="text-sm"><span className="font-medium">Date:</span> {new Date(ticket.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setSelectedTicket(ticket)}
          className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </button>
      </div>
    </div>
  );

  const TicketDetail = () => (
    selectedTicket && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <img
                  src="/placeholder-avatar.png"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">User #{selectedTicket.user_id}</h3>
                  <p className="text-sm text-gray-600">Ticket #{selectedTicket.pid}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {selectedTicket.type}
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  {selectedTicket.priority}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-gray-600">{selectedTicket.description}</p>
              {selectedTicket.attachment && (
                <div className="mt-3">
                  <h4 className="font-medium mb-1">Attachment</h4>
                  <a 
                    href={`${config.apiUrl}/${selectedTicket.attachment}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Attachment
                  </a>
                </div>
              )}
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Leave a Message</h4>
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full p-3 border rounded-lg resize-none h-32"
                    placeholder="Write your message here..."
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <input
                      type="file"
                      onChange={(e) => setAttachment(e.target.files[0])}
                      className="text-sm"
                    />
                    <button
                      onClick={() => handleReplySubmit(selectedTicket.pid)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <span>Send Reply</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold mb-4">Support Tickets</h1>
              <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
                <div className="flex space-x-4">
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                  >
                    <option>All Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                  >
                    <option>All Status</option>
                    <option>Open</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredTickets.length > 0 ? (
                filteredTickets.map(ticket => (
                  <TicketCard key={ticket.pid} ticket={ticket} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No tickets found matching your criteria
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <TicketDetail />
    </div>
  );
};

export default AdminSupportTicket;