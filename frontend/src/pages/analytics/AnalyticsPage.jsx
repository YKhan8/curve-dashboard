import Sidebar from '../../components/Sidebar';

const AnalyticsPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 tracking-wide">Analytics</h1>
          <p className="text-gray-600">
            View employee statistics and performance metrics.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage; 