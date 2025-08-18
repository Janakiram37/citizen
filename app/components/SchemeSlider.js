'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SchemeSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "Digital India Initiative",
            description: "Transform India into a digitally empowered society",
            image: "/scheme1.jpg", // You'll need to add these images to your public folder
            color: "bg-blue-600"
        },
        {
            title: "PM Kisan Scheme",
            description: "Direct financial support to farmer families",
            image: "/scheme2.jpg",
            color: "bg-green-600"
        },
        {
            title: "Skill India Mission",
            description: "Empowering youth with job-oriented skills",
            image: "/scheme3.jpg",
            color: "bg-orange-600"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                className="object-cover"
                                fill
                                priority={index === 0}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
                                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                                <p className="text-lg text-gray-200">{slide.description}</p>
                            </div>
                        </div>
                    ))}
                    
                    {/* Navigation dots */}
                    <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
