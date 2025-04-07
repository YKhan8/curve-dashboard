import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaTachometerAlt, FaUsers, FaBullhorn, FaSignOutAlt, FaCalendarAlt } from "react-icons/fa";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-kpmg-blue-primary h-screen w-64 flex flex-col">
      <div className="p-6">
        <h1 className="text-white text-2xl font-bold">CURVE</h1>
      </div>

      <nav className="flex-1 px-2">
        <Link
          to="/"
          className="flex items-center text-xl w-full px-6 py-4 text-white relative z-10 group"
        >
          <FaTachometerAlt className="mr-4" />
          Dashboard
          <div className="absolute inset-0 bg-kpmg-blue-medium transform scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 origin-center -z-10" />
        </Link>

        <Link
          to="/users"
          className="flex items-center text-xl w-full px-6 py-4 text-white relative z-10 group"
        >
          <FaUsers className="mr-4" />
          Users
          <div className="absolute inset-0 bg-kpmg-blue-medium transform scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 origin-center -z-10" />
        </Link>

        <Link
          to="/announcements"
          className="flex items-center text-xl w-full px-6 py-4 text-white relative z-10 group"
        >
          <FaBullhorn className="mr-4" />
          Announcements
          <div className="absolute inset-0 bg-kpmg-blue-medium transform scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 origin-center -z-10" />
        </Link>

        <Link
          to="/office-tracker"
          className="flex items-center text-xl w-full px-6 py-4 text-white relative z-10 group"
        >
          <FaCalendarAlt className="mr-4" />
          Schedule
          <div className="absolute inset-0 bg-kpmg-blue-medium transform scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 origin-center -z-10" />
        </Link>
      </nav>

      <div className="p-4">
        <button
          onClick={logout}
          className="flex items-center text-xl w-full px-6 py-4 text-red-500 relative z-10 group"
        >
          <FaSignOutAlt className="mr-4" />
          Logout
          <div className="absolute inset-0 bg-red-500/10 transform scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 origin-center -z-10" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;