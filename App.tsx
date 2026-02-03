
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { MemorialPopup } from './components/MemorialPopup';
import { Home } from './pages/Home';
import { Candidates } from './pages/Candidates';
import { Policies } from './pages/Policies';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Saranbot } from './pages/Saranbot';
import { Language } from './types';
import { CONTENT } from './constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Component to handle initial redirect to home
const ForceHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Navigate to home on mount to ensure the user lands on the landing page first
    navigate('/', { replace: true });
  }, []); 
  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.TH);
  const content = CONTENT[lang];

  return (
    <HashRouter>
      <ForceHome />
      <ScrollToTop />
      {/* Memorial Popup วางไว้ที่นี่เพื่อให้แสดงผลทุกครั้งที่โหลดแอป */}
      <MemorialPopup />
      <div className="min-h-screen bg-party-cream text-party-black selection:bg-party-rose selection:text-white font-sans">
        <Navbar lang={lang} content={content} setLang={setLang} />
        
        <Routes>
          <Route path="/" element={<Home content={content} />} />
          <Route path="/about" element={<About content={content} />} />
          <Route path="/candidates" element={<Candidates lang={lang} content={content} />} />
          <Route path="/policies" element={<Policies content={content} />} />
          <Route path="/contact" element={<Contact content={content} />} />
          <Route path="/saranbot" element={<Saranbot content={content} />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
