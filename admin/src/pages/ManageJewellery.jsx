import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ManageJewellery = () => {
  const [jewellery, setJewellery] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const fetchJewellery = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/jewellery?all=true`);
      setJewellery(res.data);
    } catch (error) {
      toast.error('Failed to fetch jewellery');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/categories?all=true`);
      setCategories(res.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    Promise.all([fetchJewellery(), fetchCategories()]).then(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${API_URL}/api/jewellery/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Jewellery deleted');
        fetchJewellery(); // Refresh list
      } catch (error) {
        toast.error('Failed to delete item');
      }
    }
  };

  const filteredJewellery = jewellery.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? item.category?.slug === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-heading text-gold-primary">Manage Jewellery</h1>
        <Link to="/admin/jewellery/add" className="btn-gold flex items-center">
          <Plus size={18} className="mr-2" /> Add New
        </Link>
      </div>

      <div className="card space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-muted" />
            </div>
            <input
              type="text"
              className="input-gold pl-10"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-text-muted" />
            </div>
            <select
              className="input-gold pl-10 appearance-none bg-admin-bg"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-gold-primary py-8 text-center">Loading jewellery...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold-primary/20 text-text-muted text-sm uppercase tracking-wider">
                  <th className="py-3 px-4 font-medium">Image</th>
                  <th className="py-3 px-4 font-medium">Title</th>
                  <th className="py-3 px-4 font-medium">Category</th>
                  <th className="py-3 px-4 font-medium">Purity</th>
                  <th className="py-3 px-4 font-medium text-center">Featured</th>
                  <th className="py-3 px-4 font-medium text-center">Status</th>
                  <th className="py-3 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJewellery.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-text-muted">No jewellery found matching criteria.</td>
                  </tr>
                ) : (
                  filteredJewellery.map((item) => (
                    <tr key={item._id} className="border-b border-gold-primary/10 hover:bg-gold-primary/5 transition-colors">
                      <td className="py-3 px-4">
                        {item.images && item.images.length > 0 ? (
                          <img src={item.images.find(img => img.isPrimary)?.url || item.images[0].url} alt={item.title} className="w-16 h-16 rounded object-cover border border-gold-primary/30" />
                        ) : (
                          <div className="w-16 h-16 rounded bg-admin-bg border border-gold-primary/30 flex items-center justify-center text-text-muted text-xs">No img</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-text-light font-medium">{item.title}</td>
                      <td className="py-3 px-4 text-text-muted">{item.category?.name || '-'}</td>
                      <td className="py-3 px-4 text-text-muted">{item.purity || '-'}</td>
                      <td className="py-3 px-4 text-center">
                        {item.isFeatured ? <span className="text-green-500">✅</span> : <span className="text-text-muted opacity-30">❌</span>}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${item.isActive ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                          {item.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Link to={`/admin/jewellery/edit/${item._id}`} className="p-2 bg-blue-900/30 text-blue-400 rounded hover:bg-blue-900/50 transition-colors">
                            <Edit size={16} />
                          </Link>
                          <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-900/30 text-red-400 rounded hover:bg-red-900/50 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJewellery;
