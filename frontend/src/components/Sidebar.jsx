import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaBullhorn, FaCalendarAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    { icon: FaHome, text: 'Dashboard', path: '/dashboard' },
    { icon: FaUsers, text: 'Users', path: '/users' },
    { icon: FaBullhorn, text: 'Announcements', path: '/announcements' },
    { icon: FaCalendarAlt, text: 'Schedule', path: '/office-tracker' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-kpmg-blue-primary text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-kpmg-blue-primary text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold">CURVE</h1>
        </div>

        <nav className="flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center text-xl w-full relative z-10 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center px-6 py-4 w-full">
                <item.icon className="mr-4" />
                {item.text}
              </div>
              <div className="absolute inset-0 bg-kpmg-blue-medium transform scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 origin-center -z-10" />
            </Link>
          ))}
        </nav>

        <div>
          <button
            onClick={handleLogout}
            className="flex items-center text-xl w-full relative z-10 group"
          >
            <div className="flex items-center px-6 py-4 w-full text-red-500">
              <FaSignOutAlt className="mr-4" />
              Logout
            </div>
            <div className="absolute inset-0 bg-red-500/20 transform scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 origin-center -z-10" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;