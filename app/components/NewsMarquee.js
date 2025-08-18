'use client';

export default function NewsMarquee() {
    const news = [
        "🔔 Last date for Aadhaar linking with PAN extended to September 30th",
        "📢 New online service for passport applications now available",
        "⚡ Property tax payment deadline extended to October 15th",
        "🏥 COVID-19 vaccination certificates can now be downloaded online",
    ];

    return (
        <div className="bg-blue-50 border-y border-blue-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center py-2">
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mr-4">
                        Latest Updates
                    </div>
                    <div className="overflow-hidden flex-1">
                        <div className="marquee-container">
                            <style jsx>{`
                                .marquee-container {
                                    overflow: hidden;
                                    white-space: nowrap;
                                }
                                .marquee-content {
                                    display: inline-block;
                                    animation: marquee 40s linear infinite;
                                }
                                @keyframes marquee {
                                    0% { transform: translateX(100%); }
                                    100% { transform: translateX(-100%); }
                                }
                            `}</style>
                            <div className="marquee-content">
                                {news.map((item, index) => (
                                    <span key={index} className="text-gray-700 mx-8">{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
