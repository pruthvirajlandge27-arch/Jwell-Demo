import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ManageJewellery from './pages/ManageJewellery';
import AddJewellery from './pages/AddJewellery';
import EditJewellery from './pages/EditJewellery';
import ManageCategories from './pages/ManageCategories';
import Sidebar from './components/Sidebar';
import AdminNavbar from './components/AdminNavbar';

// Simple protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <AdminNavbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/jewellery" element={<ProtectedRoute><ManageJewellery /></ProtectedRoute>} />
        <Route path="/admin/jewellery/add" element={<ProtectedRoute><AddJewellery /></ProtectedRoute>} />
        <Route path="/admin/jewellery/edit/:id" element={<ProtectedRoute><EditJewellery /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><ManageCategories /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
