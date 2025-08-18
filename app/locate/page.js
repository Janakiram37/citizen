export default function LocateCenters() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Locate Service Centers</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Find Nearest Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Enter your PIN code"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Search Centers
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold mb-4">Available Center Types:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Citizen Service Centers</h4>
              <p className="text-sm text-gray-600">For all document-related services</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Digital Seva Kendras</h4>
              <p className="text-sm text-gray-600">For digital services and assistance</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Post Offices</h4>
              <p className="text-sm text-gray-600">For passport and postal services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
