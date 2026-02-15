
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';

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
        <h1 className="text-3xl font-black text-slate-900 tracking-[0.2em] uppercase italic leading-none">Shahjahan</h1>
        <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.5em] italic">Enterprise</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  // Strictly as requested: Home | Project | Calculator | Service | Admin Dashboard | Photo Section
  const menuItems = [
    { name: 'Home', id: 'home', icon: '🏠' },
    { name: 'Project', id: 'projects', icon: '🏗️' },
    { name: 'Calculator', id: 'calculator', icon: '📊' },
    { name: 'Service', id: 'services', icon: '📦' },
    { name: 'Admin Dashboard', id: 'admin-preview', icon: '🛡️' },
    { name: 'Photo Section', id: 'photos', icon: '🖼️' }
  ];

  return (
    <div className="min-h-screen flex flex-col font-['Poppins',_'Hind_Siliguri'] text-slate-950 bg-[#F8FAFC] selection:bg-red-600 selection:text-white overflow-x-hidden mobile-container">
      
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(at_0%_0%,rgba(237,28,36,0.03)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(6,11,24,0.03)_0px,transparent_50%)]"></div>
      </div>

      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-[500] px-4 py-4 md:px-10">
         <nav className="mx-auto max-w-7xl bg-white/80 backdrop-blur-2xl h-16 md:h-20 px-6 flex justify-between items-center border border-white/50 rounded-[22px] md:rounded-[40px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]">
           <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-2 group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-sm group-hover:rotate-6 transition-transform">
                 <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="font-black tracking-tighter text-sm md:text-lg text-slate-950 uppercase italic leading-none">
                SHAHJAHAN <span className="text-red-600">ENT.</span>
              </h1>
           </button>

           {/* Desktop Navigation */}
           <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollToSection(item.id)}
                  className={`text-[9px] font-black uppercase tracking-[0.25em] transition-all relative py-2 text-slate-400 hover:text-red-600 group`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
                </button>
              ))}
           </div>

           {/* Hamburger for Mobile */}
           <button 
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className={`lg:hidden w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all z-[600] ${isMobileMenuOpen ? 'bg-red-600 text-white' : 'bg-slate-950 text-white shadow-lg'}`}
           >
             <span className={`w-5 h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
             <span className={`w-5 h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
             <span className={`w-5 h-0.5 bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
           </button>
         </nav>

         {/* Mobile Menu Overlay - High Contrast Premium Look */}
         {isMobileMenuOpen && (
           <div 
             className="fixed inset-0 bg-white z-[550] lg:hidden animate-in fade-in duration-300 flex flex-col items-center justify-center p-8 overflow-y-auto"
             onClick={() => setIsMobileMenuOpen(false)}
           >
              <div className="w-full max-w-sm flex flex-col gap-4 relative z-10" onClick={e => e.stopPropagation()}>
                <div className="text-center mb-8">
                   <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.6em] mb-2 animate-pulse">Main Menu</p>
                   <div className="w-12 h-1 bg-slate-100 mx-auto rounded-full"></div>
                </div>

                {menuItems.map((item, idx) => (
                  <button 
                    key={item.id} 
                    onClick={() => scrollToSection(item.id)}
                    className={`group flex items-center justify-between p-6 rounded-[28px] border bg-white border-slate-50 transition-all duration-300 animate-in slide-in-from-bottom-10 shadow-sm hover:shadow-xl hover:bg-slate-950 group`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="flex items-center gap-6">
                       <span className="text-2xl filter drop-shadow-sm">{item.icon}</span>
                       <span className={`text-xl font-black uppercase italic tracking-tighter text-slate-950 group-hover:text-white transition-colors`}>
                         {item.name}
                       </span>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-300 group-hover:bg-red-600 group-hover:text-white transition-all">
                      <span className="text-sm">➔</span>
                    </div>
                  </button>
                ))}
              </div>
           </div>
         )}
      </header>

      {/* Main Single Page Content */}
      <main className="flex-grow">
         <Home onOpenAdmin={() => setIsAdminModalOpen(true)} />
      </main>

      {/* Admin Modal Overlay */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-[1000] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-4">
           <div className="w-full h-full max-w-7xl relative">
              <button 
                onClick={() => setIsAdminModalOpen(false)}
                className="absolute top-4 right-4 z-[1100] w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white text-2xl hover:bg-red-600 transition-all"
              >✕</button>
              <div className="h-full overflow-y-auto rounded-[40px] shadow-2xl">
                 <AdminDashboard />
              </div>
           </div>
        </div>
      )}

      {/* Mobile Floating Action Navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-[400]">
        <div className="bg-slate-950/90 backdrop-blur-2xl rounded-[30px] p-2 flex justify-around items-center border border-white/10 shadow-2xl">
           <button onClick={() => scrollToSection('home')} className="w-12 h-12 flex items-center justify-center text-xl">🏠</button>
           <button onClick={() => scrollToSection('calculator')} className="w-12 h-12 flex items-center justify-center text-xl">📊</button>
           <button onClick={() => scrollToSection('services')} className="w-14 h-14 bg-red-600 rounded-[22px] flex items-center justify-center text-xl shadow-lg -translate-y-4 border-4 border-[#F8FAFC]">📦</button>
           <button onClick={() => scrollToSection('photos')} className="w-12 h-12 flex items-center justify-center text-xl">🖼️</button>
           <button onClick={() => setIsMobileMenuOpen(true)} className="w-12 h-12 flex items-center justify-center text-xl">☰</button>
        </div>
      </div>
    </div>
  );
};

export default App;
