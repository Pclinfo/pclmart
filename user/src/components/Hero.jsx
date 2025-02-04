import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import hero_ban_1 from '../assets/hero_ban_1.png';
import hero_ban_2 from '../assets/hero_ban_2.png';
import hero_ban_3 from '../assets/hero_ban_3.png';
import hero_ban_4 from '../assets/hero_ban_4.png';
import hero_ban_5 from '../assets/hero_ban_5.png';
import hero_ban_6 from '../assets/hero_ban_6.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero = () => {
    const heroSlides = [
        { image: hero_ban_1 },
        { image: hero_ban_2 },
        { image: hero_ban_3 },
        { image: hero_ban_4 },
        { image: hero_ban_5 },
        { image: hero_ban_6 }
    ];

    return (
        <div className="w-full">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full"
            >
                {heroSlides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        {/* Image Container with aspect ratio */}
                        <div className="w-full relative pb-[35%] min-h-[250px]">
                            <img
                                src={slide.image}
                                alt={`Hero slide ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                    filter: 'brightness(0.7)',
                                }}
                            />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-white z-10 px-4">
                            <div className="max-w-3xl">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl lg:text-2xl mb-6 drop-shadow-md">
                                    {slide.subtitle}
                                </p>
                                <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                    {slide.buttonText}
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;