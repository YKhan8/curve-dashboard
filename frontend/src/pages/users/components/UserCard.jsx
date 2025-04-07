import PropTypes from 'prop-types';

const UserCard = ({ user }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-[320px]">
    <div className="flex flex-col items-center text-center">
      <h3 className="text-2xl font-bold truncate w-full text-kpmg-blue-primary">{user.name}</h3>
      <p className="text-kpmg-text mb-2 truncate w-full">{user.email}</p>
      
      <div className="flex items-center gap-2 mb-3">
        <span className="h-2 w-2 bg-kpmg-green rounded-full"></span>
        <span className="text-kpmg-text">Online</span>
      </div>

      <div className="w-full space-y-2">
        <div className="flex justify-center items-center gap-2">
          <span className="text-kpmg-text">Role:</span>
          <span className="font-semibold text-kpmg-blue-primary">{user.role}</span>
        </div>

        <div className="flex justify-center items-center gap-2">
          <span className="text-kpmg-text">Status:</span>
          <span className="bg-kpmg-green/10 text-kpmg-green px-3 py-0.5 rounded-full text-sm font-medium">
            Active
          </span>
        </div>

        <div className="flex justify-center items-center gap-2">
          <span className="text-kpmg-text">Location:</span>
          <span className="font-semibold text-kpmg-blue-primary">{user.location}</span>
        </div>
      </div>
    </div>
  </div>
);

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  }).isRequired
};

export default UserCard;