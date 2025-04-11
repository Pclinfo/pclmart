import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


const ProfileInformation = () => {
    const [activeContent, setActiveContent] = useState('');
    const [basicInfo, setBasicInfo] = useState({
        fullName: 'Admin',
        phoneNumber: '+0xxxxxxxxxxxxxxx',
        email: 'admin@admin.com'
    });

    const [password, setPassword] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const handleBasicInfoChange = (field, value) => {
        setBasicInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePasswordChange = (field, value) => {
        setPassword(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar setActiveContent={setActiveContent} />
                <div className="flex-1 p-4">
                    {activeContent}
                    <div className="min-h-screen bg-gray-50">
                        {/* Header with Dashboard button */}
                        <div className="bg-white p-4 shadow flex justify-between items-center">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                <h1 className="text-xl font-medium text-gray-800">Profile Information</h1>
                            </div>
                            <button className="bg-blue-700 text-white px-4 py-2 rounded flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                                    <path fillRule="evenodd" d="M3 8a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                                </svg>
                                Dashboard
                            </button>
                        </div>

                        {/* Main content */}
                        <div className="container mx-auto px-4 py-6 md:px-6">
                            {/* Sidebar and content container */}
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Sidebar */}
                                <div className="w-full md:w-64 bg-white rounded-lg shadow">
                                    <ul>
                                        <li className="border-b">
                                            <button className="flex items-center w-full p-4 hover:bg-blue-50 text-left">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.5 10a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0zm9.5-7.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" clipRule="evenodd" />
                                                </svg>
                                                Basic Information
                                            </button>
                                        </li>
                                        <li>
                                            <button className="flex items-center w-full p-4 hover:bg-blue-50 text-left">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                                Password
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    {/* Banner with illustration */}
                                    <div className="bg-blue-50 rounded-lg mb-6 relative overflow-hidden h-40">
                                        <div className="absolute inset-0">
                                            <svg className="h-full w-full text-blue-100" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0,100 C150,0 250,180 400,60" stroke="currentColor" fill="none" strokeWidth="3" />
                                                <path d="M0,120 C120,40 280,180 400,80" stroke="currentColor" fill="none" strokeWidth="2" />
                                                <path d="M0,150 C100,80 300,190 400,110" stroke="currentColor" fill="none" strokeWidth="2" />
                                            </svg>
                                        </div>
                                        <div className="absolute right-8 bottom-0">
                                            <div className="bg-white rounded-full p-2 w-20 h-20 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8z" />
                                                    <path d="M2 12a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L8.586 12H2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Basic Information Form */}
                                    <div className="bg-white rounded-lg shadow mb-6 p-6">
                                        <div className="flex items-center mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            <h2 className="text-lg font-medium">Basic Information</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <div className="flex items-center mb-1">
                                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                                    <span className="text-red-500 ml-1">*</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={basicInfo.fullName}
                                                    onChange={(e) => handleBasicInfoChange('fullName', e.target.value)}
                                                />
                                            </div>

                                            <div>
                                                <div className="flex items-center mb-1">
                                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                                    <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                                                </div>
                                                <div className="flex">
                                                    <div className="flex items-center bg-gray-100 border border-gray-300 rounded-l px-2">
                                                        <span className="text-sm text-gray-600">+1</span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="flex-1 border border-gray-300 border-l-0 rounded-r p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        value={basicInfo.phoneNumber}
                                                        onChange={(e) => handleBasicInfoChange('phoneNumber', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center mb-1">
                                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                                    <span className="text-red-500 ml-1">*</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="email"
                                                    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={basicInfo.email}
                                                    onChange={(e) => handleBasicInfoChange('email', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6 text-right">
                                            <button className="bg-blue-700 text-white px-6 py-2 rounded">
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>

                                    {/* Password Form */}
                                    <div className="bg-white rounded-lg shadow p-6">
                                        <div className="flex items-center mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                            <h2 className="text-lg font-medium">Change Password</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <div className="flex items-center mb-1">
                                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                                    <span className="text-red-500 ml-1">*</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="password"
                                                        className="w-full border border-gray-300 rounded p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Enter new password"
                                                        value={password.newPassword}
                                                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                                                    />
                                                    <button className="absolute inset-y-0 right-0 px-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center mb-1">
                                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                                    <span className="text-red-500 ml-1">*</span>
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="password"
                                                        className="w-full border border-gray-300 rounded p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Enter confirm password"
                                                        value={password.confirmPassword}
                                                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                                                    />
                                                    <button className="absolute inset-y-0 right-0 px-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 text-right">
                                            <button className="bg-blue-700 text-white px-6 py-2 rounded">
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInformation;