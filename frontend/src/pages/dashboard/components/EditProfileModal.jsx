import { useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../../../config/supabase';

const EditProfileModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    role: user?.role || '',
    location: user?.location || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('employees')
        .update({
          name: formData.name,
          role: formData.role,
          location: formData.location
        })
        .eq('id', user.id);

      if (error) throw error;

      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-xl font-bold mb-4 text-kpmg-blue-primary">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-kpmg-text mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary"
            />
          </div>
          <div>
            <label className="block text-kpmg-text mb-1">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary"
            />
          </div>
          <div>
            <label className="block text-kpmg-text mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary"
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-kpmg-text hover:bg-kpmg-bg rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-kpmg-blue-primary text-white rounded hover:bg-kpmg-blue-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditProfileModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    location: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default EditProfileModal; 