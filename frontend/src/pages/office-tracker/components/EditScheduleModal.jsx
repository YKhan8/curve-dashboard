import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Range } from 'react-range';
import { supabase } from '../../../supabaseClient';

function generateTimeOptions() {
  const options = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      // Skip times after 17:00
      if (hour === 17 && minute > 0) continue;
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      options.push(time);
    }
  }
  return options;
}

const TIME_OPTIONS = generateTimeOptions();
const TOTAL_STEPS = TIME_OPTIONS.length - 1;

const EditScheduleModal = ({ isOpen, onClose, schedule, onScheduleUpdated }) => {
  // Initialize values directly from schedule
  const [values, setValues] = useState(() => {
    if (schedule) {
      const startIndex = TIME_OPTIONS.findIndex(t => t === schedule.start_time);
      const endIndex = TIME_OPTIONS.findIndex(t => t === schedule.end_time);
      return [startIndex !== -1 ? startIndex : 0, endIndex !== -1 ? endIndex : TOTAL_STEPS];
    }
    return [0, TOTAL_STEPS];
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset values when schedule changes
  useEffect(() => {
    if (schedule) {
      console.log('Schedule changed:', schedule); // Debug log
      const startIndex = TIME_OPTIONS.findIndex(t => t === schedule.start_time);
      const endIndex = TIME_OPTIONS.findIndex(t => t === schedule.end_time);
      console.log('New indices:', startIndex, endIndex); // Debug log
      if (startIndex !== -1 && endIndex !== -1) {
        setValues([startIndex, endIndex]);
      }
    }
  }, [schedule?.id, schedule?.start_time, schedule?.end_time]); // Add specific dependencies

  const getTimeFromIndex = (index) => {
    return TIME_OPTIONS[Math.max(0, Math.min(index, TOTAL_STEPS))];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const startTime = getTimeFromIndex(values[0]);
    const endTime = getTimeFromIndex(values[1]);

    try {
      // Check for overlapping schedules
      const { data: existingSchedules, error: fetchError } = await supabase
        .from('office_schedules')
        .select('*')
        .eq('date', schedule.date)
        .neq('id', schedule.id);

      if (fetchError) throw fetchError;

      const hasOverlap = existingSchedules.some(existingSchedule => {
        const newStart = new Date(`2000-01-01T${startTime}`);
        const newEnd = new Date(`2000-01-01T${endTime}`);
        const existingStart = new Date(`2000-01-01T${existingSchedule.start_time}`);
        const existingEnd = new Date(`2000-01-01T${existingSchedule.end_time}`);

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

      const { error: updateError } = await supabase
        .from('office_schedules')
        .update({ start_time: startTime, end_time: endTime })
        .eq('id', schedule.id);

      if (updateError) throw updateError;

      onScheduleUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating schedule:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !schedule) return null;

  // Debug log current state
  console.log('Current schedule:', schedule);
  console.log('Current values:', values);
  console.log('Time options:', TIME_OPTIONS);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Schedule</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Start Time: {getTimeFromIndex(values[0])}
              </span>
              <span className="text-sm font-medium text-gray-700">
                End Time: {getTimeFromIndex(values[1])}
              </span>
            </div>
            
            <div className="px-4 py-8">
              <Range
                values={values}
                step={1}
                min={0}
                max={TOTAL_STEPS}
                onChange={(newValues) => {
                  // Ensure the values are within bounds and properly ordered
                  const start = Math.max(0, Math.min(newValues[0], TOTAL_STEPS));
                  const end = Math.max(start, Math.min(newValues[1], TOTAL_STEPS));
                  setValues([start, end]);
                }}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '6px',
                      width: '100%',
                      backgroundColor: '#E5E7EB',
                      borderRadius: '3px',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        height: '100%',
                        backgroundColor: '#00338D',
                        borderRadius: '3px',
                        left: `${(values[0] / TOTAL_STEPS) * 100}%`,
                        width: `${((values[1] - values[0]) / TOTAL_STEPS) * 100}%`,
                      }}
                    />
                    {children}
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '20px',
                      width: '20px',
                      backgroundColor: '#FFF',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: '0px 2px 6px #AAA',
                      borderRadius: '50%',
                      border: '2px solid #00338D',
                    }}
                  >
                    <div
                      style={{
                        height: '8px',
                        width: '8px',
                        backgroundColor: isDragged ? '#00338D' : '#CCC',
                        borderRadius: '50%',
                      }}
                    />
                  </div>
                )}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>9:00</span>
              <span>17:00</span>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
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
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditScheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  schedule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
  }).isRequired,
  onScheduleUpdated: PropTypes.func.isRequired,
};

export default EditScheduleModal; 