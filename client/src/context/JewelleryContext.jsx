import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const JewelleryContext = createContext();

export const useJewellery = () => useContext(JewelleryContext);

export const JewelleryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [featuredJewellery, setFeaturedJewellery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, featRes] = await Promise.all([
          axios.get(`${API_URL}/api/categories`),
          axios.get(`${API_URL}/api/jewellery?featured=true`)
        ]);
        setCategories(catRes.data);
        setFeaturedJewellery(featRes.data);
      } catch (error) {
        console.error('Failed to fetch initial data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const getJewelleryByCategory = async (slug) => {
    try {
      const res = await axios.get(`${API_URL}/api/jewellery?category=${slug}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching jewellery by category', error);
      return [];
    }
  };

  const getCategoryDetails = async (slug) => {
    try {
      const res = await axios.get(`${API_URL}/api/categories/${slug}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching category details', error);
      return null;
    }
  };

  return (
    <JewelleryContext.Provider value={{
      categories,
      featuredJewellery,
      loading,
      getJewelleryByCategory,
      getCategoryDetails
    }}>
      {children}
    </JewelleryContext.Provider>
  );
};
