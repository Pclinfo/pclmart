import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import bluetooth_headphones from '../assets/bluetooth_headphones.png'
import wired_headphones from '../assets/wired_headphones.png'
import true_wireless_earbuds from '../assets/true_wireless_earbuds.png'
import bluetooth_speakers from '../assets/bluetooth_speakers.png'
import soundbars from '../assets/soundbars.png'
import home_theatres from '../assets/home_theatres.png'
import set_top_box from '../assets/set_top_box.png'
import remote_control from '../assets/remote_control.png'
import tablets_with_call from '../assets/tablets_with_call.png'
import tablets_without_call from '../assets/tablets_without_call.png'
import mobile_memory_card from '../assets/mobile_memory_card.png'
import computer_storage_pendrive from '../assets/computer_storage_pendrive.png'
import mobile_storage_pendrive from '../assets/mobile_storage_pendrive.png'
import external_harddrive from '../assets/external_harddrive.png'
import internal_harddrive from '../assets/internal_harddrive.png'
import smart_bands from '../assets/smart_bands.png'
import smart_glasses from '../assets/smart_glasses.png'
import smart_assistants from '../assets/smart_assistants.png'
import smart_lights from '../assets/smart_lights.png'
import smart_cameras from '../assets/smart_cameras.png'
import smart_switches from '../assets/smart_switches.png'
import smart_door_locks from '../assets/smart_door_locks.png'
import sensors from '../assets/sensors.png'
import powerbank from '../assets/powerbank.png'
import plain_cases from '../assets/plain_cases.png'
import designer_cases from '../assets/designer_cases.png'
import camera_lens from '../assets/camera_lens.png'
import tablet_accessories from '../assets/tablet_accessories.png'
import mobile_cable from '../assets/mobile_cable.png'
import mobile_pouches from '../assets/mobile_pouches.png'
import mobile_flash from '../assets/mobile_flash.png'
import mobile_holder from '../assets/mobile_holder.png'
import mobile_usbgadget from '../assets/mobile_usbgadget.png'
import mobiles_combos from '../assets/mobiles_combos.png'
import laptops from '../assets/laptops.png'
import gaming_laptops from '../assets/gaming_laptops.png'
import desktop from '../assets/desktop.png'
import one_pcs from '../assets/one_pcs.png'
import tower_pcs from '../assets/tower_pcs.png'
import pc_finder from '../assets/pc_finder.png'
import printers from '../assets/printers.png'
import monitor from '../assets/monitor.png'
import projectors from '../assets/projectors.png'
import portable_projectors from '../assets/portable_projectors.png'
import ink_cartridges from '../assets/ink_cartridges.png'
import receipt_printers from '../assets/receipt_printers.png'
import lamination_machines from '../assets/lamination_machines.png'
import barcode_scanners from '../assets/barcode_scanners.png'
import currency_detectors from '../assets/currency_detectors.png'





