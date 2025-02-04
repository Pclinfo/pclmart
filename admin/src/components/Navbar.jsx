import React, { useState, useContext } from 'react'
import { CgProfile } from "react-icons/cg"
import { IoCart } from "react-icons/io5"
import { MdMessage } from "react-icons/md"
import { CgWebsite } from "react-icons/cg"
import { IoLanguage } from "react-icons/io5"
import { IoSettingsOutline } from "react-icons/io5"
import { IoLogOutOutline } from "react-icons/io5"
import AuthContext from '../context/AuthContext';
import config from '../config';
import assets from '../assets/pcl_mart.svg'

const Navbar = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen)
    }

    const { user, logout } = useContext(AuthContext);


    const handleLogout = async () => {
        try {
            // Call backend logout endpoint
            const response = await fetch(`${config.apiUrl}/logout`, {
                method: 'POST',
                credentials: 'include', // Important for sending cookies
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                // Clear local storage or any client-side auth state
                localStorage.removeItem('token');

                // Call the logout method from AuthContext to update app state
                logout();

                // Redirect to login page
                navigate('/login'); // Assuming you're using react-router
            } else {
                // Handle logout error
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    return (
        <div className='sticky top-0 z-50 bg-white shadow-md flex items-center py-2 px-[4%] justify-between'>
            <div className="flex justify-center  ">
                <img
                    src={assets}
                    alt="PCL Mart Logo"
                    className="h-8 w-auto object-contain"
                />
            </div>
            <div className='flex items-center space-x-6'>
                <IoLanguage className='w-7 h-7 cursor-pointer' />
                <CgWebsite className='w-7 h-7 cursor-pointer' />
                <MdMessage className='w-7 h-7 cursor-pointer' />
                <IoCart className='w-7 h-7 cursor-pointer' />

                <div className='relative'>
                    <CgProfile
                        className='w-7 h-7 cursor-pointer'
                        onClick={toggleProfileMenu}
                    />

                    {isProfileMenuOpen && (
                        <div className='absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg'>
                            <div
                                className='flex items-center p-3 hover:bg-gray-100 cursor-pointer'
                                onClick={() => {
                                    // Add settings logic
                                    setIsProfileMenuOpen(false)
                                }}
                            >
                                <IoSettingsOutline className='mr-2' />
                                Settings
                            </div>
                            <div
                                className='flex items-center p-3 hover:bg-gray-100 cursor-pointer'
                                onClick={() => {
                                    handleLogout();
                                    setIsProfileMenuOpen(false)
                                }}
                            >
                                <IoLogOutOutline className='mr-2' />
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar