import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

const ScheduleStats = ({ schedules }) => {
  const stats = useMemo(() => {
    let totalHours = 0;
    let daysInOffice = 0;
    let averageHoursPerDay = 0;

    if (schedules.length > 0) {
      schedules.forEach(schedule => {
        const start = new Date(`2000-01-01T${schedule.start_time}`);
        const end = new Date(`2000-01-01T${schedule.end_time}`);
        const hours = (end - start) / (1000 * 60 * 60);
        totalHours += hours;
      });

      daysInOffice = new Set(schedules.map(s => s.date)).size;
      averageHoursPerDay = totalHours / daysInOffice;
    }

    return {
      totalHours: totalHours.toFixed(1),
      daysInOffice,
      averageHoursPerDay: averageHoursPerDay.toFixed(1)
    };
  }, [schedules]);

  const formatTimeDisplay = (time) => {
    return time.substring(0, 5); // This will convert "09:00:00" to "09:00"
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Total Hours</div>
            <div className="text-2xl font-bold text-kpmg-blue-primary">{stats.totalHours}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Days in Office</div>
            <div className="text-2xl font-bold text-kpmg-blue-primary">{stats.daysInOffice}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Average Hours per Day</div>
            <div className="text-2xl font-bold text-kpmg-blue-primary">{stats.averageHoursPerDay}</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Schedule Overview</h3>
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="font-medium text-gray-700">
                {format(parseISO(schedule.date), 'EEEE, MMMM d')}
              </div>
              <div className="text-sm text-gray-600">
                {formatTimeDisplay(schedule.start_time)} - {formatTimeDisplay(schedule.end_time)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ScheduleStats.propTypes = {
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      start_time: PropTypes.string.isRequired,
      end_time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ScheduleStats; 