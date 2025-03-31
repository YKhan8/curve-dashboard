import Sidebar from '../components/Sidebar'

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-8">Dashboard Overview</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Employee Status Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Employee Status</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Employees</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Online</span>
                  <span className="text-green-600 font-medium">0</span>
                </div>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Recent Activity</h2>
              <p className="text-gray-600">No recent activity to display.</p>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">
                  View All Employees
                </button>
                <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage 