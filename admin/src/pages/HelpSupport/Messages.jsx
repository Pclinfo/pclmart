import React, { useState, useEffect } from 'react';
import { Search, Eye, Trash2, Send, RefreshCw } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import config from '../../config';

const Messages = () => {
  const [activeContent, setActiveContent] = useState(' ');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [newEmail, setNewEmail] = useState({
    to: '',
    subject: '',
    body: ''
  });
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' or 'sent'
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [activeTab]);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === 'inbox' ? 'read_emails' : 'get_all_emails';
      const response = await fetch(`${config.apiUrl}/${endpoint}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch ${activeTab} messages`);
      }
      
      const data = await response.json();
      console.log('response messages:', data); 
      
      // Format and filter messages based on active tab
      let formattedMessages = [];
      if (Array.isArray(data)) {
        formattedMessages = data
          .filter(email => {
            // Just check if it has a type property, otherwise for inbox assume it's a received email
            if (activeTab === 'inbox') {
              return email.type === undefined || email.type === 'received';
            } else {
              return email.type === 'sent';
            }
          })
          .map((email, index) => {
            // For inbox emails
            if (activeTab === 'inbox') {
              return {
                id: index + 1,
                uid: email.uid || '',
                customerName: email.sender_name || email.sender || 'Unknown',
                contact: {
                  email: email.sender_email || email.sender || '',
                  phone: 'N/A'
                },
                subject: email.subject || '(No subject)',
                message: email.body || 'N/A',
                time: email.received_at || new Date().toLocaleString(),
                replyStatus: email.reply_status || 'No'
              };
            } else {
              // Sent emails
              return {
                id: index + 1,
                uid: email.id ? email.id.toString() : '',
                customerName: email.recipient_name || 'Unknown',
                contact: {
                  email: email.recipient_email || '',
                  phone: 'N/A'
                },
                subject: email.subject || '(No subject)',
                message: email.body || '',
                time: email.created_at || new Date().toLocaleString(),
                replyStatus: 'Sent'
              };
            }
          });
      }
      
      setMessages(formattedMessages);
    } catch (err) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  const refreshEmails = async () => {
    setRefreshing(true);
    setError(null);
    try {
      // FIXED: Changed to use the correct endpoint
      const response = await fetch(`${config.apiUrl}/read_emails`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to refresh emails');
      }
      
      await fetchMessages();
    } catch (err) {
      setError(err.message);
      console.error('Error refreshing emails:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      fetchMessages();
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = messages.filter(
      msg =>
        msg.customerName.toLowerCase().includes(query) ||
        (msg.contact.phone && msg.contact.phone.includes(query)) ||
        msg.contact.email.toLowerCase().includes(query) ||
        (msg.subject && msg.subject.toLowerCase().includes(query))
    );
    setMessages(filtered);
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setShowReplyModal(true);
  };

  const handleDeleteMessage = async (uid) => {
  if (window.confirm('Are you sure you want to delete this message?')) {
    try {
      const response = await fetch(`${config.apiUrl}/delete_emails/${uid}`, {
        method: 'DELETE', // Changed from GET to DELETE
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete message');
      }

      // Remove the deleted message from the UI
      setMessages(messages.filter(msg => msg.uid !== uid));
    } catch (err) {
      console.error('Error deleting message:', err);
      alert(`Failed to delete message: ${err.message}`);
    }
  }
};

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      alert('Please enter a reply message');
      return;
    }

    try {
      // FIXED: Changed endpoint from 'send-email' to 'send_email' to match backend
      const response = await fetch(`${config.apiUrl}/send_email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: selectedMessage.contact.email,
          subject: `Re: ${selectedMessage.subject}`,
          body: replyText,
          original_uid: selectedMessage.uid
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send email');
      }

      // Update the message's reply status in the UI
      setMessages(messages.map(msg =>
        msg.uid === selectedMessage.uid
          ? { ...msg, replyStatus: 'Yes' }
          : msg
      ));

      setShowReplyModal(false);
      setReplyText('');
      setSelectedMessage(null);
      alert('Reply sent successfully!');
    } catch (err) {
      console.error('Error sending reply:', err);
      alert(`Failed to send reply: ${err.message}`);
    }
  };

  const handleCompose = async () => {
    if (!newEmail.to.trim() || !newEmail.subject.trim() || !newEmail.body.trim()) {
      alert('Please fill all the fields');
      return;
    }

    try {
      // FIXED: Changed endpoint from 'send-email' to 'send_email' to match backend
      const response = await fetch(`${config.apiUrl}/send_email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to_email: newEmail.to,
          subject: newEmail.subject,
          body: newEmail.body
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send email');
      }

      setShowComposeModal(false);
      setNewEmail({ to: '', subject: '', body: '' });
      alert('Email sent successfully!');
      
      // If currently viewing sent tab, refresh to show the new email
      if (activeTab === 'sent') {
        fetchMessages();
      }
    } catch (err) {
      console.error('Error sending email:', err);
      alert(`Failed to send email: ${err.message}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h1 className="text-xl font-semibold flex items-center">
                <span className="bg-orange-100 p-2 rounded-lg mr-2">📝</span>
                Email Messages
              </h1>
              <div className="flex mt-4 sm:mt-0">
                <div className="flex border rounded-lg overflow-hidden">
                  <button 
                    className={`px-4 py-2 ${activeTab === 'inbox' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    onClick={() => setActiveTab('inbox')}
                  >
                    Inbox
                  </button>
                  <button 
                    className={`px-4 py-2 ${activeTab === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    onClick={() => setActiveTab('sent')}
                  >
                    Sent
                  </button>
                </div>
                <button 
                  className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  onClick={() => setShowComposeModal(true)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Compose
                </button>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by Name, Email, or Subject"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  onClick={fetchMessages}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Refresh List'}
                </button>
                {activeTab === 'inbox' && (
                  <button 
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                    onClick={refreshEmails}
                    disabled={refreshing}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? 'Checking...' : 'Check New Emails'}
                  </button>
                )}
              </div>
            </div>

            {/* Loading and Error States */}
            {loading && <p className="text-center py-4">Loading messages...</p>}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                <p>Error: {error}</p>
                <button 
                  className="text-red-700 underline mt-1"
                  onClick={fetchMessages}
                >
                  Try again
                </button>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">SL</th>
                    <th className="py-3 px-4 text-left">
                      {activeTab === 'inbox' ? 'Sender Name' : 'Recipient Name'}
                    </th>
                    <th className="py-3 px-4 text-left">Contact Info</th>
                    <th className="py-3 px-4 text-left">Subject</th>
                    <th className="py-3 px-4 text-left">Detail Message</th>
                    <th className="py-3 px-4 text-left">Time & Date</th>
                    <th className="py-3 px-4 text-left">
                      {activeTab === 'inbox' ? 'Reply Status' : 'Status'}
                    </th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length === 0 && !loading ? (
                    <tr>
                      <td colSpan="7" className="py-4 text-center text-gray-500">
                        No messages found
                      </td>
                    </tr>
                  ) : (
                    messages.map((message) => (
                      <tr key={message.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{message.id}</td>
                        <td className="py-3 px-4">{message.customerName}</td>
                        <td className="py-3 px-4">
                          {message.contact.phone !== 'N/A' && <div>{message.contact.phone}</div>}
                          <div className={message.contact.phone === 'N/A' ? "" : "text-gray-500"}>{message.contact.email}</div>
                        </td>
                        <td className="py-3 px-4">{message.subject}</td>
                        <td className="py-3 px-4">{message.message}</td>
                        <td className="py-3 px-4">{message.time}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            activeTab === 'inbox' 
                              ? (message.replyStatus === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {activeTab === 'inbox' ? message.replyStatus : 'Sent'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                              onClick={() => handleViewMessage(message)}
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              className="p-1 text-red-500 hover:bg-red-50 rounded"
                              onClick={() => handleDeleteMessage(message.uid)}
                            >
                              <Trash2 className="w-5 h-5" />
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

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">
              {activeTab === 'inbox' 
                ? `Reply to ${selectedMessage.customerName}`
                : `Message to ${selectedMessage.customerName}`
              }
            </h2>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">Subject: {selectedMessage.subject}</p>
              <p className="text-gray-600 mt-2">{selectedMessage.message || 'No message content available'}</p>
            </div>

            {activeTab === 'inbox' && (
              <div className="mb-4">
                <label className="block mb-2 font-medium">Your Reply</label>
                <textarea
                  className="w-full p-3 border rounded-lg h-40 focus:outline-none focus:border-blue-500"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here..."
                ></textarea>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => {
                  setShowReplyModal(false);
                  setSelectedMessage(null);
                  setReplyText('');
                }}
              >
                Close
              </button>
              {activeTab === 'inbox' && (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={handleSendReply}
                >
                  Send Reply
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-4">Compose New Email</h2>

            <div className="mb-4">
              <label className="block mb-2 font-medium">To:</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                value={newEmail.to}
                onChange={(e) => setNewEmail({...newEmail, to: e.target.value})}
                placeholder="recipient@example.com"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Subject:</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                value={newEmail.subject}
                onChange={(e) => setNewEmail({...newEmail, subject: e.target.value})}
                placeholder="Enter subject"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Message:</label>
              <textarea
                className="w-full p-3 border rounded-lg h-40 focus:outline-none focus:border-blue-500"
                value={newEmail.body}
                onChange={(e) => setNewEmail({...newEmail, body: e.target.value})}
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => {
                  setShowComposeModal(false);
                  setNewEmail({ to: '', subject: '', body: '' });
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleCompose}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;