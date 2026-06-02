import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JewelleryProvider } from './context/JewelleryContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';
import CollectionPage from './pages/CollectionPage';

function App() {
  return (
    <JewelleryProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections/:slug" element={<CollectionPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </Router>
    </JewelleryProvider>
  );
}

export default App;
