
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<'retail' | 'dealer'>('retail');

  return (
    <div className="bg-white font-['Inter',_'Noto_Sans_Bengali'] text-slate-950">
      <div className="max-w-7xl mx-auto py-24 px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-red-600 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4">Authorized Dealer</p>
            <h1 className="text-5xl md:text-8xl font-black text-slate-950 leading-[1] italic uppercase tracking-tighter mb-10">
              SHAHJAHAN <br/><span className="text-slate-300">ENTERPRISE</span>
            </h1>
            
            <div className="mt-6 mb-16">
              <p className="text-xl text-slate-600 font-bold leading-relaxed max-w-lg italic">
                খুলনার নির্ভরযোগ্য নির্মাণ সামগ্রী সরবরাহকারী। আমরা আপনার স্বপ্নের বাড়ি তৈরিতে বিশ্বস্ত বন্ধু হিসেবে সাথে আছি।
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-[24px] bg-slate-950 text-white text-3xl shadow-2xl transition-all group-hover:bg-red-600 group-hover:scale-110">📍</div>
                </div>
                <div className="ml-8">
                  <h3 className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] mb-2">Our Location</h3>
                  <p className="text-2xl font-black text-slate-950 italic tracking-tight">কয়রা বাজার, মেইন রোড, খুলনা।</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-[24px] bg-red-600 text-white text-3xl shadow-2xl shadow-red-600/30 transition-all group-hover:scale-110">📞</div>
                </div>
                <div className="ml-8">
                  <h3 className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] mb-2">Call for Inquiry</h3>
                  <p className="text-3xl font-black text-slate-950 tracking-tighter italic leading-none">+৮৮০ ১৭১১-২৩৪৫৬৭</p>
                  <p className="text-slate-500 font-bold text-sm mt-2 italic">+৮৮০ ১৮২২-৯৮৭৬৫৪</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-[24px] bg-slate-950 text-white text-3xl shadow-2xl transition-all group-hover:bg-red-600 group-hover:scale-110">⏰</div>
                </div>
                <div className="ml-8">
                  <h3 className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] mb-2">Office Hours</h3>
                  <p className="text-2xl font-black text-slate-950 italic tracking-tight">শনিবার - বৃহস্পতিবার: সকাল ৯টা - রাত ৮টা</p>
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">শুক্রবার: সাপ্তাহিক বন্ধ</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-0">
            <div className="bg-slate-50 p-10 md:p-16 rounded-[70px] border border-slate-200 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] -z-0"></div>
              
              <div className="relative z-10">
                <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Request a Quote</p>
                <h3 className="text-4xl font-black text-slate-950 uppercase italic mb-12 tracking-tighter">ইনকোয়ারি পাঠান</h3>
                
                <div className="flex gap-4 mb-10">
                  <button 
                    onClick={() => setInquiryType('retail')}
                    className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${inquiryType === 'retail' ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'bg-white border-2 border-slate-200 text-slate-500'}`}
                  >
                    🏠 কাস্টমার
                  </button>
                  <button 
                    onClick={() => setInquiryType('dealer')}
                    className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${inquiryType === 'dealer' ? 'bg-slate-950 text-white shadow-xl' : 'bg-white border-2 border-slate-200 text-slate-500'}`}
                  >
                    🤝 ডিলারশিপ
                  </button>
                </div>

                <form className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-2">আপনার নাম</label>
                    <input type="text" className="w-full bg-white border-2 border-slate-100 rounded-3xl p-5 font-black text-slate-950 outline-none focus:border-red-600 focus:ring-8 focus:ring-red-600/5 transition-all shadow-sm" placeholder="যেমন: করিম আহমেদ" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-2">ফোন নাম্বার</label>
                    <input type="text" className="w-full bg-white border-2 border-slate-100 rounded-3xl p-5 font-black text-slate-950 outline-none focus:border-red-600 focus:ring-8 focus:ring-red-600/5 transition-all shadow-sm" placeholder="০১৭১১-xxxxxx" />
                  </div>
                  {inquiryType === 'retail' ? (
                    <div className="animate-in slide-in-from-left-4">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-2">সিমেন্ট এর পরিমাণ (বস্তা)</label>
                      <input type="number" className="w-full bg-white border-2 border-slate-100 rounded-3xl p-5 font-black text-slate-950 outline-none focus:border-red-600 focus:ring-8 focus:ring-red-600/5 transition-all shadow-sm" placeholder="৫০০" />
                    </div>
                  ) : (
                    <div className="animate-in slide-in-from-right-4">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 px-2">দোকানের নাম / লোকেশন</label>
                      <input type="text" className="w-full bg-white border-2 border-slate-100 rounded-3xl p-5 font-black text-slate-950 outline-none focus:border-red-600 focus:ring-8 focus:ring-red-600/5 transition-all shadow-sm" placeholder="যেমন: মা হার্ডওয়্যার, কয়রা" />
                    </div>
                  )}
                  <button type="submit" className="w-full bg-slate-950 text-white py-6 rounded-[30px] font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:bg-red-600 transition-all active:scale-95 mt-4">
                    {inquiryType === 'retail' ? 'কোটেশন পাঠান' : 'পার্টনারশিপ রিকোয়েস্ট পাঠান'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
