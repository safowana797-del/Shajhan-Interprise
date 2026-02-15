
import React, { useState } from 'react';
import ProductList from './ProductList';

const ServicePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    product: 'Premier Cement',
    quantity: '',
    date: ''
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', contact: '', product: 'Premier Cement', quantity: '', date: '' });
  };

  return (
    <div className="min-h-screen bg-transparent pb-32">
      {/* Service Header Section */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 animate-in fade-in duration-700">
           <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em]">Global Standards</p>
           <h1 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter text-slate-950 leading-none">সার্ভিস ও <br/><span className="text-slate-200">সেবাসমূহ</span></h1>
           <p className="text-slate-400 text-sm font-bold italic max-w-xl mx-auto">আমরা প্রিমিয়ার সিমেন্ট এবং বিএসআরএম রডের অথরাইজড ডিলার হিসেবে আপনাকে দিচ্ছি শতভাগ অরিজিনাল মেটেরিয়ালের নিশ্চয়তা।</p>
        </div>

        {/* Quick Product Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button 
            onClick={() => scrollToSection('cement-products')}
            className="bg-white p-12 rounded-[50px] shadow-xl border border-slate-50 group hover:-translate-y-2 transition-all duration-500 text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[40px]"></div>
            <div className="w-20 h-20 bg-red-600 text-white rounded-3xl flex items-center justify-center text-3xl mb-8 shadow-lg group-hover:scale-110 transition-transform">
              🏗️
            </div>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-950">সিমেন্ট কালেকশন</h3>
            <p className="text-xs font-bold text-slate-400 mt-2 italic">প্রিমিয়ার সিমেন্ট (PCC/OPC) স্টক ও দাম</p>
            <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase text-red-600 tracking-widest">
              কালেকশন দেখুন ➔
            </div>
          </button>

          <button 
            onClick={() => scrollToSection('rod-products')}
            className="bg-slate-950 p-12 rounded-[50px] shadow-2xl border border-white/5 group hover:-translate-y-2 transition-all duration-500 text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px]"></div>
            <div className="w-20 h-20 bg-white text-slate-950 rounded-3xl flex items-center justify-center text-3xl mb-8 shadow-lg group-hover:scale-110 transition-transform">
              ⛓️
            </div>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">রড ও স্টিল</h3>
            <p className="text-xs font-bold text-slate-500 mt-2 italic">BSRM, AKS এবং প্রিমিয়াম স্টিল রড</p>
            <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase text-red-600 tracking-widest">
              কালেকশন দেখুন ➔
            </div>
          </button>
        </div>
      </section>

      {/* Service Details with advanced icons */}
      <section className="py-24 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
         <div className="bg-slate-900 text-white p-12 rounded-[60px] shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px]"></div>
            <div className="text-5xl">🚚</div>
            <h4 className="text-3xl font-black italic uppercase tracking-tighter">ফ্রি হোম ডেলিভারি</h4>
            <p className="text-slate-400 font-medium italic leading-relaxed text-sm">
              কয়রা বাজার এবং আশেপাশের নির্দিষ্ট এলাকায় আমরা নিজস্ব ট্রাক এবং ট্রলারের মাধ্যমে দ্রুত মালামাল সরবরাহ করে থাকি।
            </p>
         </div>

         <div className="bg-white p-12 rounded-[60px] shadow-xl border border-slate-100 space-y-8">
            <div className="text-5xl">🛠️</div>
            <h4 className="text-3xl font-black italic uppercase tracking-tighter text-slate-950">ইঞ্জিনিয়ারিং সাপোর্ট</h4>
            <p className="text-slate-500 font-medium italic leading-relaxed text-sm">
              আপনার বাড়ি বা স্থাপনা নির্মাণে সিমেন্ট এবং রডের সঠিক ব্যবহার নিশ্চিত করতে আমাদের টেকনিক্যাল টিম আপনাকে পরামর্শ দিবে।
            </p>
         </div>
      </section>

      {/* Product List Section */}
      <section className="mt-20 px-4">
         <div className="bg-slate-50 rounded-[60px] p-10 md:p-20 text-center border border-slate-100">
            <ProductList />
         </div>
      </section>

      {/* Bulk Order Inquiry Section */}
      <section className="mt-32 max-w-7xl mx-auto px-6">
        <div className="bg-[#060B18] text-white rounded-[60px] md:rounded-[100px] p-12 md:p-24 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 blur-[120px] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 animate-in slide-in-from-left-10 duration-1000">
              <div className="space-y-4">
                <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em]">Wholesale Requests</p>
                <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">পাইকারি অর্ডারের <br/><span className="text-slate-700">অনুরোধ</span></h2>
              </div>
              <p className="text-slate-400 text-lg font-medium italic leading-relaxed max-w-md">
                আপনি কি বড় কোনো প্রজেক্টের জন্য একসাথে অনেক মালামাল নিতে চাচ্ছেন? আমাদের স্পেশাল রেট পেতে ফর্মটি পূরণ করুন।
              </p>
              <div className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-xl shadow-lg">📞</div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">জরুরি প্রয়োজনে</p>
                  <p className="text-xl font-black italic text-white">+৮৮০ ১৭১১-২৩৪৫৬৭</p>
                </div>
              </div>
            </div>

            <div className="relative">
              {submitted ? (
                <div className="bg-white/5 border border-white/10 p-12 rounded-[50px] backdrop-blur-2xl text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg shadow-green-500/20">✅</div>
                  <h3 className="text-3xl font-black italic tracking-tighter text-white">ধন্যবাদ!</h3>
                  <p className="text-slate-400 font-medium italic">আপনার ইনকোয়ারি সফলভাবে পৌঁছেছে। আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবে।</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-10 md:p-14 rounded-[50px] backdrop-blur-2xl shadow-2xl space-y-6 animate-in slide-in-from-right-10 duration-1000">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-2">আপনার নাম</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600 transition-all" 
                        placeholder="করিম আহমেদ" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-2">ফোন নাম্বার</label>
                      <input 
                        required
                        type="text" 
                        value={formData.contact}
                        onChange={e => setFormData({...formData, contact: e.target.value})}
                        className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600 transition-all" 
                        placeholder="০১৭১১-xxxxxx" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-2">প্রোডাক্ট নির্বাচন করুন</label>
                    <select 
                      value={formData.product}
                      onChange={e => setFormData({...formData, product: e.target.value})}
                      className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600 transition-all appearance-none"
                    >
                      <option value="Premier Cement">প্রিমিয়ার সিমেন্ট (Premier Cement)</option>
                      <option value="BSRM Rod">বিএসআরএম রড (BSRM Rod)</option>
                      <option value="AKS Rod">একেএস রড (AKS Rod)</option>
                      <option value="Both">সিমেন্ট ও রড উভয়ই</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-2">পরিমাণ</label>
                      <input 
                        required
                        type="text" 
                        value={formData.quantity}
                        onChange={e => setFormData({...formData, quantity: e.target.value})}
                        className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600 transition-all" 
                        placeholder="যেমন: ৫০০ বস্তা / ১০ টন" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-2">ডেলিভারি তারিখ</label>
                      <input 
                        required
                        type="date" 
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600 transition-all" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-red-600 text-white py-6 rounded-3xl font-black uppercase text-[12px] tracking-[0.3em] shadow-xl shadow-red-600/20 hover:bg-red-500 transition-all active:scale-95 mt-4"
                  >
                    অনুরোধ পাঠান ➔
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
