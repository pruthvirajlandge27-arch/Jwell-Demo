import { useState, useEffect } from 'react';
import { User } from 'lucide-react';

const AdminNavbar = () => {
  const [user, setUser] = useState({ name: 'Admin' });

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
      setUser(JSON.parse(adminUser));
    }
  }, []);

  return (
    <header className="h-16 bg-admin-card border-b border-gold-primary/20 flex items-center justify-between px-6 z-10">
      <div className="flex-1"></div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-text-light bg-admin-bg px-3 py-1.5 rounded-full border border-gold-primary/30">
          <div className="bg-gold-primary text-admin-bg p-1 rounded-full">
            <User size={16} />
          </div>
          <span className="text-sm font-medium">{user.name}</span>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
