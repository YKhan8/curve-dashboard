import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar'
import ProfileCard from './components/ProfileCard';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';
import RecentAnnouncements from './components/RecentAnnouncements';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('email', user?.email)
        .single();

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserData();
    }
  }, [user]);

  const handleProfileUpdate = () => {
    fetchUserData();
  };

  return (
    <div className="flex h-screen bg-[#F2F2F2]">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="space-y-6">
            <div className="flex justify-center">
              {loading ? (
                <div className="text-center text-kpmg-blue-primary">Loading profile...</div>
              ) : (
                <ProfileCard 
                  user={userData} 
                  onUpdate={handleProfileUpdate}
                />
              )}
            </div>
            <RecentAnnouncements />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 