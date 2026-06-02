import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Save, X, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: '',
    sortOrder: 0,
    isActive: true
  });
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/categories?all=true`);
      setCategories(res.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      // Auto-generate slug from name if not manually edited
      ...(name === 'name' && !editingId && { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/categories/${editingId}`, formData, config);
        toast.success('Category updated');
      } else {
        await axios.post(`${API_URL}/api/categories`, formData, config);
        toast.success('Category added');
      }
      
      resetForm();
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure? This might affect jewellery linked to this category.')) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`${API_URL}/api/categories/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Category deleted');
        fetchCategories();
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  const startEdit = (cat) => {
    setEditingId(cat._id);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon || '',
      sortOrder: cat.sortOrder || 0,
      isActive: cat.isActive
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: '', slug: '', icon: '', sortOrder: 0, isActive: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading text-gold-primary">Manage Categories</h1>
        {!showAddForm && (
          <button onClick={() => setShowAddForm(true)} className="btn-gold flex items-center">
            <Plus size={18} className="mr-2" /> Add Category
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="card border-l-4 border-l-gold-primary">
          <div className="flex justify-between items-center mb-4 border-b border-gold-primary/20 pb-2">
            <h2 className="text-lg font-heading text-text-light">{editingId ? 'Edit Category' : 'Add New Category'}</h2>
            <button onClick={resetForm} className="text-text-muted hover:text-red-400">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="input-gold py-1.5" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Slug *</label>
                <input type="text" name="slug" required value={formData.slug} onChange={handleInputChange} className="input-gold py-1.5" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Icon Label (Optional)</label>
                <input type="text" name="icon" value={formData.icon} onChange={handleInputChange} className="input-gold py-1.5" placeholder="e.g. Diamond" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Sort Order</label>
                <input type="number" name="sortOrder" value={formData.sortOrder} onChange={handleInputChange} className="input-gold py-1.5" />
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4 accent-gold-primary" />
                <span className="text-sm text-text-light">Active</span>
              </label>
              
              <button type="submit" className="btn-gold py-1.5 px-6 flex items-center text-sm">
                <Save size={16} className="mr-2" /> {editingId ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        {loading ? (
          <div className="text-gold-primary py-4 text-center">Loading categories...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gold-primary/20 text-text-muted text-sm uppercase tracking-wider">
                  <th className="py-3 px-4 font-medium w-16">Icon</th>
                  <th className="py-3 px-4 font-medium">Name</th>
                  <th className="py-3 px-4 font-medium">Slug</th>
                  <th className="py-3 px-4 font-medium text-center">Order</th>
                  <th className="py-3 px-4 font-medium text-center">Status</th>
                  <th className="py-3 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-text-muted">No categories found.</td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat._id} className="border-b border-gold-primary/10 hover:bg-gold-primary/5 transition-colors">
                      <td className="py-3 px-4 text-center text-gold-primary">
                        <Tag size={18} className="mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-text-light font-medium">{cat.name}</td>
                      <td className="py-3 px-4 text-text-muted">{cat.slug}</td>
                      <td className="py-3 px-4 text-center text-text-muted">{cat.sortOrder}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${cat.isActive ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                          {cat.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button onClick={() => startEdit(cat)} className="p-1.5 bg-blue-900/30 text-blue-400 rounded hover:bg-blue-900/50 transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(cat._id)} className="p-1.5 bg-red-900/30 text-red-400 rounded hover:bg-red-900/50 transition-colors">
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

export default ManageCategories;
