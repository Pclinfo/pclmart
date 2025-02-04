import React, { useState } from 'react';
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
        { label: 'Refunded', path: '/refunds/refunded' },
        { label: 'Processing Refunds', path: '/refunds/processing' },
        { label: 'Completed Refunds', path: '/refunds/completed' },
        { label: 'Customer Disputes', path: '/refunds/disputes' },
        { label: 'Refund History', path: '/refunds/history' }
    ];

    const productsSubmenus = [
        { label: 'Product List', path: '/products/products-list' },
        { label: 'Approved Product List', path: '/products/approved-product-list' },
        { label: 'New Product Request', path: '/products/new-product-request' },
        { label: 'Denied Product Request', path: '/products/denied-product-request' },
        { label: 'Add New Product', path: '/products/add-new-product' },
        { label: 'Product Gallery', path: '/products/product-gallery' },
        { label: 'Bulk Import', path: '/products/bulk-import' },
        { label: 'Request Restock List', path: '/products/request-restock-list' }
    ];

    const handleMenuClick = (menuName) => {
        setActiveMenu(prevActive => prevActive === menuName ? '' : menuName);
    };

    const isSubmenuActive = (submenuPath) => {
        return location.pathname.startsWith(submenuPath);
    };

    const MenuLink = ({ onClick, children, menuName }) => {
        const isActive = activeMenu === menuName;

        return (
            <div
                className={`
                    flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l cursor-pointer
                    ${isActive ? 'bg-blue-50 border-blue-400' : ''}
                `}
                onClick={() => handleMenuClick(menuName)}
            >
                {children}
            </div>
        );
    };

    const SubMenuLink = ({ to, children }) => {
        const isActive = isSubmenuActive(to);

        return (
            <NavLink
                to={to}
                className={`
                    text-sm px-2 py-1 rounded
                    ${isActive ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}
                `}
            >
                {children}
            </NavLink>
        );
    };



    return (
        <div className="w-[18%] h-screen sticky top-0 overflow-y-auto border-r-2">
            <div className="flex flex-col gap-1 pt-6 pl-[2%] text-[14px] pb-6">
                <div className="sticky top-0 bg-white z-5">
                    <div className="relative flex flex-row items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search menu"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                        <IoIosSearch className="absolute right-2 w-6 h-6 text-gray-500" />
                    </div>
                </div>
                <NavLink to="/dashboard" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                    <RiDashboardFill className="w-6 h-6" />
                    <p className="hidden md:block">Dashboard</p>
                </NavLink>

                <NavLink to="/pos" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                    <LuShoppingBag className="w-6 h-6" />
                    <p className="hidden md:block">POS</p>
                </NavLink>

                <p className="font-medium mt-2">Product Management</p>

                <div>
                    <MenuLink menuName="products">
                        <AiOutlineProduct className="w-6 h-6" />
                        <p className="hidden md:block">Products</p>
                        {activeMenu === 'products' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'products' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {productsSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <NavLink to="/product-reviews" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <IoStarOutline className="w-6 h-6" />
                        <p className="hidden md:block">Product Reviews</p>
                    </NavLink>
                </div>

                <p className="font-medium mt-2">Order Management</p>


                <div>
                    <MenuLink menuName="orders">
                        <IoCartOutline className="w-6 h-6" />
                        <p className="hidden md:block">Orders</p>
                        {activeMenu === 'orders' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'orders' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {orderSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>


                <div>
                    <MenuLink menuName="refunds">
                        <RiRefund2Fill className="w-6 h-6" />
                        <p className="hidden md:block">Refund Requests</p>
                        {activeMenu === 'refunds' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'refunds' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {refundSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <p className="font-medium mt-2">Promotion Management</p>

                <div>
                    <NavLink to="/coupons" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <BiSolidCoupon className="w-6 h-6" />
                        <p className="hidden md:block">Coupons</p>
                    </NavLink>
                </div>

                <p className="font-medium mt-2">Reports & Analytics</p>

                <div>
                    <NavLink to="/transaction-report" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <IoAnalytics className="w-6 h-6" />
                        <p className="hidden md:block">Transactions Report</p>
                    </NavLink>
                </div>

                <div>
                    <NavLink to="/products-report" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <SiSimpleanalytics className="w-6 h-6" />
                        <p className="hidden md:block">Product Report</p>
                    </NavLink>
                </div>

                <div>
                    <NavLink to="/order-report" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <TbDeviceDesktopAnalytics className="w-6 h-6" />
                        <p className="hidden md:block">Order Report</p>
                    </NavLink>
                </div>

                <p className="font-medium mt-2">Business Section</p>

                <div>
                    <NavLink to="/withdraws" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <IoWalletOutline className="w-6 h-6" />
                        <p className="hidden md:block">Withdraws</p>
                    </NavLink>
                </div>

                <div>
                    <NavLink to="/bank-information" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <BsBank className="w-6 h-6" />
                        <p className="hidden md:block">Bank Information</p>
                    </NavLink>
                </div>

                <div>
                    <NavLink to="/shop-settings" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <AiOutlineShop className="w-6 h-6" />
                        <p className="hidden md:block">Shop Settings</p>
                    </NavLink>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;