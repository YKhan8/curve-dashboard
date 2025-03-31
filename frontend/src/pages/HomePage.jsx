import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-8">Welcome to Curve Dashboard</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Your Profile</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              {/* Add more user information as needed */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;