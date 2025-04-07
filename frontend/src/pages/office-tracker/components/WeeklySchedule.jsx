import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import PropTypes from 'prop-types';
import AddOfficeHoursModal from './AddOfficeHoursModal';
import EditScheduleModal from './EditScheduleModal';

const WeeklySchedule = ({ schedules, onScheduleUpdate, selectedWeek }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));

  const getScheduleForDay = (date) => {
    return schedules.find(schedule => isSameDay(new Date(schedule.date), date));
  };

  const calculateBarPosition = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - 9) * 60 + minutes;
    return (totalMinutes / (8 * 60)) * 100; // Convert to percentage (8 hour workday)
  };

  const formatTimeDisplay = (time) => {
    return time.substring(0, 5); // This will convert "09:00:00" to "09:00"
  };

  const handleScheduleClick = (schedule) => {
    console.log('Schedule clicked:', schedule); // Debug log
    setSelectedSchedule(schedule);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedSchedule(null);
  };

  return (
    <div className="bg-white rounded-lg p-4">
      {/* Time header */}
      <div className="grid grid-cols-[80px_1fr] gap-2 mb-4">
        <div></div>
        <div className="grid grid-cols-9 text-[10px] text-kpmg-text">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="text-center border-l border-gray-100 first:border-l-0 -mb-1">
              {format(new Date().setHours(9 + i, 0), 'HH:mm')}
            </div>
          ))}
        </div>
      </div>

      {/* Days and schedule bars */}
      <div className="space-y-3">
        {weekDays.map((day) => {
          const schedule = getScheduleForDay(day);
          return (
            <div key={day.toString()} className="grid grid-cols-[80px_1fr] gap-2 items-center group">
              <div>
                <div className="font-medium text-gray-900">{format(day, 'EEEE')}</div>
                <div className="text-sm text-gray-600">{format(day, 'MMM d')}</div>
              </div>
              
              <div 
                className="relative h-10 bg-gray-50 rounded cursor-pointer group"
                onClick={() => !schedule && setSelectedDate(day)}
              >
                {schedule ? (
                  <div 
                    className="absolute h-full bg-kpmg-blue-primary bg-opacity-20 rounded cursor-pointer hover:bg-opacity-30 transition-colors"
                    style={{
                      left: `${calculateBarPosition(schedule.start_time)}%`,
                      width: `${calculateBarPosition(schedule.end_time) - calculateBarPosition(schedule.start_time)}%`
                    }}
                    onClick={() => handleScheduleClick(schedule)}
                  >
                    <div className="absolute inset-0 flex items-center justify-between px-2">
                      <span className="text-xs font-medium text-gray-900 whitespace-nowrap">
                        {formatTimeDisplay(schedule.start_time)} - {formatTimeDisplay(schedule.end_time)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-xs text-gray-600">Click to add hours</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <AddOfficeHoursModal
          isOpen={!!selectedDate}
          onClose={() => setSelectedDate(null)}
          onScheduleAdded={onScheduleUpdate}
          selectedDate={selectedDate}
        />
      )}

      <EditScheduleModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        schedule={selectedSchedule}
        onScheduleUpdated={onScheduleUpdate}
      />
    </div>
  );
};

WeeklySchedule.propTypes = {
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      start_time: PropTypes.string.isRequired,
      end_time: PropTypes.string.isRequired,
    })
  ).isRequired,
  onScheduleUpdate: PropTypes.func.isRequired,
  selectedWeek: PropTypes.instanceOf(Date).isRequired,
};

export default WeeklySchedule; 