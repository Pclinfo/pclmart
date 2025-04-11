import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Message = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
                <Sidebar />

            </div>
        </div>
    )
}

export default Message
