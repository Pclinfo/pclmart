import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const WishList = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8">
          <div className="bg-white rounded-lg shadow-sm p-6 w-full">
            <h1 className="text-xl font-semibold text-gray-800 mb-6">Wishlist</h1>
            
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 mb-6 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  <path d="M9 14l2 2 4-4" strokeWidth="2" stroke="white" fill="none" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6">You Have Not Added Product To Wishlist Yet!</p>
              <a href="#" className="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 transition-colors rounded-md font-medium">
                Explore More
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default WishList