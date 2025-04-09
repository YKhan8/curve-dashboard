import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const WeeklySchedulePreview = ({ schedules }) => {
  const navigate = useNavigate();
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
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

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate('/office-tracker')}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">This Week&apos;s Schedule</h2>
        <button
          onClick={() => navigate('/office-tracker')}
          className="text-kpmg-blue-primary hover:text-kpmg-blue-medium transition-colors"
        >
          View All
        </button>
      </div>

      {/* Time header */}
      <div className="grid grid-cols-[80px_1fr] gap-2 mb-4">
        <div></div>
        <div className="grid grid-cols-9 text-[10px] text-gray-600">
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
            <div key={day.toString()} className="grid grid-cols-[80px_1fr] gap-2 items-center">
              <div>
                <div className="font-medium text-gray-900">{format(day, 'EEEE')}</div>
                <div className="text-sm text-gray-600">{format(day, 'MMM d')}</div>
              </div>
              
              <div className="relative h-10 bg-gray-50 rounded">
                {schedule && (
                  <div 
                    className="absolute h-full bg-kpmg-blue-primary bg-opacity-20 rounded"
                    style={{
                      left: `${calculateBarPosition(schedule.start_time)}%`,
                      width: `${calculateBarPosition(schedule.end_time) - calculateBarPosition(schedule.start_time)}%`
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-between px-2">
                      <span className="text-xs font-medium text-gray-900 whitespace-nowrap">
                        {formatTimeDisplay(schedule.start_time)} - {formatTimeDisplay(schedule.end_time)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

WeeklySchedulePreview.propTypes = {
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      start_time: PropTypes.string.isRequired,
      end_time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default WeeklySchedulePreview; 