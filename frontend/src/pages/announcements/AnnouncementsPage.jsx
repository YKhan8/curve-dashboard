import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Sidebar from '../../components/Sidebar';
import { format } from 'date-fns';
import AddAnnouncementModal from './components/AddAnnouncementModal';

const ANNOUNCEMENT_TYPES = {
  General: { emoji: '📢', description: 'General announcements' },
  Maintenance: { emoji: '🔧', description: 'System maintenance updates' },
  'Product Update': { emoji: '🚀', description: 'Product updates and releases' },
  Process: { emoji: '🧠', description: 'Process changes and updates' },
  Office: { emoji: '🏢', description: 'Office-related announcements' },
  Celebration: { emoji: '🎉', description: 'Celebrations and events' }
};

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnnouncementAdded = (newAnnouncement) => {
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const handleDeleteAnnouncement = async (id) => {
    setAnnouncementToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', announcementToDelete);

      if (error) throw error;
      setAnnouncements(prev => prev.filter(announcement => announcement.id !== announcementToDelete));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    } finally {
      setShowDeleteConfirm(false);
      setAnnouncementToDelete(null);
    }
  };

  return (
    <div className="flex h-screen bg-kpmg-bg">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">Announcements</h1>
              <div className="h-1 w-12 bg-kpmg-blue-primary rounded"></div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-kpmg-blue-primary text-white px-3 py-2 lg:px-6 lg:py-3 text-sm lg:text-base rounded-lg hover:bg-kpmg-blue-medium transition-colors"
            >
              New Announcement
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No announcements yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white rounded-lg shadow-md p-6 relative group">
                  <button
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Delete announcement"
                  >
                    <span className="text-2xl font-bold">×</span>
                  </button>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {ANNOUNCEMENT_TYPES[announcement.category]?.emoji || '📢'}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900">{announcement.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{announcement.content}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <div className="text-sm text-gray-500 -mt-1">Posted by {announcement.posted_by}</div>
                      <div className="text-xs text-gray-400">
                        {format(new Date(announcement.date), 'MMM d, yyyy')}
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {announcement.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showAddModal && (
        <AddAnnouncementModal
          onClose={() => setShowAddModal(false)}
          onAnnouncementAdded={handleAnnouncementAdded}
        />
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
            <h3 className="text-xl font-bold mb-4">Delete Announcement</h3>
            <p className="mb-6">Are you sure you want to delete this announcement?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setAnnouncementToDelete(null);
                }}
                className="px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage; 