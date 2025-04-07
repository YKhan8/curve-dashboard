import { useState } from 'react';
import PropTypes from 'prop-types';
import profileImage from '../../../images/billy-rice.jpg';
import { FaPen } from 'react-icons/fa';
import EditProfileModal from './EditProfileModal';

const ProfileCard = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-4 hover:shadow-xl transition-shadow w-[340px] relative">
      {/* Edit Button */}
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-4 right-4 p-2 rounded-full bg-kpmg-blue-primary text-white hover:bg-kpmg-blue-medium transition-colors"
      >
        <FaPen size={14} />
      </button>

      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full bg-gray-200 mb-5 overflow-hidden">
          <img
            src={profileImage}
            alt={`${user?.name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold mb-2 text-kpmg-blue-primary">{user?.name}</h2>
        <p className="text-kpmg-blue-medium mb-4">{user?.role}</p>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 mb-5">
          <span className="h-2 w-2 bg-kpmg-green rounded-full"></span>
          <span className="text-kpmg-text">Online</span>
        </div>

        {/* Additional Info */}
        <div className="w-full space-y-3">
          <div className="flex justify-center items-center gap-2">
            <span className="text-kpmg-text">Email:</span>
            <span className="font-semibold text-kpmg-blue-primary">{user?.email}</span>
          </div>
          
          <div className="flex justify-center items-center gap-2">
            <span className="text-kpmg-text">Location:</span>
            <span className="font-semibold text-kpmg-blue-primary">{user?.location}</span>
          </div>
        </div>
      </div>

      {isEditing && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditing(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    location: PropTypes.string,
    avatar_url: PropTypes.string
  }),
  onUpdate: PropTypes.func.isRequired
};

export default ProfileCard; 