export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Government Services</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Document Services */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl mb-4">📄</div>
          <h2 className="text-xl font-semibold mb-3">Document Services</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Birth Certificate</li>
            <li>Income Certificate</li>
            <li>Residence Certificate</li>
            <li>Marriage Certificate</li>
          </ul>
        </div>

        {/* Financial Services */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl mb-4">💳</div>
          <h2 className="text-xl font-semibold mb-3">Financial Services</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Tax Payments</li>
            <li>Bill Payments</li>
            <li>Pension Services</li>
            <li>Government Schemes</li>
          </ul>
        </div>

        {/* Educational Services */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="text-3xl mb-4">📚</div>
          <h2 className="text-xl font-semibold mb-3">Educational Services</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Scholarship Applications</li>
            <li>Student Verification</li>
            <li>Education Loans</li>
            <li>Skill Development</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
