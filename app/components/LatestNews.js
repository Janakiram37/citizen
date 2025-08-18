'use client';

export default function LatestNews() {
    const news = [
        {
            title: "Digital Service Updates",
            date: "August 18, 2025",
            description: "New online portal launched for instant certificate verification",
            category: "Digital Services"
        },
        {
            title: "Healthcare Initiative",
            date: "August 17, 2025",
            description: "Free health checkup camps in all districts next month",
            category: "Healthcare"
        },
        {
            title: "Education Notice",
            date: "August 17, 2025",
            description: "Scholarship applications for 2025-26 now open",
            category: "Education"
        }
    ];

    return (
        <div className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View All Updates →
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {news.map((item, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-blue-600 font-medium">
                                        {item.category}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {item.date}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">
                                    {item.description}
                                </p>
                                <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
