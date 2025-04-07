import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import WeeklySchedule from './components/WeeklySchedule';
import ScheduleStats from './components/ScheduleStats';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import AddOfficeHoursModal from './components/AddOfficeHoursModal';

const OfficeTrackerPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, [user, selectedWeek]);

  const fetchSchedules = async () => {
    try {
      const start = startOfWeek(selectedWeek, { weekStartsOn: 1 });
      const end = endOfWeek(selectedWeek, { weekStartsOn: 1 });

      const { data, error } = await supabase
        .from('office_schedules')
        .select('*')
        .gte('date', format(start, 'yyyy-MM-dd'))
        .lte('date', format(end, 'yyyy-MM-dd'))
        .order('date', { ascending: true });

      if (error) throw error;
      setSchedules(data || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedWeek(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedWeek(newDate);
  };

  return (
    <div className="flex h-screen bg-kpmg-bg">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto bg-kpmg-bg">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-kpmg-blue-primary text-white px-6 py-3 rounded-lg hover:bg-kpmg-blue-medium transition-colors"
            >
              Add Office Hours
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={handlePreviousWeek}
                  className="text-kpmg-blue-primary hover:text-kpmg-blue-medium"
                >
                  ← Previous Week
                </button>
                <h2 className="text-xl font-semibold">
                  Week of {format(startOfWeek(selectedWeek, { weekStartsOn: 1 }), 'MMM d, yyyy')}
                </h2>
                <button
                  onClick={handleNextWeek}
                  className="text-kpmg-blue-primary hover:text-kpmg-blue-medium"
                >
                  Next Week →
                </button>
              </div>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kpmg-blue-primary"></div>
                </div>
              ) : (
                <WeeklySchedule 
                  schedules={schedules} 
                  onScheduleUpdate={fetchSchedules}
                  selectedWeek={selectedWeek}
                />
              )}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <ScheduleStats schedules={schedules} />
            </div>
          </div>
        </div>

        {showAddModal && (
          <AddOfficeHoursModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onScheduleAdded={fetchSchedules}
            selectedDate={new Date()}
          />
        )}
      </main>
    </div>
  );
};

export default OfficeTrackerPage; 