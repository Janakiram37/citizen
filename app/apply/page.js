export default function Apply() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Apply for Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Apply Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Apply</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Service Type</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Select a service</option>
                <option>Birth Certificate</option>
                <option>Income Certificate</option>
                <option>Residence Certificate</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Aadhaar Number</label>
              <input 
                type="text" 
                placeholder="XXXX-XXXX-XXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Proceed to Apply
            </button>
          </div>
        </div>

        {/* Application Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Track Application</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Application ID</label>
              <input 
                type="text" 
                placeholder="Enter your application ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="w-full bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Track Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
