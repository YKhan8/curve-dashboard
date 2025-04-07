import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { supabase } from '../../../supabaseClient';

const AddOfficeHoursModal = ({ isOpen, onClose, onScheduleAdded, selectedDate }) => {
  const [formData, setFormData] = useState({
    date: format(selectedDate || new Date(), 'yyyy-MM-dd'),
    start_time: '09:00',
    end_time: '17:00'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: format(selectedDate, 'yyyy-MM-dd')
      }));
    }
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check for overlapping schedules
      const { data: existingSchedules, error: fetchError } = await supabase
        .from('office_schedules')
        .select('*')
        .eq('date', formData.date);

      if (fetchError) throw fetchError;

      const hasOverlap = existingSchedules.some(schedule => {
        const newStart = new Date(`2000-01-01T${formData.start_time}`);
        const newEnd = new Date(`2000-01-01T${formData.end_time}`);
        const existingStart = new Date(`2000-01-01T${schedule.start_time}`);
        const existingEnd = new Date(`2000-01-01T${schedule.end_time}`);

        return (
          (newStart >= existingStart && newStart < existingEnd) ||
          (newEnd > existingStart && newEnd <= existingEnd) ||
          (newStart <= existingStart && newEnd >= existingEnd)
        );
      });

      if (hasOverlap) {
        setError('This time slot overlaps with an existing schedule. Please choose a different time.');
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from('office_schedules')
        .insert([formData]);

      if (insertError) throw insertError;

      onScheduleAdded();
      onClose();
    } catch (error) {
      console.error('Error adding office hours:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Office Hours</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={formData.start_time}
              onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              value={formData.end_time}
              onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-kpmg-blue-primary text-white px-4 py-2 rounded-md hover:bg-kpmg-blue-medium disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Hours'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddOfficeHoursModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onScheduleAdded: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
};

export default AddOfficeHoursModal; 