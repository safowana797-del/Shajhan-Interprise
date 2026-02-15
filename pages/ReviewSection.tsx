
import React, { useState, useEffect } from 'react';

const reviews = [
  {
    id: '1',
    name: 'আব্দুর রহমান',
    role: 'সিভিল ইঞ্জিনিয়ার',
    comment: 'কয়রা অঞ্চলে লোনা পানির প্রকোপ অনেক বেশি। শাহজাহান এন্টারপ্রাইজের সরবরাহকৃত প্রিমিয়ার সিমেন্ট ব্যবহার করে আমি অনেকগুলো প্রজেক্টে দুর্দান্ত স্থায়িত্ব পেয়েছি। তাদের সার্ভিস সত্যিই প্রশংসনীয়।',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop'
  },
  {
    id: '2',
    name: 'মাওলানা ইব্রাহিম',
    role: 'মাদ্রাসা কমিটির সভাপতি',
    comment: 'আমাদের নতুন ভবনের জন্য বড় পরিমাণের সিমেন্ট ও রড দরকার ছিল। তারা অত্যন্ত দ্রুত এবং সাশ্রয়ী মূল্যে মালামাল পৌঁছে দিয়েছে। বিশ্বাসযোগ্যতায় তারা সেরা।',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&h=200&fit=crop'
  },
  {
    id: '3',
    name: 'রাশেদুল আলম',
    role: 'বাড়ির মালিক',
    comment: 'স্বপ্নের বাড়ি তৈরিতে মালামালের মান নিয়ে চিন্তিত ছিলাম। শাহজাহান এন্টারপ্রাইজ থেকে বিএসআরএম রড ও সিমেন্ট নিয়ে আমি এখন নিশ্চিন্ত। তাদের পরামর্শগুলো অনেক কাজে এসেছে।',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop'
  },
  {
    id: '4',
    name: 'জাকির হোসেন',
    role: 'ঠিকাদার (Contractor)',
    comment: 'গত ১০ বছর ধরে আমি এদের সাথে কাজ করছি। পাইকারি দামে অরিজিনাল মেটেরিয়াল পাওয়ার জন্য খুলনায় শাহজাহান এন্টারপ্রাইজের কোনো বিকল্প নেই।',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop'
  },
  {
    id: '5',
    name: 'মঞ্জুর মোর্শেদ',
    role: 'বিল্ডিং ডেভেলপার',
    comment: 'টাইমলি ডেলিভারি এবং কোয়ালিটি কন্ট্রোল—এই দুই দিক দিয়ে তারা অসাধারণ। উপকূলীয় আবহাওয়ায় টেকসই নির্মাণের জন্য তাদের গাইডেন্স সত্যিই অতুলনীয়।',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&fit=crop'
  }
];

const ReviewSection: React.FC = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 font-['Hind_Siliguri']">
      <div className="text-center mb-16 space-y-4">
        <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.6em] animate-pulse">Trusted Voices</p>
        <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-slate-950">
          সন্তুষ্ট <span className="text-slate-200">গ্রাহকের কথা</span>
        </h2>
      </div>

      <div className="relative h-[500px] md:h-[450px] flex items-center justify-center overflow-hidden">
        {reviews.map((rev, idx) => {
          const isActive = idx === active;
          const isPrev = idx === (active - 1 + reviews.length) % reviews.length;
          const isNext = idx === (active + 1) % reviews.length;

          let position = "translate-x-[200%] opacity-0 scale-50";
          if (isActive) position = "translate-x-0 opacity-100 scale-100 z-30";
          else if (isPrev) position = "-translate-x-[80%] opacity-30 scale-75 z-10 blur-sm";
          else if (isNext) position = "translate-x-[80%] opacity-30 scale-75 z-10 blur-sm";

          return (
            <div
              key={rev.id}
              className={`absolute w-full max-w-2xl transition-all duration-1000 ease-in-out transform ${position}`}
            >
              <div className="bg-white rounded-[60px] p-10 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-50 relative group">
                {/* Quote Icon Decor */}
                <div className="absolute top-10 right-10 text-6xl text-slate-50 font-serif group-hover:text-red-500/10 transition-colors">“</div>
                
                <div className="flex flex-col items-center text-center space-y-8">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-[40px] overflow-hidden border-4 border-white shadow-2xl relative z-10">
                      <img src={rev.image} alt={rev.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -inset-4 bg-red-600/10 blur-2xl rounded-full -z-0"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xl ${i < rev.rating ? 'text-orange-400' : 'text-slate-200'}`}>★</span>
                      ))}
                    </div>
                    <p className="text-lg md:text-xl font-bold text-slate-600 leading-relaxed italic px-4">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-50 w-full">
                    <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-950">{rev.name}</h4>
                    <p className="text-[10px] font-black uppercase text-red-600 tracking-widest mt-1">{rev.role}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-4 mt-12">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 transition-all duration-500 rounded-full ${active === i ? 'w-12 bg-red-600' : 'w-2 bg-slate-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