const Category = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);

  const categories = [
    {
      id: 1,
      title: "Audio",
      items: [
        { name: "Bluetooth Headphones", image: bluetooth_headphones },
        { name: "Wired Headphones", image: wired_headphones },
        { name: "True Wireless Earbuds", image: true_wireless_earbuds },
        { name: "Bluetooth Speakers", image: bluetooth_speakers },
        { name: "Soundbars", image: soundbars },
        { name: "Home Theatres", image: home_theatres },
        { name: "TV Streaming Device", image: set_top_box },
        { name: "Remote Control", image: remote_control }

      ]
    },
    {
      id: 2,
      title: "Tablets",
      items: [
        { name: "Tablets With Call Facility", image: tablets_with_call },
        { name: "Tablets Without Call Facility", image: tablets_without_call }
      ]
    },
    {
      id: 3,
      title: "Storage",
      items: [
        { name: "Mobile Memory Card", image: mobile_memory_card },
        { name: "Computer Storage Pendrive", image: computer_storage_pendrive },
        { name: "Mobile Storage Pendrive", image: mobile_storage_pendrive },
        { name: "External Harddrive", image: external_harddrive },
        { name: "Internal Harddrive", image: internal_harddrive },
      ]
    },
    {
      id: 4,
      title: "Smart Wearables",
      items: [
        { name: "Smart Bands", image: smart_bands },
        { name: "Smart Glasses", image: smart_glasses }
      ]
    },
    {
      id: 5,
      title: "Smart Home Automation",
      items: [
        { name: "Smart Assistants", image: smart_assistants },
        { name: "Smart Lights", image: smart_lights },
        { name: "Smart Cameras", image: smart_cameras },
        { name: "Smart Switches", image: smart_switches },
        { name: "Smart Door locks", image: smart_door_locks },
        { name: "Sensors & Alarms", image: sensors }
      ]
    },
    {
      id: 6,
      title: "Powerbank",
      items: [
        { name: "Powerbank", image: powerbank }
      ]
    },
    {
      id: 7,
      title: "MobileAccessory",
      items: [
        { name: "Plain Cases", image: plain_cases },
        { name: "Designer Cases", image: designer_cases },
        { name: "Camera Lens Protectors", image: camera_lens },
        { name: "Tablet Accessories", image: tablet_accessories },
        { name: "Mobile Cable", image: mobile_cable },
        { name: "Mobile Pouches", image: mobile_pouches },
        { name: "Mobile Flash", image: mobile_flash },
        { name: "Mobile Holder", image: mobile_holder },
        { name: "Mobile USBGadget", image: mobile_usbgadget },
        { name: "Mobiles Accessories Combos", image: mobiles_combos }
      ]
    },
    {
      id: 8,
      title: "Laptop and Desktop",
      items: [
        { name: "Laptops", image: laptops },
        { name: "Gaming Laptops", image: gaming_laptops },
        { name: "Desktop PCs", image: desktop },
        { name: "All In One PCs", image: one_pcs },
        { name: "Tower PCs", image: tower_pcs },
        { name: "PC Finder", image: pc_finder }
      ]
    },
    {
      id: 9,
      title: "Computer Peripherals",
      items: [
        { name: "Printers", image: printers },
        { name: "Monitors", image: monitor },
        { name: "Projectors", image: projectors },
        { name: "Portable Projectors", image: portable_projectors },
        { name: "Ink Cartridges", image: ink_cartridges },
        { name: "Receipt Printers", image: receipt_printers },
        { name: "Lamination Machines", image: lamination_machines },
        { name: "Barcode Scanners", image: barcode_scanners },
        { name: "Currency Detectors", image: currency_detectors }
      ]
    },
  ];

  const scroll = (direction) => {
    if (containerRef.current) {
      const newIndex = direction === 'right'
        ? (activeCategory + 1) % categories.length
        : (activeCategory - 1 + categories.length) % categories.length;

      setActiveCategory(newIndex);

      const scrollAmount = containerRef.current.offsetWidth * newIndex;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      scroll('right');
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [activeCategory]);

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const resumeAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      scroll('right');
    }, 5000);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Categories</h2>
        <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
          View All
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => {
            scroll('left');
            stopAutoPlay();
          }}
          onMouseLeave={resumeAutoPlay}
          className="absolute left-0 top-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2 hover:bg-gray-100 transform -translate-y-1/2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          ref={containerRef}
          className="overflow-hidden"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          <div className="flex transition-transform duration-500 ease-out ">
            {categories.map((category, idx) => (
              <div
                key={category.id}
                className="flex-none w-full"
              >
                <h3 className="font-semibold text-xl text-gray-800 mb-6 text-center">{category.title}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-12">
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className="group flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-all  duration-300 hover:shadow-md"
                    >
                      <div className="w-16 h-16 rounded-full bg-gray-100 p-3 mb-3 group-hover:bg-gray-200  transition-colors">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-sm text-center text-gray-700 group-hover:text-gray-900">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            scroll('right');
            stopAutoPlay();
          }}
          onMouseLeave={resumeAutoPlay}
          className="absolute right-0 top-1/2 z-10 bg-white/90 shadow-lg rounded-full p-2 hover:bg-gray-100 transform -translate-y-1/2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Category Indicators */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4">
          {categories.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeCategory ? 'bg-blue-600 w-4' : 'bg-gray-300'
                }`}
              onClick={() => {
                setActiveCategory(idx);
                const scrollAmount = containerRef.current.offsetWidth * idx;
                containerRef.current.scrollTo({
                  left: scrollAmount,
                  behavior: 'smooth'
                });
                stopAutoPlay();
              }}
              onMouseLeave={resumeAutoPlay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;