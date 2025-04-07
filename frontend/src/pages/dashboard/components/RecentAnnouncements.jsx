import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ANNOUNCEMENT_TYPES } from '../../../constants/announcements';

const RecentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentAnnouncements();
  }, []);

  const fetchRecentAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('date', { ascending: false })
        .limit(3);

      if (error) throw error;
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate('/announcements')}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Announcements</h2>
        <span className="text-sm text-blue-600 hover:text-blue-800">View all →</span>
      </div>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="border-b last:border-b-0 pb-3 last:pb-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xl">
                {ANNOUNCEMENT_TYPES[announcement.category]?.emoji || '📢'}
              </span>
              <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-2">
              {truncateText(announcement.content, 100)}
            </p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Posted by {announcement.posted_by}</span>
              <span>{format(new Date(announcement.date), 'MMM d, yyyy')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAnnouncements; 