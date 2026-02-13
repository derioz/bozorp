import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Public pages
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import GallerySection from './components/GallerySection';
import ActivitiesSection from './components/ActivitiesSection';
import StaffSection from './components/StaffSection';
import RulesSection from './components/RulesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Admin pages
import Login from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import GalleryManager from './pages/admin/GalleryManager';
import RulesManager from './pages/admin/RulesManager';
import StaffManager from './pages/admin/StaffManager';
import ProfileSettings from './pages/admin/ProfileSettings';
import ProtectedRoute from './components/admin/ProtectedRoute';

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-background-dark">
    <Navbar />
    <main>
      <Hero />
      <StatsBar />
      <AboutSection />
      <FeaturesSection />
      <GallerySection />
      <ActivitiesSection />
      <StaffSection />
      <RulesSection />
      <CTASection />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/bozorp">
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="rules" element={<RulesManager />} />
            <Route path="staff" element={<StaffManager />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;