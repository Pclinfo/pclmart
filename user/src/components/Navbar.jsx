import React, { useState, useContext, useEffect } from 'react';
import { FaPhone, FaRegHeart, FaSearch, FaStore } from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdArrowForward } from 'react-icons/io';
import { IoLogInOutline, IoCartOutline, IoLogOutOutline } from "react-icons/io5";
import { HiMenu } from 'react-icons/hi';
import { CgProfile } from "react-icons/cg";
import { BiCategory } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import config from '../pages/config';
import assets from '../assets/pcl_mart.svg';


const categories = {
    "Audio": {
        "All": [],
        "Bluetooth Headphones": [],
        "Wired Headphones": [],
        "True Wireless Earbuds": [],
        "Bluetooth Speakers": [],
        "Soundbars": [],
        "Home Theatres": [],
        "TV Streaming Device": [],
        "Remote Control": [],
        "Headphones Pouch & Case Covers": []
    },
    "Tablets": {
        "All": [],
        "Tablets With Call Facility": [],
        "Tablets Without Call Facility": []
    },
    "Storage": {
        "All": [],
        "Mobile Memory Card": [],
        "Computer Storage Pendrive": [],
        "Mobile Storage Pendrive": [],
        "External HardDrive": [],
        "Internal HardDrive": []
    },
    "Smart Wearables": {
        "All": [],
        "Smart Bands": [],
        "Smart Glasses": []
    },
    "Smart Home automation": {
        "All": [],
        "Smart Assistants": [],
        "Smart Lights": [],
        "Smart Cameras": [],
        "Smart Switches": [],
        "Smart Door locks": [],
        "Sensors & Alarms": []
    },
    "Powerbank": {
        "All": [],
        "Powerbank": []
    },
    "MobileAccessory": {
        "All": [],
        "Plain Cases": [],
        "Designer Cases": [],
        "Camera Lens Protectors": [],
        "Tablet Accessories": [],
        "Mobile Cable": [],
        "Mobile Pouches": [],
        "Mobile Flash": [],
        "Mobile Holder": [],
        "Mobile USBGadget": [],
        "Mobiles Accessories Combos": []
    },
    "Laptop and Desktop": {
        "All": [],
        "Laptops": [],
        "Gaming Laptops": [],
        "Desktop PCs": [],
        "All In One PCs": [],
        "Tower PCs": [],
        "PC Finder": []
    },
    "Computer Peripherals": {
        "All": [],
        "Printers": [],
        "Monitors": [],
        "Projectors": [],
        "Portable Projectors": [],
        "Ink Cartridges": [],
        "Ink Bottles": [],
        "Receipt Printers": [],
        "Lamination Machines": [],
        "Barcode Scanners": [],
        "Currency Detectors": []
    }
};

const NavButton = ({ icon, text, to, showTextOnMobile = false, onClick }) => {
    const content = (
        <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-xl">{icon}</span>
            <span className={`ml-1 text-sm ${showTextOnMobile ? 'block' : 'hidden'} md:block`}>
                {text}
            </span>
        </div>
    );

    return onClick ? (
        <div className="cursor-pointer" onClick={onClick}>
            {content}
        </div>
    ) : (
        <Link to={to}>
            {content}
        </Link>
    );
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Only handle profile menu and mobile category menu
            if (isProfileMenuOpen && !event.target.closest('.profile-menu-container')) {
                setIsProfileMenuOpen(false);
            }
            // Only close category menu on mobile
            if (window.innerWidth < 768 && isCategoryOpen && !event.target.closest('.category-menu-container')) {
                setIsCategoryOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileMenuOpen, isCategoryOpen]);


    const ProfileMenu = () => (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg z-50 py-2">
            <Link
                to="/profile"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsProfileMenuOpen(false)}
            >
                <CgProfile className="mr-2 text-xl" />
                <span>Profile</span>
            </Link>
            <div
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                    handleLogout();
                    setIsProfileMenuOpen(false);
                }}
            >
                <IoLogOutOutline className="mr-2 text-xl" />
                <span>Logout</span>
            </div>
        </div>
    );

    const CategoryMenu = () => (
        <div className="absolute left-0 top-full z-50 w-full md:w-[800px] bg-white shadow-xl rounded-lg flex">
            {/* Main Categories */}
            <div className="w-full md:w-64 border-r">
                <ul className="py-2">
                    {Object.keys(categories).map((category) => (
                        <li
                            key={category}
                            className={`px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100 ${activeCategory === category ? 'bg-blue-50 text-blue-600' : ''
                                }`}
                            onMouseEnter={() => setActiveCategory(category)}
                        >
                            <span>{category}</span>
                            <IoMdArrowForward className="text-gray-400" />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Subcategories */}
            {activeCategory && (
                <div className="hidden md:block flex-1 bg-white p-4">
                    <h3 className="text-lg font-semibold mb-4">More in {activeCategory}</h3>
                    <ul className="grid grid-cols-2 gap-4">
                        {Object.keys(categories[activeCategory]).map((subCategory) => (
                            <li
                                key={subCategory}
                                className="hover:text-blue-600 cursor-pointer"
                            >
                                {subCategory}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Mobile Subcategories */}
            <div className="md:hidden w-full">
                <ul className="py-2">
                    {activeCategory &&
                        Object.keys(categories[activeCategory]).map((subCategory) => (
                            <li
                                key={subCategory}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {subCategory}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );

    return (
        <nav className="w-full shadow-lg">
            {/* Top Bar */}
            <div className="bg-gray-100">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <FaPhone className="text-blue-600" />
                            <a href="tel:+1234567890" className="text-sm">+1 234 567 890</a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <select className="appearance-none bg-transparent pr-8 text-sm cursor-pointer focus:outline-none">
                                    <option>USD</option>
                                    <option>EUR</option>
                                    <option>GBP</option>
                                </select>
                                <IoMdArrowDropdown className="absolute right-0 top-1/2 -translate-y-1/2" />
                            </div>
                            <div className="relative">
                                <select className="appearance-none bg-transparent pr-8 text-sm cursor-pointer focus:outline-none">
                                    <option>English</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                </select>
                                <IoMdArrowDropdown className="absolute right-0 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Bar */}
            <div className="bg-white">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/">
                                <img src={assets} alt="PCL Mart" className="h-8" />
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <div className="order-last md:order-none w-full md:w-auto md:flex-1 md:max-w-xl">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for items..."
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <FaSearch className="text-xl" />
                                </button>
                            </div>
                        </div>

                        {/* Icons Section */}
                        <div className="flex items-center">
                            <button
                                className="md:hidden mr-4"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                <HiMenu className="text-2xl" />
                            </button>

                            {/* Desktop Icons */}
                            <div className="hidden md:flex items-center space-x-4">
                                {!user ? (
                                    <NavButton icon={<IoLogInOutline />} text="Login" to="/login" />
                                ) : (
                                    <div className="relative profile-menu-container">
                                        <NavButton
                                            icon={<CgProfile />}
                                            text="Profile"
                                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                        />
                                        {isProfileMenuOpen && <ProfileMenu />}
                                    </div>
                                )}
                                <NavButton icon={<FaRegHeart />} text="Wishlist" to="/wishlist" />
                            </div>

                            {/* Cart - Always Visible */}
                            <div className="flex items-center ml-4">
                                <NavButton icon={<IoCartOutline />} text="My Cart" to="/cart" showTextOnMobile={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-t">
                <div className="container mx-auto px-4">
                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        {isMenuOpen && (
                            <div className="py-4 space-y-4">
                                {!user ? (
                                    <NavButton icon={<IoLogInOutline />} text="Login" to="/login" showTextOnMobile={true} />
                                ) : (
                                    <>
                                        <NavButton icon={<CgProfile />} text="Profile" to="/profile" showTextOnMobile={true} />
                                        <div
                                            className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            <IoLogOutOutline className="text-xl" />
                                            <span className="ml-1 text-sm">Logout</span>
                                        </div>
                                    </>
                                )}
                                <NavButton icon={<FaRegHeart />} text="Wishlist" to="/wishlist" showTextOnMobile={true} />
                                <div className="border-t pt-4">
                                    <button
                                        className="flex items-center space-x-1 w-full py-2"
                                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                    >
                                        <BiCategory />
                                        <span>Categories</span>
                                        <IoMdArrowDropdown className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isCategoryOpen && <CategoryMenu />}

                                    <Link to="/" className="block py-2">Shop</Link>
                                    <Link to="/brands" className="block py-2">Brands</Link>
                                    <Link to="/discount-products" className="block py-2">Discount Products</Link>
                                    <Link to="/manufacturers-sellers" className="block py-2">All Manufacturers & Sellers</Link>
                                    <Link to="http://192.168.0.105:5175/login" className="flex items-center space-x-2 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg mt-4">
                                        <FaStore />
                                        <span>Seller Login</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center justify-between py-4">
                        <div className="flex items-center space-x-6">
                            <div className="relative group category-menu-container">
                                <button
                                    className="flex items-center space-x-1 hover:text-blue-600"
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                >
                                    <span>Categories</span>
                                    <IoMdArrowDropdown className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isCategoryOpen && <CategoryMenu />}
                            </div>
                            <Link to="/" className="hover:text-blue-600 transition-colors">Shop</Link>
                            <Link to="/brands" className="hover:text-blue-600 transition-colors">Brands</Link>
                            <Link to="/discount-products" className="hover:text-blue-600 transition-colors">Discount Products</Link>
                            <Link to="/manufacturers-sellers" className="hover:text-blue-600 transition-colors">All Manufacturers & Sellers</Link>
                        </div>
                        <Link
                            to="/seller/login"
                            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                        >
                            <FaStore />
                            <span>Seller Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;