
import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<'login' | 'register'>('login');

  const userStats = {
    points: 450,
    totalOrders: 12,
    outstandingBaki: 5400,
    membership: 'Gold Member'
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 font-['Noto_Sans_Bengali'] pb-32">
        <div className="bg-slate-950 text-white pt-24 pb-40 px-6 rounded-b-[60px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px]"></div>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-24 h-24 bg-red-600 rounded-[30px] flex items-center justify-center text-3xl font-black shadow-2xl">
              KA
            </div>
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">করিম আহমেদ</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">কাস্টমার আইডি: #SE-9921</p>
              <span className="inline-block bg-red-600/20 text-red-500 border border-red-600/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{userStats.membership}</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 -mt-20 space-y-8 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'লয়্যালটি পয়েন্ট', val: userStats.points, color: 'text-red-600' },
              { label: 'মোট অর্ডার', val: userStats.totalOrders, color: 'text-slate-950' },
              { label: 'বর্তমান বাকি', val: `৳${userStats.outstandingBaki}`, color: 'text-red-600' },
              { label: 'ডিসকাউন্ট কুপন', val: '০২', color: 'text-slate-950' }
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 text-center">
                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-2">{s.label}</p>
                <p className={`text-xl font-black italic ${s.color}`}>{s.val}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-6">
             <h3 className="text-lg font-black uppercase italic tracking-tighter border-b border-slate-50 pb-4">সাম্প্রতিক লেনদেন</h3>
             <div className="space-y-4">
                {[
                  { date: '১২ জুন, ২০২৫', item: 'প্রিমিয়ার সিমেন্ট (২০ বস্তা)', status: 'ডেলিভারড', amount: '৳১১,৩০০' },
                  { date: '০৫ জুন, ২০২৫', item: 'বিএসআরএম রড (১.৫ টন)', status: 'ডেলিভারড', amount: '৳১,৪৭,৭৫০' }
                ].map((order, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 mb-1">{order.date}</p>
                      <p className="text-sm font-black italic text-slate-900">{order.item}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-slate-950">{order.amount}</p>
                       <p className="text-[8px] font-black text-green-500 uppercase tracking-widest">{order.status}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <button onClick={() => setIsLoggedIn(false)} className="w-full py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-red-600 transition-colors">লগ আউট করুন</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-['Noto_Sans_Bengali'] flex items-center justify-center p-6 pb-32">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-slate-50 rounded-[30px] mx-auto flex items-center justify-center p-4 shadow-sm">
             <img src="https://img.icons8.com/fluency/512/structural.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-950">
            {view === 'login' ? 'স্বাগতম ফিরে এসেছেন' : 'নতুন অ্যাকাউন্ট'}
          </h2>
          <p className="text-xs font-bold text-slate-400 italic">শাহজাহান এন্টারপ্রাইজ কাস্টমার পোর্টাল</p>
        </div>

        <div className="bg-slate-50 p-8 rounded-[50px] border border-slate-100 space-y-6">
           {view === 'register' && (
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">আপনার নাম</label>
               <input type="text" className="w-full p-5 bg-white border border-slate-200 rounded-3xl outline-none focus:border-red-600 font-bold" placeholder="যেমন: রহিম শেখ" />
             </div>
           )}
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">ফোন নাম্বার</label>
             <input type="text" className="w-full p-5 bg-white border border-slate-200 rounded-3xl outline-none focus:border-red-600 font-bold" placeholder="০১৭১১-xxxxxx" />
           </div>
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">পাসওয়ার্ড</label>
             <input type="password" className="w-full p-5 bg-white border border-slate-200 rounded-3xl outline-none focus:border-red-600 font-bold" placeholder="••••••••" />
           </div>

           <button 
             onClick={() => setIsLoggedIn(true)}
             className="w-full bg-slate-950 text-white py-6 rounded-[30px] font-black uppercase text-[12px] tracking-widest shadow-2xl hover:bg-red-600 transition-all"
           >
             {view === 'login' ? 'লগইন করুন' : 'অ্যাকাউন্ট তৈরি করুন'}
           </button>

           <div className="text-center">
             <button 
               onClick={() => setView(view === 'login' ? 'register' : 'login')}
               className="text-[10px] font-black uppercase text-slate-400 tracking-widest hover:text-red-600"
             >
               {view === 'login' ? 'নতুন অ্যাকাউন্ট খুলুন' : 'আগের অ্যাকাউন্ট এ লগইন করুন'}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
