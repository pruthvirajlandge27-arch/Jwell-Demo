import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Gem, Tags, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Jewellery', path: '/admin/jewellery', icon: <Gem size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <Tags size={20} /> },
  ];

  return (
    <div className="w-64 bg-admin-sidebar text-text-light flex flex-col border-r border-gold-primary/20">
      <div className="h-16 flex items-center justify-center border-b border-gold-primary/20">
        <h2 className="text-xl font-heading text-gold-primary">Kubde Jewellers</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-gold-primary/10 text-gold-primary border-l-4 border-gold-primary'
                    : 'text-text-muted hover:bg-gold-primary/5 hover:text-text-light border-l-4 border-transparent'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gold-primary/20">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center px-4 py-3 text-sm font-medium rounded-md text-text-muted hover:bg-red-900/30 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
