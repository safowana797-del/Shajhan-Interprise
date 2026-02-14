
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import Calculator from './pages/Calculator.tsx';
import Contact from './pages/Contact.tsx';
import Profile from './pages/Profile.tsx';
import ProductList from './pages/ProductList.tsx';
import ProjectGallery from './pages/ProjectGallery.tsx';

const LOGO_URL = "https://img.icons8.com/fluency/512/structural.png";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-12 overflow-hidden">
      <div className="relative animate-reveal">
         <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[35px] md:rounded-[40px] flex items-center justify-center p-4 shadow-xl">
            <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
         </div>
         <div className="absolute -inset-10 bg-red-600/5 blur-[60px] -z-10 animate-pulse"></div>
      </div>
      <div className="mt-12 text-center space-y-2 animate-reveal" style={{ animationDelay: '0.4s' }}>
        <h1 className="text-3xl font-black text-slate-900 tracking-[0.2em] uppercase italic">Shahjahan</h1>
        <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] italic">Enterprise</p>
      </div>
      <div className="absolute bottom-20 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
         <div className="h-full bg-red-600 w-full animate-loading"></div>
      </div>
    </div>
  );
};

const MobileNavbar = () => {
  const location = useLocation();
  const tabs = [
    { path: '/', label: 'হোম', icon: '🏠' },
    { path: '/calculator', label: 'হিসাব', icon: '📊' },
    { path: '/product', label: 'প্রডাক্ট', icon: '📦' },
    { path: '/project', label: 'প্রজেক্ট', icon: '🏗️' },
    { path: '/profile', label: 'প্রফাইল', icon: '👤' }
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[400] w-[94%] max-w-md">
      <nav className="bg-white/95 backdrop-blur-3xl border border-slate-200/50 px-2 py-3 flex justify-around items-center rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <Link 
              key={tab.path} 
              to={tab.path} 
              className="flex flex-col items-center gap-1 group relative px-2 transition-all duration-300"
            >
              <span className={`text-xl transition-all duration-300 ${active ? 'scale-125 -translate-y-1.5' : 'opacity-40 grayscale'}`}>
                {tab.icon}
              </span>
              <span className={`text-[9px] font-black uppercase tracking-tight transition-colors whitespace-nowrap ${active ? 'text-red-600' : 'text-slate-400'}`}>
                {tab.label}
              </span>
              {active && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 bg-red-600 rounded-full animate-in zoom-in duration-300"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 80) setShowHeader(false);
        else setShowHeader(true);
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-['Poppins',_'Hind_Siliguri'] text-slate-950 bg-white selection:bg-red-600 selection:text-white">
        
        {/* Advanced Header */}
        <header 
          className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 ${showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        >
           <nav className="mx-auto mt-4 md:mt-6 w-[95%] max-w-7xl bg-white/90 backdrop-blur-3xl h-20 md:h-24 px-6 md:px-10 flex justify-between items-center border border-slate-100 rounded-[30px] md:rounded-[40px] shadow-soft">
             <Link to="/" className="flex items-center gap-4 group shrink-0">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm transition-transform duration-500 group-hover:scale-110">
                   <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <h1 className="font-black tracking-tighter text-base md:text-2xl text-slate-950 uppercase italic leading-none">
                    SHAHJAHAN <br className="md:hidden"/><span className="text-red-600">ENTERPRISE</span>
                  </h1>
                </div>
             </Link>

             <div className="hidden lg:flex items-center gap-8">
                {['Home', 'Product', 'Project', 'Calculator', 'Profile'].map((item) => (
                  <Link 
                    key={item} 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:text-red-600 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
                <Link to="/admin" className="bg-slate-950 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all shadow-xl">Admin</Link>
             </div>

             <div className="lg:hidden flex items-center gap-2">
                <a href="tel:+8801711234567" className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all text-xl">📞</a>
                <Link to="/admin" className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all text-sm">🔐</Link>
             </div>
           </nav>
        </header>

        <main className="flex-grow pb-32 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/project" element={<ProjectGallery />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <MobileNavbar />
        
        <footer className="bg-slate-50 text-slate-900 pt-24 pb-40 md:pb-16 px-8 rounded-t-[50px] md:rounded-t-[80px] border-t border-slate-200">
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-1 space-y-6">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center p-2 text-white font-black">SE</div>
                   <span className="font-black text-xl tracking-tighter uppercase italic">SHAHJAHAN</span>
                 </div>
                 <p className="text-xs font-medium text-slate-500 italic leading-relaxed">Premier Cement authorized dealer in Koyra Bazar, Khulna. 30 years of excellence.</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[11px] font-black uppercase text-red-600 tracking-widest">Office</h4>
                 <p className="text-sm font-bold">Koyra Bazar, Khulna</p>
                 <p className="text-sm font-bold text-slate-500">Phone: +৮৮০ ১৭১১-২৩৪৫৬৭</p>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Quick Links</h4>
                 <div className="flex flex-col gap-2">
                    <Link to="/calculator" className="text-[10px] font-bold uppercase italic text-slate-600 hover:text-red-600">Material Estimate</Link>
                    <Link to="/contact" className="text-[10px] font-bold uppercase italic text-slate-600 hover:text-red-600">Book Order</Link>
                 </div>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Trust</h4>
                 <div className="flex flex-col gap-2">
                    <span className="text-[9px] font-bold uppercase italic text-slate-700">ISO 9001 Compliance</span>
                    <span className="text-[9px] font-bold uppercase italic text-slate-700">Gold Member 2024</span>
                 </div>
              </div>
           </div>
           <div className="mt-20 pt-10 border-t border-slate-200 text-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
             &copy; 2025 Shahjahan Enterprise. Quality & Trust.
           </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
