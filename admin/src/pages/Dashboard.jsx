import { useState, useEffect } from 'react';
import axios from 'axios';
import { Gem, Tags, Star, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJewellery: 0,
    totalCategories: 0,
    featuredItems: 0,
    recentUploads: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jewelleryRes, categoriesRes] = await Promise.all([
        axios.get(`${API_URL}/api/jewellery?all=true`),
        axios.get(`${API_URL}/api/categories?all=true`)
      ]);

      const jewellery = jewelleryRes.data;
      const categories = categoriesRes.data;

      setStats({
        totalJewellery: jewellery.length,
        totalCategories: categories.length,
        featuredItems: jewellery.filter(j => j.isFeatured).length,
        recentUploads: jewellery.slice(0, 10) // First 10 (assuming sorted by new)
      });
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Jewellery', value: stats.totalJewellery, icon: <Gem className="text-gold-primary" size={24} /> },
    { title: 'Total Categories', value: stats.totalCategories, icon: <Tags className="text-gold-primary" size={24} /> },
    { title: 'Featured Items', value: stats.featuredItems, icon: <Star className="text-gold-primary" size={24} /> },
    { title: 'Recent Uploads', value: stats.recentUploads.length, icon: <Clock className="text-gold-primary" size={24} /> }
  ];

  if (loading) return <div className="text-gold-primary">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading text-gold-primary mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-text-light mt-1">{stat.value}</h3>
            </div>
            <div className="bg-gold-primary/10 p-3 rounded-full border border-gold-primary/20">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-8">
        <h2 className="text-xl font-heading text-gold-primary mb-4">Recent Uploads</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gold-primary/20 text-text-muted text-sm">
                <th className="py-3 px-4 font-medium">Image</th>
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentUploads.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-text-muted">No items found.</td>
                </tr>
              ) : (
                stats.recentUploads.map((item) => (
                  <tr key={item._id} className="border-b border-gold-primary/10 hover:bg-gold-primary/5 transition-colors">
                    <td className="py-3 px-4">
                      {item.images && item.images.length > 0 ? (
                        <img src={item.images.find(img => img.isPrimary)?.url || item.images[0].url} alt={item.title} className="w-12 h-12 rounded object-cover border border-gold-primary/30" />
                      ) : (
                        <div className="w-12 h-12 rounded bg-admin-bg border border-gold-primary/30 flex items-center justify-center">
                          <Gem size={16} className="text-text-muted" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-text-light font-medium">{item.title}</td>
                    <td className="py-3 px-4 text-text-muted">{item.category?.name || 'Uncategorized'}</td>
                    <td className="py-3 px-4 text-text-muted">{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
