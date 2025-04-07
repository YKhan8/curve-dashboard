import { useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../../../supabaseClient';

const ANNOUNCEMENT_TYPES = {
  General: { emoji: '📢', description: 'General announcements' },
  Maintenance: { emoji: '🔧', description: 'System maintenance updates' },
  'Product Update': { emoji: '🚀', description: 'Product updates and releases' },
  Process: { emoji: '🧠', description: 'Process changes and updates' },
  Office: { emoji: '🏢', description: 'Office-related announcements' },
  Celebration: { emoji: '🎉', description: 'Celebrations and events' }
};

const AddAnnouncementModal = ({ onClose, onAnnouncementAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    posted_by: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newAnnouncement = {
        emoji: ANNOUNCEMENT_TYPES[formData.category].emoji,
        title: formData.title,
        content: formData.content,
        posted_by: formData.posted_by,
        date: new Date().toISOString().split('T')[0],
        category: formData.category
      };

      const { data, error } = await supabase
        .from('announcements')
        .insert([newAnnouncement])
        .select()
        .single();

      if (error) throw error;

      onAnnouncementAdded(data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">New Announcement</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter announcement title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="posted_by">
              Your Name
            </label>
            <input
              id="posted_by"
              type="text"
              value={formData.posted_by}
              onChange={(e) => setFormData({ ...formData, posted_by: e.target.value })}
              placeholder="Enter your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              {Object.keys(ANNOUNCEMENT_TYPES).map((category) => (
                <option key={category} value={category}>
                  {ANNOUNCEMENT_TYPES[category].emoji} {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddAnnouncementModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAnnouncementAdded: PropTypes.func.isRequired
};

export default AddAnnouncementModal; 