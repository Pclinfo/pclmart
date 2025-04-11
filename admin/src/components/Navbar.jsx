import React, { useState, useContext } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoCart } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { IoLanguage } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import AuthContext from '../context/AuthContext';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/pcl_mart.svg';

const Navbar = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                localStorage.removeItem('token');
                logout();
                navigate('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleSettingsClick = () => {
        navigate('/profile-information');
    };

    const navItems = [
        { icon: IoLanguage, label: "Language", onClick: () => console.log("Language clicked") },
        { icon: CgWebsite, label: "Website", onClick: () => console.log("Website clicked") },
        { icon: MdMessage, label: "Messages", onClick: () => console.log("Messages clicked") },
        { icon: IoCart, label: "Cart", onClick: () => console.log("Cart clicked") },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white backdrop-blur-md bg-opacity-95 border-b border-gray-100">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-18">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            src={assets}
                            alt="PCL Mart Logo"
                            className="h-8 w-auto"
                        />
                    </div>

                    {/* Desktop Navigation - added ml-auto to push nav items to the right */}
                    <div className="hidden md:flex items-center space-x-7 ml-auto">
                        {navItems.map((item, index) => (
                            <button 
                                key={index}
                                onClick={item.onClick}
                                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center group"
                            >
                                <item.icon className="w-5 h-5 group-hover:text-blue-500 transition-colors duration-200" />
                                <span className="ml-1 text-sm font-medium">{item.label}</span>
                            </button>
                        ))}

                        {/* Profile dropdown */}
                        <div className="relative">
                            <button
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                                onClick={toggleProfileMenu}
                            >
                                <CgProfile className="w-6 h-6" />
                                <span className="ml-1 text-sm font-medium">Profile</span>
                            </button>

                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transform transition-all duration-150 ease-in-out">
                                    <button
                                        className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => {
                                            handleSettingsClick();
                                            setIsProfileMenuOpen(false);
                                        }}
                                    >
                                        <IoSettingsOutline className="mr-3 h-5 w-5 text-gray-500" />
                                        Settings
                                    </button>
                                    <button
                                        className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        onClick={() => {
                                            handleLogout();
                                            setIsProfileMenuOpen(false);
                                        }}
                                    >
                                        <IoLogOutOutline className="mr-3 h-5 w-5 text-gray-500" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <button
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                            onClick={toggleMobileMenu}
                        >
                            {isMobileMenuOpen ? (
                                <IoClose className="h-6 w-6" />
                            ) : (
                                <HiMenuAlt3 className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4">
                    <div className="space-y-2 pt-2 pb-3">
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    item.onClick();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center px-3 py-2 w-full text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                <item.icon className="h-5 w-5 text-gray-500 mr-3" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </button>
                        ))}
                        <div className="border-t border-gray-100 my-2"></div>
                        <button
                            className="flex items-center px-3 py-2 w-full text-gray-700 hover:bg-gray-50 rounded-md"
                            onClick={() => {
                                handleSettingsClick();
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <IoSettingsOutline className="h-5 w-5 text-gray-500 mr-3" />
                            <span className="text-sm font-medium">Settings</span>
                        </button>
                        <button
                            className="flex items-center px-3 py-2 w-full text-gray-700 hover:bg-gray-50 rounded-md"
                            onClick={() => {
                                handleLogout();
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <IoLogOutOutline className="h-5 w-5 text-gray-500 mr-3" />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;