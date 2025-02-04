import React from 'react';
import {
    User, Package, RefreshCcw, Heart, Award,
    Inbox, MapPin, LifeBuoy, Share2, Ticket, Navigation
} from 'lucide-react';


const Sidebar = () => {
    const menuItems = [
        { icon: <User size={20} />, text: 'Profile Info', href:"/profile" },
        { icon: <Package size={20} />, text: 'My Order', href: "/orders" },
        { icon: <RefreshCcw size={20} />, text: 'Restock Requests', href: "/restock-requests" },
        { icon: <Heart size={20} />, text: 'Wish List', href: "/wishlist" },
        { icon: <Award size={20} />, text: 'My Loyalty Point', href: "/loyalty" },
        { icon: <Inbox size={20} />, text: 'Inbox', href: "/inbox" },
        { icon: <MapPin size={20} />, text: 'My Address', href: "/address" },
        { icon: <LifeBuoy size={20} />, text: 'Support Ticket', href: "/support" },
        { icon: <Share2 size={20} />, text: 'Refer & Earn', href: "/refer" },
        { icon: <Ticket size={20} />, text: 'Coupons', href: "/coupons" },
        { icon: <Navigation size={20} />, text: 'Track Order', href: "/track-order" },
    ];


    return (
        <div className="lg:w-64 bg-white p-4 shadow-sm">
            <nav>
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.href || "#"}
                                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors 
                                ${item.active
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <span className="text-gray-500">{item.icon}</span>
                                <span>{item.text}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;