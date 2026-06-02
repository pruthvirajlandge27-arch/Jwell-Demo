import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Save, ArrowLeft } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const EditJewellery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    purity: '',
    weight: '',
    tags: '',
    isFeatured: false,
    isActive: true
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, jewelRes] = await Promise.all([
          axios.get(`${API_URL}/api/categories`),
          axios.get(`${API_URL}/api/jewellery/${id}`)
        ]);
        
        setCategories(catRes.data);
        
        const jewel = jewelRes.data;
        setFormData({
          title: jewel.title,
          category: jewel.category?._id || '',
          description: jewel.description || '',
          purity: jewel.purity || '',
          weight: jewel.weight || '',
          tags: jewel.tags ? jewel.tags.join(', ') : '',
          isFeatured: jewel.isFeatured,
          isActive: jewel.isActive
        });
        
        // Map existing images to expected format for ImageUploader
        if (jewel.images) {
          setImages(jewel.images.map(img => ({
            url: img.url,
            publicId: img.publicId,
            isPrimary: img.isPrimary,
            isNew: false
          })));
        }
      } catch (error) {
        toast.error('Failed to load data');
        navigate('/admin/jewellery');
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
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

      // Map final images array
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

      await axios.put(`${API_URL}/api/jewellery/${id}`, payload, config);
      
      toast.success('Jewellery updated successfully!');
      navigate('/admin/jewellery');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update jewellery');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="text-gold-primary p-6">Loading data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate('/admin/jewellery')} className="p-2 bg-admin-bg border border-gold-primary/20 rounded hover:bg-gold-primary/10 transition-colors">
          <ArrowLeft size={20} className="text-gold-primary" />
        </button>
        <h1 className="text-2xl font-heading text-gold-primary">Edit Jewellery</h1>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-heading text-text-light border-b border-gold-primary/20 pb-2">Basic Info</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Title *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="input-gold" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Category *</label>
              <select name="category" required value={formData.category} onChange={handleChange} className="input-gold appearance-none">
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Description</label>
            <textarea name="description" rows="3" value={formData.description} onChange={handleChange} className="input-gold resize-none"></textarea>
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
              <label className="block text-sm font-medium text-text-muted mb-1">Weight</label>
              <input type="text" name="weight" value={formData.weight} onChange={handleChange} className="input-gold" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Tags</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="input-gold" />
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
          <ImageUploader onImagesChange={setImages} initialImages={images} />
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={loading} className="btn-gold flex items-center min-w-[150px] justify-center">
            {loading ? (
              <div className="w-5 h-5 border-2 border-admin-bg border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <><Save size={18} className="mr-2" /> Update Jewellery</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJewellery;
