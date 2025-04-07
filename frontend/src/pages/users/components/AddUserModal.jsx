import { useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../../../config/supabase';

const AddUserModal = ({ onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Generate a secure temporary password
      const tempPassword = 'CurveDashboard2024!#';
      
      // Insert the new user into the employees table
      const { data, error: dbError } = await supabase
        .from('employees')
        .insert([{
          ...formData,
          password: tempPassword,
          status: 'active'  // Set default status
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      onUserAdded(data);
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-xl font-bold mb-4 text-kpmg-blue-primary">Add New User</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-kpmg-text mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary"
              required
            />
          </div>

          <div>
            <label className="block text-kpmg-text mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary"
              required
            />
          </div>

          <div>
            <label className="block text-kpmg-text mb-1">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary"
              required
            />
          </div>

          <div>
            <label className="block text-kpmg-text mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

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
              disabled={loading}
              className="px-4 py-2 bg-kpmg-blue-primary text-white rounded hover:bg-kpmg-blue-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUserAdded: PropTypes.func.isRequired
};

export default AddUserModal; 