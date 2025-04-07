import PropTypes from 'prop-types';
import { format } from 'date-fns';

const AnnouncementCard = ({ announcement }) => {
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'important':
        return 'bg-red-100 text-red-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'general':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-kpmg-blue-primary mb-2">
              {announcement.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-kpmg-text">
              <span>Posted by {announcement.employees?.name}</span>
              <span>•</span>
              <span>{format(new Date(announcement.created_at), 'MMM d, yyyy h:mm a')}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(announcement.category)}`}>
            {announcement.category}
          </span>
        </div>
        
        <div className="prose max-w-none text-kpmg-text">
          {announcement.content}
        </div>
      </div>
    </div>
  );
};

AnnouncementCard.propTypes = {
  announcement: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    employees: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }).isRequired
};

export default AnnouncementCard; 