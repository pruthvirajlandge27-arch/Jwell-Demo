import { useState, useRef } from 'react';
import { UploadCloud, X, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const ImageUploader = ({ onImagesChange, initialImages = [], maxImages = 6 }) => {
  const [images, setImages] = useState(initialImages);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images`);
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is larger than 10MB`);
        return false;
      }
      return true;
    });

    const newImages = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      isPrimary: false,
      isNew: true
    }));

    const updatedImages = [...images, ...newImages];
    if (updatedImages.length > 0 && !updatedImages.some(img => img.isPrimary)) {
      updatedImages[0].isPrimary = true;
    }

    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    const removed = updatedImages.splice(index, 1)[0];
    
    // Cleanup object URL
    if (removed.isNew) URL.revokeObjectURL(removed.url);

    if (removed.isPrimary && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true;
    }
    
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const setPrimary = (index) => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }));
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          images.length >= maxImages 
            ? 'border-gold-primary/20 bg-admin-bg/50 opacity-50 pointer-events-none' 
            : 'border-gold-primary/50 hover:border-gold-primary bg-gold-primary/5 cursor-pointer'
        }`}
        onClick={() => images.length < maxImages && fileInputRef.current?.click()}
      >
        <UploadCloud className="mx-auto h-12 w-12 text-gold-primary mb-3" />
        <p className="text-text-light font-medium mb-1">
          {images.length >= maxImages ? 'Maximum images reached' : 'Click or drag images to upload'}
        </p>
        <p className="text-text-muted text-sm">JPG, PNG, WEBP up to 10MB (Max {maxImages})</p>
        <input 
          type="file" 
          multiple 
          accept="image/jpeg, image/png, image/webp" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className={`relative group rounded-lg overflow-hidden border-2 transition-all ${img.isPrimary ? 'border-gold-primary shadow-[0_0_10px_rgba(212,175,55,0.3)]' : 'border-transparent'}`}>
              <img src={img.url} alt="Preview" className="w-full h-24 object-cover" />
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button 
                  type="button" 
                  onClick={() => setPrimary(idx)}
                  className={`p-1.5 rounded-full ${img.isPrimary ? 'bg-gold-primary text-black' : 'bg-admin-bg text-text-light hover:text-gold-primary'}`}
                  title="Set as primary"
                >
                  <Star size={14} className={img.isPrimary ? "fill-black" : ""} />
                </button>
                <button 
                  type="button" 
                  onClick={() => removeImage(idx)}
                  className="p-1.5 rounded-full bg-red-500/80 text-white hover:bg-red-600"
                  title="Remove"
                >
                  <X size={14} />
                </button>
              </div>
              
              {img.isPrimary && (
                <div className="absolute top-1 left-1 bg-gold-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                  PRIMARY
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
