import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { RiRefund2Fill } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import { SiBrandfolder } from "react-icons/si";
import { RiOrganizationChart } from "react-icons/ri";
import { BsHouseAdd } from "react-icons/bs";
import { FaWarehouse } from "react-icons/fa";
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { FaRegImage } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrAnnounce } from "react-icons/gr";
import { TiMessages } from "react-icons/ti";
import { TbMessageDots } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { PiWarehouseLight } from "react-icons/pi";
import { FaUserTie } from "react-icons/fa";
import { RiUserStarLine } from "react-icons/ri";
import { MdAddBusiness } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import { FaKey } from "react-icons/fa";
import { SiPowerpages } from "react-icons/si";



const Sidebar = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeMenu, setActiveMenu] = useState('');
    const sidebarRef = useRef(null);
    const scrollPositionRef = useRef(0);

    const orderSubmenus = [
        { label: 'All Orders', path: '/orders/all' },
        { label: 'Pending Orders', path: '/orders/pending' },
        { label: 'Confirmed Orders', path: '/orders/confirmed' },
        { label: 'Packaging Orders', path: '/orders/packaging' },
        { label: 'Out for Delivery', path: '/orders/out-for-delivery' },
        { label: 'Delivered Orders', path: '/orders/delivered' },
        { label: 'Returned Orders', path: '/orders/returned' },
        { label: 'Failed to Deliver', path: '/orders/failed-to-deliver' },
        { label: 'Cancelled Orders', path: '/orders/cancelled' }
    ];

    const refundSubmenus = [
        { label: 'Pending Refunds', path: '/refunds/pending' },
        { label: 'Approved Refunds', path: '/refunds/approved' },
        { label: 'Rejected Refunds', path: '/refunds/rejected' },
        { label: 'Refunded Refunds', path: '/refunds/refunded' }
    ];

    const categorysetupSubmenus = [
        { label: 'Categories', path: '/categorysetup/categories' },
        { label: 'Sub Categories', path: '/categorysetup/sub-categories' },
        { label: 'Sub Sub Categories', path: '/categorysetup/sub-sub-categories' }
    ];

    const brandSubmenus = [
        { label: 'Add New', path: '/brands/add-new' },
        { label: 'List', path: '/brands/list' }
    ];

    const attributeSubmenus = [
        { label: 'Setup', path: '/attributes/attributes-setup' }
    ];

    const inhouseSubmenus = [
        { label: 'Product List', path: '/inhouse/product-list' },
        { label: 'Add New Product', path: '/inhouse/add-new-product' },
        { label: 'Request Restock List', path: '/inhouse/request-restock-list' }
    ];

    const manufacturerSubmenus = [
        { label: 'New Products Request', path: '/manufacturer/new-products-request' },
        { label: 'Product Update Request', path: '/manufacturer/products-update-request' },
        { label: 'Approved Products', path: '/manufacturer/approved-products' },
        { label: 'Denied Products', path: '/manufacturer/denied-prducts' }
    ];

    const productgallerySubmenus = [
        { label: 'Gallery', path: '/productgallery/gallery' }
    ];

    const offerdealSubmenus = [
        { label: 'Coupon', path: '/offerdeal/coupon' },
        { label: 'Flash Deals', path: '/offerdeal/flash-deals' },
        { label: 'Deals of the Day', path: '/offerdeal/deals-day' },
        { label: 'Featured Deal', path: '/offerdeal/featured-deal' }
    ];

    const notificationSubmenus = [
        { label: 'Send Notification', path: '/notification/send-notification' },
        { label: 'Push Notification', path: '/notification/push-notification' }
    ];

    const announcementSubmenus = [
        { label: 'Post', path: '/annoucement/post' }
    ];


    const reportanalysisSubmenus = [
        { label: 'Earning Reports', path: '/reportanalysis/earning-reports' },
        { label: 'Inhouse Sales', path: '/reportanalysis/inhouse-sales' },
        { label: 'Vendor Sales', path: '/reportanalysis/vendor-sales' },
        { label: 'Transaction Report', path: '/reportanalysis/transaction-report' },
    ];

    const customerSubmenus = [
        { label: 'Customer List', path: '/customer/customer-list' },
        { label: 'Customer Reviews', path: '/customer/customer-reviews' },
        // { label: 'Wallet', path: '/customer/wallet' },
        // { label: 'Wallet Bonus Setup', path: '/customer/wallet-bonus' },

    ];

    const manufactureruserSubmenus = [
        { label: 'Add New Manufacturer', path: '/manufactureruser/add-new-manufacturer' },
        { label: 'Vendor List', path: '/manufactureruser/vendor-list' },
        { label: 'Withdraws', path: '/manufactureruser/withdraws' },
        { label: 'Withdrawal Methods', path: '/manufactureruser/withdrawal-method' }
    ];

    const employeeSubmenus = [
        { label: 'Employee Role Setup', path: '/employee/employee-role-setup' },
        { label: 'Employees', path: '/employee/employees' }
    ];

    const businesssettingSubmenus = [
        { label: 'Business Settings', path: '/businesssetting/business-setting' },
        { label: 'In-house Shop', path: '/businesssetting/in-house-shop' },
        { label: 'SEO Settings', path: '/businesssetting/seo-setting' }
    ];

    const systemsettingSubmenus = [
        { label: 'System Settings', path: '/systemsetting/system-settings' },
        { label: 'Login Settings', path: '/systemsetting/login-settings' },
        // { label: 'Themes & Addons', path: '/systemsetting/themes-addons' },
        // { label: 'Email Template', path: '/systemsetting/email-template' }
    ];

    const paymentSubmenus = [
        { label: 'Payment Methods', path: '/payment/payment-methods' },
        // { label: 'Other Configuration', path: '/payment/other-configuration' }
    ];

    const pagesmediaSubmenus = [
        { label: 'Business Pages', path: '/pagesmedia/business-pages' },
        { label: 'Social Media Links', path: '/pagesmedia/social-media-links' },
        { label: 'Media Gallery', path: '/pagesmedia/media-gallery' },
        { label: 'Manufacturer Registration', path: '/pagesmedia/manufacturer-registration' }
    ];

    useEffect(() => {
 
        const handleSaveScroll = () => {
            if (sidebarRef.current) {
                const scrollTop = sidebarRef.current.scrollTop;
                localStorage.setItem('sidebarScrollPosition', scrollTop.toString());
                scrollPositionRef.current = scrollTop;
            }
        };


        window.addEventListener('beforeunload', handleSaveScroll);

        return () => {
            handleSaveScroll();
            window.removeEventListener('beforeunload', handleSaveScroll);
        };
    }, []);

    useEffect(() => {
   
        if (location.pathname.includes('/orders/')) {
            setActiveMenu('orders');
        } else if (location.pathname.includes('/refunds/')) {
            setActiveMenu('refunds');
        } else if (location.pathname.includes('/categorysetup/')) {
            setActiveMenu('categories');
        }
        else if (location.pathname.includes('/brands/')) {
            setActiveMenu('brands');
        }
        else if (location.pathname.includes('/attributes/')) {
            setActiveMenu('attributes');
        }
        else if (location.pathname.includes('/inhouse/')) {
            setActiveMenu('inhouses');
        }
        else if (location.pathname.includes('/manufacturer/')) {
            setActiveMenu('manufacturer');
        }
        else if (location.pathname.includes('/productgallery/')) {
            setActiveMenu('productgallery');
        }
        else if (location.pathname.includes('/offerdeal/')) {
            setActiveMenu('offerdeal');
        }
        else if (location.pathname.includes('/notification/')) {
            setActiveMenu('notification');
        }
        else if (location.pathname.includes('/annoucement/')) {
            setActiveMenu('annoucement');
        }
        else if (location.pathname.includes('/reportanalysis/')) {
            setActiveMenu('reportanalysis');
        }
        else if (location.pathname.includes('/customer/')) {
            setActiveMenu('customer');
        }
        else if (location.pathname.includes('/manufactureruser/')) {
            setActiveMenu('manufactureruser');
        }
        else if (location.pathname.includes('/employee/')) {
            setActiveMenu('employee');
        }
        else if (location.pathname.includes('/businesssetting/')) {
            setActiveMenu('businesssetting');
        }
        else if (location.pathname.includes('/systemsetting/')) {
            setActiveMenu('systemsetting');
        }
        else if (location.pathname.includes('/payment/')) {
            setActiveMenu('payment');
        }
        else if (location.pathname.includes('/pagesmedia/')) {
            setActiveMenu('pagesmedia');
        }

        const timeoutId = setTimeout(() => {
            if (sidebarRef.current) {
                const savedPosition = localStorage.getItem('sidebarScrollPosition');
                if (savedPosition) {
                    sidebarRef.current.scrollTop = parseInt(savedPosition);
                }
            }
        }, 100); 

        return () => clearTimeout(timeoutId);
    }, [location.pathname]);

    const handleScroll = () => {
        if (sidebarRef.current) {
            scrollPositionRef.current = sidebarRef.current.scrollTop;
            localStorage.setItem('sidebarScrollPosition', scrollPositionRef.current.toString());
        }
    };

    const handleMenuClick = (menuName) => {
        setActiveMenu(prevActive => prevActive === menuName ? '' : menuName);
 
        setTimeout(() => {
            if (sidebarRef.current) {
                scrollPositionRef.current = sidebarRef.current.scrollTop;
                localStorage.setItem('sidebarScrollPosition', scrollPositionRef.current.toString());
            }
        }, 50);
    };

    const isSubmenuActive = (submenuPath) => {
        return location.pathname.startsWith(submenuPath);
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

        const handleSubMenuClick = () => {
       
            if (sidebarRef.current) {
                scrollPositionRef.current = sidebarRef.current.scrollTop;
                localStorage.setItem('sidebarScrollPosition', scrollPositionRef.current.toString());
            }
        };

        return (
            <NavLink
                to={to}
                className={`
                           text-sm px-3 py-2 rounded-md transition-all duration-150 flex items-center
                                ${isActive
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'hover:bg-gray-100 text-gray-600'}
                            `}
                onClick={handleSubMenuClick}
            >
                <div className="w-1.5 h-1.5 rounded-full mr-2 bg-current opacity-70"></div>
                {children}
            </NavLink>
        );
    };

    const handleNavLinkClick = () => {
        // Save scroll position when navigating via direct links
        if (sidebarRef.current) {
            scrollPositionRef.current = sidebarRef.current.scrollTop;
            localStorage.setItem('sidebarScrollPosition', scrollPositionRef.current.toString());
        }
    };
    return (
        <div className="w-[250px] h-screen sticky top-0 overflow-y-auto shadow-lg bg-white"
            ref={sidebarRef}
            onScroll={handleScroll}>
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

                <div className="space-y-5">
                    <div className="space-y-1">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                ${isActive
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                    : 'hover:bg-gray-100 text-gray-700'}
                            `}
                            onClick={handleNavLinkClick}
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
                            onClick={handleNavLinkClick}
                        >
                            <LuShoppingBag className="w-5 h-5" />
                            <p className="font-medium">POS</p>
                        </NavLink>


                    </div>

                    <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2">Order Management</p>
                    <div>
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
                        </div>

                        <div>
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

                    <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2">Product Management</p>
                    <div>
                        <div className="space-y-1">
                            <MenuLink menuName="categories">
                                <TbCategoryPlus className="w-5 h-5" />
                                <p className="font-medium">Category Setup</p>
                                {activeMenu === 'categories' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'categories' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {categorysetupSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="brands">
                                <SiBrandfolder className="w-5 h-5" />
                                <p className="font-medium">Brands</p>
                                {activeMenu === 'brands' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'brands' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {brandSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="attributes">
                                <RiOrganizationChart className="w-5 h-5" />
                                <p className="font-medium">Product Attriube Setup</p>
                                {activeMenu === 'attributes' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'attributes' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {attributeSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="inhouses">
                                <BsHouseAdd className="w-5 h-5" />
                                <p className="font-medium">In-House Products</p>
                                {activeMenu === 'inhouses' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'inhouses' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {inhouseSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="manufacturer">
                                <FaWarehouse className="w-5 h-5" />
                                <p className="font-medium">Manufacturers Products</p>
                                {activeMenu === 'manufacturer' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'manufacturer' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {manufacturerSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="productgallery">
                                <LuGalleryVerticalEnd className="w-5 h-5" />
                                <p className="font-medium">Products Gallery</p>
                                {activeMenu === 'productgallery' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'productgallery' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {productgallerySubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                    <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2">Promotion Management</p>
                    <div>
                        <div className="space-y-1">
                            <NavLink
                                to="/banner-setup"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                                onClick={handleNavLinkClick}
                            >
                                <FaRegImage className="w-5 h-5" />
                                <p className="font-medium">Banner Setup</p>
                            </NavLink>

                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="offerdeal">
                                <BiSolidOffer className="w-5 h-5" />
                                <p className="font-medium">Offers & Deals</p>
                                {activeMenu === 'offerdeal' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'offerdeal' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {offerdealSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="notification">
                                <IoMdNotificationsOutline className="w-5 h-5" />
                                <p className="font-medium">Notification</p>
                                {activeMenu === 'notification' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'notification' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {notificationSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="announcement">
                                <GrAnnounce className="w-5 h-5" />
                                <p className="font-medium">Announcement</p>
                                {activeMenu === 'announcement' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'announcement' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {announcementSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>

                    <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2">Help & Support</p>
                    <div>

                        <div className="space-y-1">

                            <NavLink
                                to="/index"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                                onClick={handleNavLinkClick}
                            >
                                <TiMessages className="w-5 h-5" />
                                <p className="font-medium">Index</p>
                            </NavLink>

                        </div>

                        <div className="space-y-1">

                            <NavLink
                                to="/messages"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                                onClick={handleNavLinkClick}
                            >
                                <TbMessageDots className="w-5 h-5" />
                                <p className="font-medium">Messages</p>
                            </NavLink>

                        </div>

                        <div className="space-y-1">

                            <NavLink
                                to="/support-ticket"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                                onClick={handleNavLinkClick}
                            >
                                <MdOutlineSupportAgent className="w-5 h-5" />
                                <p className="font-medium">Support Ticket</p>
                            </NavLink>

                        </div>

                    </div>
                    <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2">Reports & Analysis</p>

                    <div>
                        <div className="space-y-1">
                            <MenuLink menuName="reportanalysis">
                                <IoAnalytics className="w-5 h-5" />
                                <p className="font-medium">Sales & Transaction</p>
                                {activeMenu === 'reportanalysis' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'reportanalysis' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {reportanalysisSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">

                            <NavLink
                                to="/products-report"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                                onClick={handleNavLinkClick}
                            >
                                <SiSimpleanalytics className="w-5 h-5" />
                                <p className="font-medium">Products Report</p>
                            </NavLink>

                        </div>

                        <div className="space-y-1">

                            <NavLink
                                to="/order-report"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                                onClick={handleNavLinkClick}
                            >
                                <TbDeviceDesktopAnalytics className="w-5 h-5" />
                                <p className="font-medium">Order Report</p>
                            </NavLink>

                        </div>

                    </div>

                    <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2   ">User Management</p>

                    <div>
                        <div className="space-y-1">
                            <MenuLink menuName="customer">
                                <AiOutlineUsergroupAdd className="w-5 h-5" />
                                <p className="font-medium">Customers</p>
                                {activeMenu === 'customer' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'customer' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {customerSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="manufactureruser">
                                <PiWarehouseLight className="w-5 h-5" />
                                <p className="font-medium">Manufacturers</p>
                                {activeMenu === 'manufactureruser' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'manufactureruser' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {manufactureruserSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="employee">
                                <FaUserTie className="w-5 h-5" />
                                <p className="font-medium">Employee</p>
                                {activeMenu === 'employee' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'employee' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {employeeSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">

                            <NavLink
                                to="/subscribers"
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                                        : 'hover:bg-gray-100 text-gray-700'}
                                `}
                                onClick={handleNavLinkClick}
                            >
                                <RiUserStarLine className="w-5 h-5" />
                                <p className="font-medium">Subscribers</p>
                            </NavLink>

                        </div>

                    </div>
                    <p className="uppercase text-xs font-bold text-gray-500 px-4 mb-2">System Settings</p>

                    <div>
                        <div className="space-y-1">
                            <MenuLink menuName="businesssetting">
                                < MdAddBusiness className="w-5 h-5" />
                                <p className="font-medium">Business Setup</p>
                                {activeMenu === 'businesssetting' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'businesssetting' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {businesssettingSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="systemsetting">
                                <VscSettings className="w-5 h-5" />
                                <p className="font-medium">System Setup</p>
                                {activeMenu === 'systemsetting' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'systemsetting' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {systemsettingSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="payment">
                                <FaKey className="w-5 h-5" />
                                <p className="font-medium">3rd Party</p>
                                {activeMenu === 'payment' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'payment' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {paymentSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-1">
                            <MenuLink menuName="pagesmedia">
                                <SiPowerpages className="w-5 h-5" />
                                <p className="font-medium">Pages & Media</p>
                                {activeMenu === 'pagesmedia' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </MenuLink>
                            {activeMenu === 'pagesmedia' && (
                                <div className="ml-4 pl-3 border-l-2 border-blue-200 space-y-1 mt-1 mb-1">
                                    {pagesmediaSubmenus.map((submenu, index) => (
                                        <SubMenuLink key={index} to={submenu.path}>
                                            {submenu.label}
                                        </SubMenuLink>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;