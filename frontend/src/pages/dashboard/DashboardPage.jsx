import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import ProfileCard from './components/ProfileCard';
import RecentAnnouncements from './components/RecentAnnouncements';
import WeeklySchedulePreview from './components/WeeklySchedulePreview';
import { startOfWeek, endOfWeek, format } from 'date-fns';

const DashboardPage = () => {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const start = startOfWeek(new Date(), { weekStartsOn: 1 });
      const end = endOfWeek(new Date(), { weekStartsOn: 1 });

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
    }
  };

  return (
    <div className="flex h-screen bg-kpmg-bg">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 overflow-auto bg-kpmg-bg">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col">
            <div className="flex flex-col mb-1 mt-12 lg:mt-0">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Dashboard</h1>
              <div className="h-1 w-12 bg-kpmg-blue-primary rounded"></div>
            </div>
          </div>

          <div className="space-y-6 mt-6 lg:mt-8 max-w-3xl mx-auto px-2 lg:px-0">
            <div className="flex justify-center">
              <ProfileCard user={user} />
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <RecentAnnouncements />
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <WeeklySchedulePreview schedules={schedules} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 