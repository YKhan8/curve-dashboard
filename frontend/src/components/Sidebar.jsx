import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTachometerAlt, FaUsers, FaBullhorn } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      <div className="p-6">
        <h1 className="text-3xl font-bold">CURVE</h1>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="flex items-center px-6 py-3 hover:bg-blue-800">
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" className="flex items-center px-6 py-3 hover:bg-blue-800">
              <FaUsers className="mr-3" />
              Users
            </Link>
          </li>
          <li>
            <Link to="/announcements" className="flex items-center px-6 py-3 hover:bg-blue-800">
              <FaBullhorn className="mr-3" />
              Announcements
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-6 py-3 hover:bg-blue-800 text-red-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 