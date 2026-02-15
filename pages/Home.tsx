
import React from 'react';
import ProjectGallery from './ProjectGallery';
import Calculator from './Calculator';
import ServicePage from './ServicePage';
import PhotoSection from './PhotoSection';
import ReviewSection from './ReviewSection';

interface HomeProps {
  onOpenAdmin: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenAdmin }) => {
  return (
    <div className="flex flex-col bg-transparent text-slate-900 font-['Hind_Siliguri'] overflow-x-hidden">
      
      {/* 1. HOME SECTION - HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#060B18] rounded-b-[60px] md:rounded-b-[120px] shadow-2xl mx-2 md:mx-4 mt-2 border border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/d/1LMVo8TaexMFr5qifd7NVxP3mCv-t0PgG" 
            className="w-full h-full object-cover opacity-60 transition-transform duration-[30s] scale-105" 
            alt="Shahjahan Enterprise Premises" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060B18] via-[#060B18]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-20">
          <div className="max-w-4xl p-8 md:p-16 rounded-[40px] md:rounded-[80px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] group hover:border-white/20 transition-all duration-700">
            
            <div className="space-y-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-4 bg-white/10 border border-white/20 px-6 py-3 rounded-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Authorized Master Dealer</span>
              </div>

              {/* Enhanced Animated Heading */}
              <h1 className="text-5xl md:text-[6.5rem] font-black leading-[1] text-white tracking-tighter italic drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
                <div className="overflow-hidden">
                  <span className="animate-reveal-text premium-shimmer opacity-0" style={{ animationDelay: '0.2s' }}>উপকূলীয়</span>{' '}
                  <span className="animate-reveal-text red-shimmer opacity-0" style={{ animationDelay: '0.4s' }}>অটুট</span>{' '}
                  <span className="animate-reveal-text premium-shimmer opacity-0" style={{ animationDelay: '0.6s' }}>বন্ধন,</span>
                </div>
                <div className="overflow-hidden">
                  <span className="animate-reveal-text premium-shimmer opacity-0" style={{ animationDelay: '0.8s' }}>নির্মাণের</span>{' '}
                  <span className="animate-reveal-text premium-shimmer opacity-0" style={{ animationDelay: '1s' }}>সেরা</span>{' '}
                  <span className="animate-reveal-text premium-shimmer opacity-0" style={{ animationDelay: '1.2s' }}>সঙ্গী</span>
                </div>
              </h1>
              
              <p className="text-lg md:text-2xl text-slate-300 font-medium max-w-2xl leading-relaxed italic animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
                প্রিমিয়ার সিমেন্ট ও বিএসআরএম রডের নির্ভরযোগ্য ঠিকানায় আপনাকে স্বাগতম। খুলনার উপকূলীয় আবহাওয়ায় দীর্ঘস্থায়ী ও মজবুত ঘর গড়ার বিশ্বস্ত প্রতিষ্ঠান <span className="text-white font-black">শাহজাহান এন্টারপ্রাইজ</span>।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-1000">
                <button 
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({behavior: 'smooth'})}
                  className="group relative bg-red-600 text-white px-10 py-6 rounded-[25px] font-black text-[12px] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-600/40 text-center uppercase tracking-[0.3em]"
                >
                  <span className="relative z-10">মেটেরিয়াল ক্যালকুলেটর</span>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
                <a href="tel:+8801711234567" className="flex items-center justify-center gap-4 bg-white/10 border border-white/20 text-white px-10 py-6 rounded-[25px] font-black text-[12px] backdrop-blur-md hover:bg-white/20 transition-all text-center uppercase tracking-[0.3em]">
                  📞 ইনকোয়ারি করতে কল করুন
                </a>
              </div>
            </div>

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-red-600/20 transition-all duration-1000"></div>
          </div>
        </div>
      </section>

      {/* 2. PROJECT SECTION */}
      <section id="projects" className="py-20 md:py-32 bg-white rounded-[60px] md:rounded-[120px] -mt-10 relative z-20 shadow-xl mx-2 md:mx-4">
         <ProjectGallery />
      </section>

      {/* 3. CALCULATOR SECTION */}
      <section id="calculator" className="py-20 md:py-40 bg-slate-50 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
         <div className="relative z-10">
            <Calculator />
         </div>
      </section>

      {/* 4. REVIEWS SECTION */}
      <section id="reviews" className="py-20 md:py-32 bg-white overflow-hidden">
         <ReviewSection />
      </section>

      {/* 5. SERVICE SECTION */}
      <section id="services" className="py-20 md:py-32 bg-slate-50 rounded-[60px] md:rounded-[120px] shadow-xl mx-2 md:mx-4 relative z-20">
         <ServicePage />
      </section>

      {/* 6. ADMIN DASHBOARD PREVIEW */}
      <section id="admin-preview" className="py-24 md:py-44 bg-[#060B18] text-white rounded-[60px] md:rounded-[120px] mx-2 md:mx-4 my-10 relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(237,28,36,0.1),transparent_70%)] opacity-50"></div>
         <div className="max-w-7xl mx-auto px-10 relative z-10 text-center space-y-12">
            <div className="space-y-4">
               <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.6em]">Management Suite</p>
               <h2 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter">অ্যাডমিন <span className="text-slate-700">ড্যাশবোর্ড</span></h2>
            </div>
            
            <div className="max-w-3xl mx-auto p-1 bg-white/5 border border-white/10 rounded-[50px] backdrop-blur-3xl shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer" onClick={onOpenAdmin}>
               <div className="bg-slate-900 p-8 md:p-16 rounded-[45px] space-y-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse"></div>
                     ))}
                  </div>
                  <div className="space-y-4">
                     <div className="h-4 bg-white/5 rounded-full w-3/4 mx-auto animate-pulse"></div>
                     <div className="h-4 bg-white/5 rounded-full w-1/2 mx-auto animate-pulse"></div>
                  </div>
                  <button className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-red-600/30">
                     প্যানেল ওপেন করুন
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* 7. PHOTO SECTION */}
      <section id="photos" className="py-20 md:py-32">
         <PhotoSection />
      </section>

      {/* Footer */}
      <footer className="py-20 text-center px-10 space-y-6 border-t border-slate-100 bg-white">
         <div className="w-16 h-1 bg-slate-200 mx-auto rounded-full"></div>
         <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.5em]">Shahjahan Enterprise © 2025</p>
         <p className="text-slate-300 text-[9px] font-medium italic">Koyra Bazar, Khulna, Bangladesh | All Rights Reserved</p>
      </footer>

    </div>
  );
};

export default Home;
