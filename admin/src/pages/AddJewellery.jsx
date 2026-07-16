import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Save, ArrowLeft } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AddJewellery = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    purity: '22K Gold',
    weight: '',
    grossWeight: '',
    netWeight: '',
    productCode: '',
    tags: '',
    isFeatured: false,
    isActive: true
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories`);
        setCategories(res.data);
        if (res.data.length > 0) {
          setFormData(prev => ({ 
            ...prev, 
            category: res.data[0]._id,
            subcategory: res.data[0].subcategories?.[0]?.slug || ''
          }));
        }
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'category') {
      const selectedCat = categories.find(c => c._id === value);
      setFormData(prev => ({
        ...prev,
        category: value,
        subcategory: selectedCat?.subcategories?.[0]?.slug || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('adminToken');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      // 1. Upload new images first
      const newImages = images.filter(img => img.isNew);
      let uploadedUrls = [];

      if (newImages.length > 0) {
        const uploadData = new FormData();
        newImages.forEach(img => {
          uploadData.append('images', img.file);
        });

        const uploadRes = await axios.post(`${API_URL}/api/upload/images`, uploadData, {
          ...config,
          headers: { ...config.headers, 'Content-Type': 'multipart/form-data' }
        });
        
        uploadedUrls = uploadRes.data;
      }

      // Map final images array (combining newly uploaded with any existing logic if edit mode)
      let uploadIndex = 0;
      const finalImages = images.map(img => {
        if (img.isNew) {
          const uploaded = uploadedUrls[uploadIndex++];
          return { url: uploaded.url, publicId: uploaded.publicId, isPrimary: img.isPrimary };
        }
        return { url: img.url, publicId: img.publicId, isPrimary: img.isPrimary };
      });

      // 2. Submit jewellery data
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        images: finalImages
      };

      await axios.post(`${API_URL}/api/jewellery`, payload, config);
      
      toast.success('Jewellery added successfully!');
      navigate('/admin/jewellery');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add jewellery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate('/admin/jewellery')} className="p-2 bg-admin-bg border border-gold-primary/20 rounded hover:bg-gold-primary/10 transition-colors">
          <ArrowLeft size={20} className="text-gold-primary" />
        </button>
        <h1 className="text-2xl font-heading text-gold-primary">Add New Jewellery</h1>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-heading text-text-light border-b border-gold-primary/20 pb-2">Basic Info</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Title *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="input-gold" placeholder="e.g. 22K Gold Bridal Necklace" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Category *</label>
              <select name="category" required value={formData.category} onChange={handleChange} className="input-gold appearance-none">
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Subcategory *</label>
              <select name="subcategory" value={formData.subcategory} onChange={handleChange} className="input-gold appearance-none">
                <option value="">No Subcategory</option>
                {(categories.find(c => c._id === formData.category)?.subcategories || []).map(sub => (
                  <option key={sub.slug} value={sub.slug}>{sub.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Description</label>
            <textarea name="description" rows="3" value={formData.description} onChange={handleChange} className="input-gold resize-none" placeholder="Product details..."></textarea>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-heading text-text-light border-b border-gold-primary/20 pb-2">Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Purity</label>
              <select name="purity" value={formData.purity} onChange={handleChange} className="input-gold appearance-none">
                <option value="22K Gold">22K Gold</option>
                <option value="18K Gold">18K Gold</option>
                <option value="14K Gold">14K Gold</option>
                <option value="916 Hallmark">916 Hallmark</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Product Code</label>
              <input type="text" name="productCode" value={formData.productCode} onChange={handleChange} className="input-gold" placeholder="e.g. #Tpc/141" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Tags</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="input-gold" placeholder="wedding, daily-wear (comma separated)" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Gross Weight</label>
              <input type="text" name="grossWeight" value={formData.grossWeight} onChange={handleChange} className="input-gold" placeholder="e.g. 2.07g" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Net Weight</label>
              <input type="text" name="netWeight" value={formData.netWeight} onChange={handleChange} className="input-gold" placeholder="e.g. 1.9g" />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Total Weight (Legacy)</label>
              <input type="text" name="weight" value={formData.weight} onChange={handleChange} className="input-gold" placeholder="e.g. 15.5g" />
            </div>
          </div>

          <div className="flex space-x-8 pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-4 h-4 accent-gold-primary" />
              <span className="text-sm font-medium text-text-light">Featured on Home Page</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-4 h-4 accent-gold-primary" />
              <span className="text-sm font-medium text-text-light">Active (Visible)</span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-heading text-text-light border-b border-gold-primary/20 pb-2">Images *</h2>
          <ImageUploader onImagesChange={setImages} />
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={loading} className="btn-gold flex items-center min-w-[150px] justify-center">
            {loading ? (
              <div className="w-5 h-5 border-2 border-admin-bg border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <><Save size={18} className="mr-2" /> Save Jewellery</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJewellery;
