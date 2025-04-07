import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import UserCard from './components/UserCard';
import AddUserModal from './components/AddUserModal';
import { supabase } from '../../config/supabase';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('name');

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAdded = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-kpmg-bg">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="w-full">
          <h1 className="text-5xl font-bold mb-6 pl-4">Users</h1>
          
          <div className="flex items-center gap-4 mb-6 px-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 max-w-2xl px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-kpmg-blue-primary"
            />
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-kpmg-blue-primary text-white px-6 py-2 rounded-lg hover:bg-kpmg-blue-medium transition"
            >
              Add User
            </button>
          </div>

          {loading ? (
            <div className="text-center text-lg">Loading users...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {filteredUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </div>
      </main>

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onUserAdded={handleUserAdded}
        />
      )}
    </div>
  );
};

export default UsersPage;