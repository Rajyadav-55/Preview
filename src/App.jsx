// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CoverPage from './components/layout/CoverPage';
import { useTheme } from './context/ThemeContext';

function AppContent() {
  const [showCover, setShowCover] = useState(true);
  const { isDark } = useTheme();

  return (
    <>
      {showCover && <CoverPage onComplete={() => setShowCover(false)} />}
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
          : 'bg-linear-to-br from-blue-50 to-purple-50'
      }`}>
        {!showCover && <Navbar />}
        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SubscriptionProvider>
        <Router>
          <AppContent />
        </Router>
      </SubscriptionProvider>
    </ThemeProvider>
  );
}

export default App;