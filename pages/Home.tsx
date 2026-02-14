
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col bg-white text-slate-900 font-['Hind_Siliguri'] overflow-hidden">
      
      {/* 1. HERO SECTION (Mobile Optimized) */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-12 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-10" 
            alt="Construction background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full text-center md:text-left">
          <div className="max-w-3xl space-y-6 md:space-y-8 animate-reveal">
            <span className="inline-block bg-red-600/10 text-red-600 px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
              Authorized Dealer
            </span>
            <h1 className="text-5xl md:text-8xl font-black leading-tight text-slate-950 tracking-tight">
              নির্মাণে ভরসা, <br/>
              <span className="text-red-600">শাহজাহান এন্টারপ্রাইজ</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-600 font-medium max-w-xl">
              প্রিমিয়ার সিমেন্ট এবং উন্নত মানের বিএসআরএম (BSRM) ও এএকেএস (AKS) রডের অনুমোদিত ডিলার।
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/calculator" className="bg-red-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-red hover:bg-red-700 transition-all text-center">
                আজকের রেট জানুন
              </Link>
              <a href="tel:+8801711234567" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-800 transition-all text-center">
                সরাসরি কল করুন
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUSINESS INFO CARDS */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[40px] shadow-soft border border-slate-100 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-3xl">🏗️</div>
            <h3 className="text-xl font-bold text-slate-950">পাইকারি ও খুচরা</h3>
            <p className="text-slate-500 font-medium">কয়রা এবং পার্শ্ববর্তী অঞ্চলে যেকোনো পরিমাণে সাশ্রয়ী মূল্যে পণ্য সরবরাহ করা হয়।</p>
          </div>
          <div className="bg-white p-10 rounded-[40px] shadow-soft border border-slate-100 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-3xl">✅</div>
            <h3 className="text-xl font-bold text-slate-950">১০০% অরিজিনাল ব্র্যান্ড</h3>
            <p className="text-slate-500 font-medium">আমরা সরাসরি কোম্পানি থেকে সংগৃহীত অরিজিনাল প্রিমিয়ার সিমেন্ট ও রড নিশ্চিত করি।</p>
          </div>
          <div className="bg-white p-10 rounded-[40px] shadow-soft border border-slate-100 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-3xl">🚚</div>
            <h3 className="text-xl font-bold text-slate-950">দ্রুত ডেলিভারি</h3>
            <p className="text-slate-500 font-medium">আমাদের নিজস্ব লজিস্টিক সাপোর্টের মাধ্যমে সঠিক সময়ে আপনার সাইটে মালামাল পৌঁছানো হয়।</p>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT SHOWCASE */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-slate-950 uppercase tracking-tight">আমাদের পণ্যসমূহ</h2>
          <div className="w-24 h-2 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Cement */}
          <div className="group bg-white rounded-[50px] overflow-hidden border border-slate-100 shadow-xl flex flex-col">
            <div className="h-80 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Premier Cement" />
            </div>
            <div className="p-10 space-y-4">
              <h3 className="text-3xl font-bold text-slate-950">প্রিমিয়ার সিমেন্ট (PCC/OPC)</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                দীর্ঘস্থায়ী ও মজবুত নির্মাণে প্রিমিয়ার সিমেন্ট অতুলনীয়। এর নিখুঁত মিশ্রণ আপনার বাড়ির ভিতকে করে পাহাড়ের মতো শক্তিশালী।
              </p>
              <Link to="/contact" className="inline-block text-red-600 font-bold border-b-2 border-red-600 pb-1 hover:text-red-700 transition-colors">
                কোটেশন রিকোয়েস্ট করুন ➔
              </Link>
            </div>
          </div>

          {/* Rod */}
          <div className="group bg-white rounded-[50px] overflow-hidden border border-slate-100 shadow-xl flex flex-col">
            <div className="h-80 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Steel Rod" />
            </div>
            <div className="p-10 space-y-4">
              <h3 className="text-3xl font-bold text-slate-950">উন্নত মানের কনস্ট্রাকশন রড</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                আমরা BSRM, AKS এবং অন্যান্য নামকরা ব্র্যান্ডের ৫০০ডব্লিউ টিএমটি বার সরবরাহ করি, যা ভূমিকম্প সহনীয় নির্মাণ নিশ্চিত করে।
              </p>
              <Link to="/contact" className="inline-block text-red-600 font-bold border-b-2 border-red-600 pb-1 hover:text-red-700 transition-colors">
                কোটেশন রিকোয়েস্ট করুন ➔
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/contact" className="bg-slate-950 text-white px-12 py-6 rounded-[30px] font-bold text-lg shadow-2xl hover:bg-red-600 transition-all inline-block">
             বাল্ক অর্ডারের জন্য রিকোয়েস্ট পাঠান
          </Link>
        </div>
      </section>

      {/* 4. ABOUT US SECTION */}
      <section className="py-24 px-6 bg-slate-950 text-white rounded-t-[60px] md:rounded-t-[100px]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black italic">শাহজাহান এন্টারপ্রাইজ সম্পর্কে</h2>
          <p className="text-lg md:text-2xl text-slate-400 font-medium leading-relaxed italic border-l-4 border-red-600 pl-8 text-left md:text-center md:border-l-0">
            বিগত কয়েক দশক ধরে কয়রা বাজারে আমরা সততা ও আস্থার সাথে সিমেন্ট এবং রড সরবরাহ করে আসছি। নির্মাণ শিল্পের প্রতিটি ধাপে কোয়ালিটি নিশ্চিত করাই আমাদের প্রধান লক্ষ্য। হাজারো সন্তুষ্ট কাস্টমার এবং বড় বড় সরকারি-বেসরকারি প্রজেক্টে মালামাল সরবরাহের অভিজ্ঞতা আমাদের করেছে এই অঞ্চলের অনন্য ডিলার।
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
            <div className="space-y-1">
              <p className="text-4xl font-black text-red-600">৩০+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">বছরের অভিজ্ঞতা</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-black text-white">৫০০০+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">সন্তুষ্ট কাস্টমার</p>
            </div>
            <div className="hidden md:block space-y-1">
              <p className="text-4xl font-black text-red-600">১০০%</p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">জেনুইন মেটেরিয়াল</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT & LOCATION (Footer - Simplified) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-black text-slate-950 mb-6">যোগাযোগ</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <p className="font-bold text-slate-950">লোকেশন</p>
                    <p className="text-slate-500">কয়রা বাজার, মেইন রোড, খুলনা।</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📞</div>
                  <div>
                    <p className="font-bold text-slate-950">ফোন করুন</p>
                    <p className="text-slate-500">+৮৮০ ১৭১১-২৩৪৫৬৭</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-2xl">💬</div>
                  <div>
                    <p className="font-bold text-slate-950">হোয়াটসঅ্যাপ</p>
                    <a href="https://wa.me/8801711234567" className="text-green-600 font-bold hover:underline">সরাসরি চ্যাট করুন</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-8">
              <a href="tel:+8801711234567" className="w-full bg-green-500 text-white flex items-center justify-center gap-4 py-6 rounded-3xl font-black uppercase text-sm shadow-xl hover:bg-green-600 transition-all">
                <span>📱</span> হোয়াটসএপ এ অর্ডার দিন
              </a>
            </div>
          </div>
          
          <div className="rounded-[40px] overflow-hidden border border-slate-200 h-96 shadow-xl relative group">
            {/* Google Maps Placeholder */}
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-5xl">🗺️</div>
                <p className="font-bold text-slate-400">Google Maps Integration <br/> (Koyra Bazar, Khulna)</p>
              </div>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.876543210123!2d89.3175!3d22.3414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDIwJzUwLjQiTiA4OcKwMTknMDIuOCJF!5e0!3m2!1sen!2sbd!4v1234567890" 
              className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Floating Call Button for Mobile */}
      <div className="fixed bottom-24 right-6 z-[450] md:hidden">
        <a 
          href="tel:+8801711234567" 
          className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-3xl shadow-red animate-bounce"
        >
          📞
        </a>
      </div>

    </div>
  );
};

export default Home;
