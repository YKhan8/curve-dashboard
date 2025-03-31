import Sidebar from '../components/Sidebar';

const AnnouncementsPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Announcements</h1>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              New Announcement
            </button>
          </div>

          <div className="space-y-6">
            {/* Empty state */}
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-gray-500 mb-4">No announcements yet</div>
              <p className="text-gray-600">
                Create your first announcement to keep your team informed.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnnouncementsPage; 