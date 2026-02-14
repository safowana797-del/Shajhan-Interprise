
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col bg-white text-slate-900 font-['Hind_Siliguri'] overflow-hidden">
      
      {/* 1. PREMIUM DARK HERO SECTION */}
      <section className="relative min-h-[110vh] flex items-center pt-20 overflow-hidden bg-slate-950">
        {/* High-Impact Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-50 scale-100 transition-transform duration-[10s] ease-linear transform hover:scale-110" 
            alt="Construction Excellence" 
          />
          {/* Multi-layered Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          
          {/* Decorative Glowing Orbs */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-600/30 blur-[120px] rounded-full"></div>
          <div className="absolute top-24 -right-24 w-80 h-80 bg-red-600/10 blur-[100px] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20">
          <div className={`max-w-4xl space-y-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="inline-flex items-center gap-3 bg-red-600/20 border border-red-600/30 px-5 py-2.5 rounded-2xl backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="text-white text-[11px] font-black uppercase tracking-[0.2em]">Authorized Premier Cement Dealer</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-black leading-[0.9] text-white tracking-tighter italic">
              নির্মাণে <span className="text-red-600">মজবুত</span> <br/>
              আস্থার ঠিকানা
            </h1>
            
            <p className="text-xl md:text-3xl text-slate-300 font-medium max-w-2xl leading-relaxed italic">
              শাহজাহান এন্টারপ্রাইজ — কয়রা বাজারে গত ৩০ বছর ধরে প্রিমিয়ার সিমেন্ট ও বিএসআরএম রডের নির্ভরযোগ্য ডিলার।
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-10">
              <Link to="/calculator" className="group relative bg-red-600 text-white px-12 py-6 rounded-3xl font-black text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-600/30 text-center">
                <span className="relative z-10">আজকের রেট জানুন</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10"></div>
              </Link>
              <a href="tel:+8801711234567" className="flex items-center justify-center gap-4 bg-white/5 border border-white/10 text-white px-12 py-6 rounded-3xl font-black text-lg backdrop-blur-xl hover:bg-white/10 transition-all text-center">
                <span>📞</span> সরাসরি কল করুন
              </a>
            </div>

            <div className="pt-12 flex items-center gap-8 border-t border-white/10">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-white overflow-hidden shadow-2xl">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest italic">৫০০০+ মানুষের আস্থার প্রতীক</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS FLOATING SECTION */}
      <section className="relative z-20 -mt-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: 'অভিজ্ঞতা', val: '৩০+', unit: 'বছর', icon: '🏆' },
            { label: 'সন্তুষ্ট গ্রাহক', val: '৫ক+', unit: 'মানুষ', icon: '👤' },
            { label: 'প্রকল্প সম্পন্ন', val: '১২০০+', unit: 'টি', icon: '🏗️' },
            { label: 'ডেলিভারি নেটওয়ার্ক', val: '১০০%', unit: 'কয়রা', icon: '🚚' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[45px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-3 transition-all duration-500">
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform bg-slate-50 w-20 h-20 flex items-center justify-center rounded-3xl shadow-inner">{stat.icon}</div>
              <p className="text-4xl font-black text-slate-950 italic tracking-tighter">{stat.val}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE PRODUCTS - MODERN GRID */}
      <section className="py-40 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-red-600 text-xs font-black uppercase tracking-[0.4em]">Our Inventory</span>
            <h2 className="text-5xl md:text-8xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">সেরা মানের <br/><span className="text-slate-200">নির্মাণ সামগ্রী</span></h2>
          </div>
          <Link to="/product" className="bg-slate-950 text-white px-12 py-6 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 transition-all shadow-2xl">
            সব পণ্য দেখুন ➔
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Premier Cement */}
          <div className="group relative h-[650px] rounded-[70px] overflow-hidden shadow-2xl border border-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              alt="Premier Cement" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-16 left-12 right-12 space-y-6">
              <div className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-black text-xs uppercase italic tracking-widest shadow-xl">Premier Cement</div>
              <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-none">মজবুত বাঁধন, <br/>চিরস্থায়ী শক্তি</h3>
              <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-md italic">উপকূলীয় অঞ্চলের লোনা আবহাওয়ার জন্য বিশেষভাবে কার্যকর PCC ও OPC সিমেন্ট সরাসরি আমাদের কাছে পাবেন।</p>
              <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl">
                অর্ডার দিন
              </Link>
            </div>
          </div>

          {/* Steel Rods */}
          <div className="group relative h-[650px] rounded-[70px] overflow-hidden shadow-2xl border border-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              alt="BSRM Rod" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-16 left-12 right-12 space-y-6">
              <div className="inline-block bg-slate-700 text-white px-8 py-3 rounded-full font-black text-xs uppercase italic tracking-widest shadow-xl">BSRM / AKS Steel</div>
              <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-none">নিরাপদ নির্মাণে <br/>শ্রেষ্ঠ রড</h3>
              <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-md italic">BSRM এবং AKS-এর অরিজিনাল ৫০০ডব্লিউ রড সরবরাহ করি যা আপনার দালানকে করে সর্বোচ্চ ভূমিকম্প প্রতিরোধক।</p>
              <Link to="/contact" className="inline-flex items-center gap-3 bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl">
                অর্ডার দিন
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY US - GLASSMORPHISM CARDS */}
      <section className="py-40 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-4">
             <span className="text-red-600 text-xs font-black uppercase tracking-[0.4em]">Why Choose Us</span>
             <h2 className="text-5xl md:text-7xl font-black text-slate-950 italic uppercase tracking-tighter leading-none">কেন আমাদের <br/><span className="text-slate-300">বেছে নেবেন?</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'দ্রুত সরবরাহ', desc: 'আমাদের নিজস্ব লজিস্টিক সাপোর্টের মাধ্যমে কয়রা ও পার্শ্ববর্তী এলাকায় দ্রুত মালামাল পৌঁছানো হয়।', icon: '🚀' },
              { title: 'সরাসরি ডিলারশিপ', desc: 'কোম্পানি থেকে সরাসরি সংগৃহীত ১০০% ফ্রেশ ও অরিজিনাল মালামালের নিশ্চয়তা।', icon: '🏢' },
              { title: 'সাশ্রয়ী মূল্য', desc: 'পাইকারি ও খুচরা বিক্রয়ে এই অঞ্চলের সবচেয়ে প্রতিযোগিতামূলক দাম নিশ্চিত করি।', icon: '💰' }
            ].map((box, i) => (
              <div key={i} className="bg-white p-14 rounded-[60px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-red-600/30 transition-all flex flex-col gap-8 group">
                <div className="w-24 h-24 bg-slate-50 rounded-[30px] flex items-center justify-center text-4xl shadow-inner group-hover:bg-red-600 group-hover:text-white transition-all duration-500">{box.icon}</div>
                <h4 className="text-3xl font-black italic text-slate-950 tracking-tight">{box.title}</h4>
                <p className="text-slate-500 font-bold leading-relaxed italic text-lg">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto bg-red-600 rounded-[100px] p-16 md:p-32 relative overflow-hidden flex flex-col items-center text-center space-y-12 shadow-[0_60px_120px_-20px_rgba(237,28,36,0.4)]">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
           <div className="relative z-10 space-y-6">
             <h2 className="text-5xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.85]">
                আপনার স্বপ্নের বাড়ি <br/><span className="text-red-950/30">মজবুত গড়ে তুলুন</span>
             </h2>
             <p className="text-red-100 text-xl md:text-3xl font-bold italic max-w-3xl mx-auto leading-relaxed">
               নির্মাণ সংক্রান্ত যেকোনো পরামর্শ বা মালামালের জন্য আজই যোগাযোগ করুন।
             </p>
           </div>
           
           <div className="relative z-10 flex flex-wrap justify-center gap-8">
              <a href="https://wa.me/8801711234567" className="bg-white text-slate-950 px-14 py-7 rounded-[35px] font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">
                 হোয়াটসঅ্যাপে মেসেজ দিন
              </a>
              <Link to="/contact" className="bg-slate-950 text-white px-14 py-7 rounded-[35px] font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all border border-white/10">
                 যোগাযোগের ফর্ম
              </Link>
           </div>
        </div>
      </section>

      {/* FOOTER EXTRA: FLOATING CALL */}
      <div className="fixed bottom-24 right-8 z-[450] md:hidden flex flex-col gap-5">
        <a 
          href="https://wa.me/8801711234567" 
          className="w-16 h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center text-3xl shadow-2xl animate-bounce"
        >
          💬
        </a>
        <a 
          href="tel:+8801711234567" 
          className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-xl active:scale-90 transition-all"
        >
          📞
        </a>
      </div>

    </div>
  );
};

export default Home;
