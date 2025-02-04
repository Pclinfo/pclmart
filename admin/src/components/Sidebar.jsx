import React, { useState } from 'react';
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
        { label: 'Refunded Refunds', path: '/refunds/refunded' },
        { label: 'Processing Refunds', path: '/refunds/processing' },
        { label: 'Completed Refunds', path: '/refunds/completed' },
        { label: 'Customer Disputes', path: '/refunds/disputes' },
        { label: 'Refund History', path: '/refunds/history' }
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
        { label: 'Bulk Import', path: '/inhouse/bulk-import' },
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
        { label: 'Transaction Report', path: '/reportanalysis/transaction-report' }
    ];

    const customerSubmenus = [
        { label: 'Customer List', path: '/customer/customer-list' },
        { label: 'Customer Reviews', path: '/customer/customer-reviews' },
        { label: 'Wallet', path: '/customer/wallet' },
        { label: 'Wallet Bonus Setup', path: '/customer/wallet-bonus' },
        { label: 'Loyalty Points', path: '/customer/loyalty-points' }
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
        { label: 'Themes & Addons', path: '/systemsetting/themes-addons' },
        { label: 'Email Template', path: '/systemsetting/email-template' }
    ];

    const paymentSubmenus = [
        { label: 'Payment Methods', path: '/payment/payment-methods' },
        { label: 'Other Configuration', path: '/payment/other-configuration' }
    ];

    const pagesmediaSubmenus = [
        { label: 'Business Pages', path: '/pagesmedia/business-pages' },
        { label: 'Social Media Links', path: '/pagesmedia/social-media-links' },
        { label: 'Media Gallery', path: '/pagesmedia/media-gallery' },
        { label: 'Manufacturer Registration', path: '/pagesmedia/manufacturer-registration' }
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

                <p className="font-medium mt-2">Product Management</p>

                <div>
                    <MenuLink menuName="categories">
                        <TbCategoryPlus className="w-6 h-6" />
                        <p className="hidden md:block">Category Setup</p>
                        {activeMenu === 'categories' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'categories' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {categorysetupSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="brands">
                        <SiBrandfolder className="w-6 h-6" />
                        <p className="hidden md:block">Brands</p>
                        {activeMenu === 'brands' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'brands' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {brandSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="attributes">
                        <RiOrganizationChart className="w-6 h-6" />
                        <p className="hidden md:block">Product Attriube Setup</p>
                        {activeMenu === 'attributes' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'attributes' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {attributeSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="inhouses">
                        <BsHouseAdd className="w-6 h-6" />
                        <p className="hidden md:block">In-House Products</p>
                        {activeMenu === 'inhouses' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'inhouses' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {inhouseSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="manufacturer">
                        <FaWarehouse className="w-6 h-6" />
                        <p className="hidden md:block">Manufacturers Products</p>
                        {activeMenu === 'manufacturer' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'manufacturer' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {manufacturerSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="productgallery">
                        <LuGalleryVerticalEnd className="w-6 h-6" />
                        <p className="hidden md:block">Products Gallery</p>
                        {activeMenu === 'productgallery' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'productgallery' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {productgallerySubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <p className="font-medium mt-2">Promotion Management</p>

                <div>
                    <NavLink to="/banner-setup" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <FaRegImage className="w-6 h-6" />
                        <p className="hidden md:block">Banner Setup</p>
                    </NavLink>
                </div>

                <div>
                    <MenuLink menuName="offerdeal">
                        <BiSolidOffer className="w-6 h-6" />
                        <p className="hidden md:block">Offers & Deals</p>
                        {activeMenu === 'offerdeal' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'offerdeal' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {offerdealSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="notification">
                        <IoMdNotificationsOutline className="w-6 h-6" />
                        <p className="hidden md:block">Notification</p>
                        {activeMenu === 'notification' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'notification' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {notificationSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="announcement">
                        <GrAnnounce className="w-6 h-6" />
                        <p className="hidden md:block">Announcement</p>
                        {activeMenu === 'announcement' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'announcement' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {announcementSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <p className="font-medium mt-2 px-4">Help & Support</p>

                <div>
                    <NavLink to="/index" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <TiMessages className="w-6 h-6" />
                        <p className="hidden md:block">Index</p>
                    </NavLink>
                </div>

                <div>
                    <NavLink to="/messages" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <TbMessageDots className="w-6 h-6" />
                        <p className="hidden md:block">Messages</p>
                    </NavLink>
                </div>

                <div>
                    <NavLink to="/support-ticket" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <MdOutlineSupportAgent className="w-6 h-6" />
                        <p className="hidden md:block">Support Ticket</p>
                    </NavLink>
                </div>


                <p className="font-medium mt-2">Reports & Analysis</p>

                <div>
                    <MenuLink menuName="reportanalysis">
                        <IoAnalytics className="w-6 h-6" />
                        <p className="hidden md:block">Sales & Transaction</p>
                        {activeMenu === 'reportanalysis' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'reportanalysis' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {reportanalysisSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <NavLink to="/products-report" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <SiSimpleanalytics className="w-6 h-6" />
                        <p className="hidden md:block">Products Report</p>
                    </NavLink>
                </div>

                <div>
                    <NavLink to="/order-report" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <TbDeviceDesktopAnalytics className="w-6 h-6" />
                        <p className="hidden md:block">Order Report</p>
                    </NavLink>
                </div>

                <p className="font-medium mt-2">User Management</p>

                <div>
                    <MenuLink menuName="customer">
                        <AiOutlineUsergroupAdd className="w-6 h-6" />
                        <p className="hidden md:block">Customers</p>
                        {activeMenu === 'customer' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'customer' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {customerSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="manufactureruser">
                        <PiWarehouseLight className="w-6 h-6" />
                        <p className="hidden md:block">Manufacturers</p>
                        {activeMenu === 'manufactureruser' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'manufactureruser' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {manufactureruserSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="employee">
                        <FaUserTie className="w-6 h-6" />
                        <p className="hidden md:block">Employee</p>
                        {activeMenu === 'employee' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'employee' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {employeeSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <NavLink to="/subscribers" className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l">
                        <RiUserStarLine className="w-6 h-6" />
                        <p className="hidden md:block">Subscribers</p>
                    </NavLink>
                </div>

                <p className="font-medium mt-2">System Settings</p>

                <div>
                    <MenuLink menuName="businesssetting">
                        < MdAddBusiness className="w-6 h-6" />
                        <p className="hidden md:block">Business Setup</p>
                        {activeMenu === 'businesssetting' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'businesssetting' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {businesssettingSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="systemsetting">
                        <VscSettings className="w-6 h-6" />
                        <p className="hidden md:block">System Setup</p>
                        {activeMenu === 'systemsetting' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'systemsetting' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {systemsettingSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="payment">
                        <FaKey className="w-6 h-6" />
                        <p className="hidden md:block">3rd Party</p>
                        {activeMenu === 'payment' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'payment' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
                            {paymentSubmenus.map((submenu, index) => (
                                <SubMenuLink key={index} to={submenu.path}>
                                    {submenu.label}
                                </SubMenuLink>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <MenuLink menuName="pagesmedia">
                        <SiPowerpages className="w-6 h-6" />
                        <p className="hidden md:block">Pages & Media</p>
                        {activeMenu === 'pagesmedia' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </MenuLink>
                    {activeMenu === 'pagesmedia' && (
                        <div className="pl-10 flex flex-col gap-2 mt-2">
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
    );
};

export default Sidebar;