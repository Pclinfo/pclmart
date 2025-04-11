import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row flex-grow bg-gray-50">
        <Sidebar />
        <div className="flex-grow flex flex-col items-center px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">Track Order</h1>
          
          <div className="w-full max-w-3xl">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Order id"
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Your phone number"
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button 
                type="submit" 
                className="md:w-48 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
              >
                Track Order
              </button>
            </form>
            
            <div className="flex flex-col items-center mt-8">
              <div className="w-20 h-20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-gray-300">
                  <rect x="1" y="3" width="15" height="10" rx="1" />
                  <path d="M16 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1" />
                  <circle cx="5.5" cy="15.5" r="2.5" />
                  <circle cx="17.5" cy="15.5" r="2.5" />
                </svg>
              </div>
              <p className="text-center text-gray-500 max-w-md">
                Enter your order ID & phone number to get delivery updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackOrder