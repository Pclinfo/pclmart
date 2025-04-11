import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { RiRefund2Fill } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";
import { IoStarOutline } from "react-icons/io5";
import { BiSolidCoupon } from "react-icons/bi";
import { IoAnalytics } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { BsBank } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";

const Sidebar = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeMenu, setActiveMenu] = useState('');

    const orderSubmenus = [
        { label: 'All Orders', path: '/orders/all' },
        { label: 'Pending Orders', path: '/orders/pending' },
        { label: 'Confirmed Orders', path: '/orders/confirmed' },
        { label: 'Packaging Orders', path: '/orders/packaging' },
        { label: 'Out for Delivery', path: '/orders/out-for-delivery' },
        { label: 'Delivered', path: '/orders/delivered' },
        { label: 'Returned', path: '/orders/returned' },
        { label: 'Failed to Deliver', path: '/orders/failed-to-deliver' },
        { label: 'Cancelled', path: '/orders/cancelled' }
    ];

    const refundSubmenus = [
        { label: 'Pending Refunds', path: '/refunds/pending' },
        { label: 'Approved Refunds', path: '/refunds/approved' },
        { label: 'Rejected Refunds', path: '/refunds/rejected' },
        { label: 'Refunded', path: '/refunds/refunded' }
    ];

    const productsSubmenus = [
        { label: 'Product List', path: '/products/products-list' },
        { label: 'Approved Product List', path: '/products/approved-product-list' },
        { label: 'New Product Request', path: '/products/new-product-request' },
        { label: 'Denied Product Request', path: '/products/denied-product-request' },
        { label: 'Add New Product', path: '/products/add-new-product' },
        { label: 'Product Gallery', path: '/products/product-gallery' },
        { label: 'Request Restock List', path: '/products/request-restock-list' }
    ];


    useEffect(() => {
        if (location.pathname.includes('/orders/')) {
            setActiveMenu('orders');
        } else if (location.pathname.includes('/refunds/')) {
            setActiveMenu('refunds');
        } else if (location.pathname.includes('/products/')) {
            setActiveMenu('products');
        }
    }, [location.pathname]);

    const handleMenuClick = (menuName) => {
        setActiveMenu(prevActive => prevActive === menuName ? '' : menuName);
    };

    const isSubmenuActive = (submenuPath) => {
        return location.pathname === submenuPath;
    };

    const MenuLink = ({ onClick, children, menuName }) => {
        const isActive = activeMenu === menuName;

        return (
            <div
                className={`
                    flex items-center justify-between px-4 py-2.5 rounded-lg cursor-pointer mb-1
                    transition-all duration-200 ease-in-out
                    ${isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                        : 'hover:bg-gray-100 text-gray-700'}
                `}
                onClick={() => handleMenuClick(menuName)}
            >
                <div className="flex items-center gap-3">
                    {children[0]} {/* Icon */}
                    {children[1]} {/* Text */}
                </div>
                <div>
                    {children[2]} {/* Arrow */}
                </div>
            </div>
        );
    };

    const SubMenuLink = ({ to, children }) => {
        const isActive = isSubmenuActive(to);

        return (
            <NavLink
                to={to}
                className={`
                    text-sm px-3 py-2 rounded-md transition-all duration-150 flex items-center
                    ${isActive
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-600'}
                `}
            >
                <div className="w-1.5 h-1.5 rounded-full mr-2 bg-current opacity-70"></div>
                {children}
            </NavLink>
        );
    };

    return (
        <div className="w-[250px] h-screen sticky top-0 overflow-y-auto shadow-lg bg-white">
            <div className="flex flex-col px-3 py-5">

                <div className="sticky top-0 bg-white z-10 mb-5">
                    <div className="relative flex items-center">
                        <IoIosSearch className="absolute left-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search menu"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-blue-300 transition-all"
                        />
                    </div>
                </div>

                {/* Main navigation */}
                <div className="space-y-5">
                    {/* Main Links */}
                    <div className="space-y-1">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                ${isActive
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                    : 'hover:bg-gray-100 text-gray-700'}
                            `}
                        >
                            <RiDashboardFill className="w-5 h-5" />
                            <p className="font-medium">Dashboard</p>
                        </NavLink>

                        <NavLink
                            to="/pos"
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                ${isActive
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                    : 'hover:bg-gray-100 text-gray-700'}
                            `}
                        >
                            <LuShoppingBag className="w-5 h-5" />
                            <p className="font-medium">POS</p>
                        </NavLink>
                    </div>

                    {/* Product Management Section */}
                    <div>
                        <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2">Product Management</p>

                        <div className="space-y-1">
                            <MenuLink menuName="products">
                                <AiOutlineProduct className="w-5 h-5" />
                                <p className="font-medium">Products</p>
                                {activeMenu === 'products' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>

                            {activeMenu === 'products' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {productsSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}

                            <NavLink
                                to="/product-reviews"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                            >
                                <IoStarOutline className="w-5 h-5" />
                                <p className="font-medium">Product Reviews</p>
                            </NavLink>
                        </div>
                    </div>

                    {/* Order Management Section */}
                    <div>
                        <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2">Order Management</p>

                        <div className="space-y-1">
                            <MenuLink menuName="orders">
                                <IoCartOutline className="w-5 h-5" />
                                <p className="font-medium">Orders</p>
                                {activeMenu === 'orders' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>

                            {activeMenu === 'orders' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {orderSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}

                            <MenuLink menuName="refunds">
                                <RiRefund2Fill className="w-5 h-5" />
                                <p className="font-medium">Refund Requests</p>
                                {activeMenu === 'refunds' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>

                            {activeMenu === 'refunds' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {refundSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Promotion Management Section */}
                    <div>
                        <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2">Promotion Management</p>

                        <NavLink
                            to="/coupons"
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                ${isActive
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                    : 'hover:bg-gray-100 text-gray-700'}
                            `}
                        >
                            <BiSolidCoupon className="w-5 h-5" />
                            <p className="font-medium">Coupons</p>
                        </NavLink>
                    </div>

                    {/* Reports & Analytics Section */}
                    <div>
                        <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2">Reports & Analytics</p>

                        <div className="space-y-1">
                            <NavLink
                                to="/transaction-report"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                            >
                                <IoAnalytics className="w-5 h-5" />
                                <p className="font-medium">Transactions Report</p>
                            </NavLink>

                            <NavLink
                                to="/products-report"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                            >
                                <SiSimpleanalytics className="w-5 h-5" />
                                <p className="font-medium">Product Report</p>
                            </NavLink>

                            <NavLink
                                to="/order-report"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                            >
                                <TbDeviceDesktopAnalytics className="w-5 h-5" />
                                <p className="font-medium">Order Report</p>
                            </NavLink>
                        </div>
                    </div>

                    {/* Business Section */}
                    <div>
                        <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2">Business Section</p>

                        <div className="space-y-1">
                            <NavLink
                                to="/withdraws"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                            >
                                <IoWalletOutline className="w-5 h-5" />
                                <p className="font-medium">Withdraws</p>
                            </NavLink>

                            <NavLink
                                to="/bank-information"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                            >
                                <BsBank className="w-5 h-5" />
                                <p className="font-medium">Bank Information</p>
                            </NavLink>

                            <NavLink
                                to="/shop-settings"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                            >
                                <AiOutlineShop className="w-5 h-5" />
                                <p className="font-medium">Shop Settings</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;