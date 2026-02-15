
import React, { useState, useEffect } from 'react';

const ProjectGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Manage body scroll and keyboard events
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [selectedProject]);

  const projects = [
    {
      id: '1',
      title: 'কয়রা মডেল মহিলা কলেজ',
      location: 'কয়রা, খুলনা',
      imageUrl: 'https://lh3.googleusercontent.com/d/1FNAlpU5xzfo71m3-LlhWrLT8gp0HRsA_',
      category: 'শিক্ষা প্রতিষ্ঠান',
      description: 'উপকূলীয় অঞ্চলে নারী শিক্ষা প্রসারে এই আধুনিক কলেজ ভবনটি নির্মাণে প্রিমিয়ার সিমেন্ট এবং বিএসআরএম রড ব্যবহার করা হয়েছে। এটি এলাকার অন্যতম বৃহৎ শিক্ষা অবকাঠামো যা আধুনিক সুযোগ-সুবিধা সম্পন্ন এবং লোনা পানি প্রতিরোধী শক্তিশালী কাঠামোর ওপর নির্মিত।',
      span: 'md:col-span-2 md:row-span-2',
      aspect: 'aspect-[16/10] md:aspect-auto'
    },
    {
      id: '2',
      title: 'পাইকগাছা রিভারসাইড পার্ক',
      location: 'পাইকগাছা, খুলনা',
      imageUrl: 'https://lh3.googleusercontent.com/d/1HKNgo7C0kp813bQSVTMS7rO76mK2dE5J',
      category: 'ইনফ্রাস্ট্রাকচার',
      description: 'উপকূলীয় আবহাওয়া উপযোগী মজবুত কাঠামো গঠনে আমাদের সরবরাহকৃত বিএসআরএম রড ব্যবহৃত হয়েছে। এই পার্কটি স্থানীয়দের জন্য একটি নিরাপদ এবং মনোরম বিনোদন কেন্দ্র হিসেবে গড়ে তোলা হয়েছে, যেখানে লোনা পানির প্রভাব রুখতে বিশেষ সিমেন্ট মিশ্রণ ব্যবহার করা হয়েছে।',
      span: 'md:col-span-1 md:row-span-1',
      aspect: 'aspect-square'
    },
    {
      id: '3',
      title: 'মর্ডান ডুপ্লেক্স হাউস',
      location: 'কয়রা মেইন রোড, খুলনা',
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      category: 'আবাসিক',
      description: 'লবণাক্ততা প্রতিরোধী প্রিমিয়ার সিমেন্ট দিয়ে নির্মিত এই ডুপ্লেক্সটি আধুনিক নির্মাণের এক অনন্য উদাহরণ। উপকূলীয় অঞ্চলের লোনা বাতাস এবং আর্দ্রতা থেকে কাঠামোকে রক্ষা করতে এখানে প্রিমিয়ার সিমেন্টের অ্যাডভান্সড সリューション প্রয়োগ করা হয়েছে।',
      span: 'md:col-span-1 md:row-span-2',
      aspect: 'aspect-[4/5] md:aspect-auto'
    },
    {
      id: '4',
      title: 'কয়রা কমার্শিয়াল কমপ্লেক্স',
      location: 'কয়রা সদর',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
      category: 'বাণিজ্যিক',
      description: '৫ তলা বিশিষ্ট এই ভবনের সকল কংক্রিট ঢালাইয়ে প্রিমিয়ার সিমেন্টের বিশেষ মিশ্রণ ব্যবহার করা হয়েছে। ভারী অবকাঠামোর স্থায়িত্ব এবং দীর্ঘস্থায়ী শক্তির জন্য বিএসআরএম ৫০০ডব্লিউ রড ব্যবহার নিশ্চিত করা হয়েছে।',
      span: 'md:col-span-1 md:row-span-1',
      aspect: 'aspect-square'
    },
    {
      id: '5',
      title: 'কয়রা মডেল সরকারি স্কুল',
      location: 'কয়রা, খুলনা',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dee402?auto=format&fit=crop&q=80&w=1200',
      category: 'শিক্ষা প্রতিষ্ঠান',
      description: 'এই শিক্ষা প্রতিষ্ঠানের নতুন একাডেমিক ভবনটি সম্পূর্ণ প্রিমিয়ার সিমেন্ট এবং বিএসআরএম রড দিয়ে নির্মিত। উপকূলীয় অঞ্চলের ছাত্রছাত্রীদের জন্য একটি নিরাপদ এবং স্থায়ী শিক্ষার পরিবেশ নিশ্চিত করাই ছিল এই প্রজেক্টের মূল লক্ষ্য।',
      span: 'md:col-span-1 md:row-span-1',
      aspect: 'aspect-square'
    },
    {
      id: '6',
      title: 'কোস্টাল প্রটেকশন ওয়াল',
      location: 'দক্ষিণ কয়রা',
      imageUrl: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=1200',
      category: 'সরকারি প্রজেক্ট',
      description: 'লবণাক্ততা এবং জলোচ্ছ্বাস থেকে রক্ষা পেতে বিশেষ সিমেন্ট ও রড ব্যবহারের মাধ্যমে এই দীর্ঘ দেয়ালটি নির্মাণ করা হয়েছে। এটি এলাকার হাজার হাজার মানুষের জীবন ও জীবিকা রক্ষায় গুরুত্বপূর্ণ ভূমিকা পালন করছে।',
      span: 'md:col-span-2 md:row-span-1',
      aspect: 'aspect-[21/9]'
    },
    {
      id: '7',
      title: 'কয়রা উপজেলা স্বাস্থ্য কমপ্লেক্স এক্সটেনশন',
      location: 'কয়রা সদর',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
      category: 'চিকিৎসা অবকাঠামো',
      description: 'জনসাধারণের সুচিকিৎসা নিশ্চিত করতে এই স্বাস্থ্য কমপ্লেক্সের নতুন ব্লকে আমরা সর্বাধুনিক মানের নির্মাণ সামগ্রী সরবরাহ করেছি। এর স্থায়িত্ব এবং দীর্ঘস্থায়ী শক্তির জন্য প্রিমিয়ার সিমেন্টের বিশেষ মিশ্রণ প্রয়োগ করা হয়েছে।',
      span: 'md:col-span-1 md:row-span-1',
      aspect: 'aspect-square'
    }
  ];

  const handleInquiry = () => {
    setSelectedProject(null);
    setTimeout(() => {
      const el = document.getElementById('services');
      if (el) {
        const offset = 100;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 font-['Hind_Siliguri']">
      <div className="mb-20 space-y-6 text-center">
         <div className="inline-block group">
            <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.6em] mb-2">Success Stories</p>
            <div className="h-1 w-full bg-red-600 rounded-full scale-x-50 group-hover:scale-x-100 transition-transform duration-500"></div>
         </div>
         <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-slate-950 leading-none">সাফল্যের <span className="text-slate-200">গল্পসমূহ</span></h1>
         <p className="text-slate-400 text-sm md:text-lg font-bold italic max-w-2xl mx-auto">আমাদের সরবরাহকৃত প্রিমিয়ার সিমেন্ট ও বিএসআরএম রড দিয়ে নির্মিত আইকনিক স্থাপনাগুলো দেখুন।</p>
      </div>

      {/* Interactive Dynamic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr transition-all duration-1000 ease-in-out">
        {visibleProjects.map((p, idx) => (
          <div 
            key={p.id} 
            onClick={() => setSelectedProject(p)}
            className={`group relative rounded-[50px] overflow-hidden border border-slate-100 shadow-2xl bg-[#060B18] cursor-pointer ${p.span} transition-all duration-700 hover:scale-[1.02] hover:shadow-red-600/20 active:scale-95 animate-in fade-in slide-in-from-bottom-10`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Background Image with Zoom and Brightness effect */}
            <img 
              src={p.imageUrl} 
              className="w-full h-full object-cover opacity-60 grayscale-[0.5] brightness-75 group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-110 transition-all duration-1000 ease-out group-hover:scale-110" 
              alt={p.title} 
            />
            
            {/* Dynamic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-[#060B18]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700"></div>
            
            {/* Content Container */}
            <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
              <div className="space-y-4 transform transition-all duration-700 group-hover:-translate-y-4">
                <span className="inline-block bg-red-600 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {p.category}
                </span>
                
                <h3 className="text-3xl md:text-5xl font-black italic text-white leading-[0.9] tracking-tighter uppercase mb-2">
                  {p.title}
                </h3>
                
                <p className="text-xs font-bold text-slate-300 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-xs">📍</span> {p.location}
                </p>

                {/* Detail Reveal Section */}
                <div className="max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 transition-all duration-1000 ease-in-out overflow-hidden">
                  <p className="text-sm font-medium text-slate-200 leading-relaxed italic border-l-4 border-red-600 pl-6 mt-6 mb-8">
                    {p.description.substring(0, 80)}...
                  </p>
                  
                  <button className="flex items-center gap-4 bg-white text-slate-950 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl">
                    বিস্তারিত দেখুন <span>➔</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Corner Icon */}
            <div className="absolute top-10 right-10 w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 -rotate-12 group-hover:rotate-0 scale-50 group-hover:scale-100">
               <span className="text-2xl">🏗️</span>
            </div>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="mt-24 text-center animate-in fade-in duration-1000">
           <button 
             onClick={() => setShowAll(true)}
             className="group relative bg-slate-950 text-white px-16 py-8 rounded-[40px] font-black uppercase text-[12px] tracking-[0.4em] overflow-hidden transition-all hover:bg-red-600 shadow-2xl active:scale-95"
           >
              <span className="relative z-10">আরো প্রজেক্ট দেখুন (আরো ৭টি)</span>
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
           </button>
        </div>
      )}

      {showAll && (
        <div className="mt-24 text-center">
           <button 
             onClick={() => setShowAll(false)}
             className="group relative border-2 border-slate-950 text-slate-950 px-16 py-8 rounded-[40px] font-black uppercase text-[12px] tracking-[0.4em] overflow-hidden transition-all hover:bg-slate-950 hover:text-white shadow-xl active:scale-95"
           >
              <span className="relative z-10">সংক্ষিপ্ত করুন</span>
           </button>
        </div>
      )}

      {/* Enhanced Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 transition-all duration-500 animate-in fade-in">
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl" 
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row group/modal animate-in zoom-in duration-500">
            
            {/* Modal Image Area */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative overflow-hidden bg-slate-100">
               <img 
                src={selectedProject.imageUrl} 
                className="w-full h-full object-cover" 
                alt={selectedProject.title}
               />
               <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent hidden md:block"></div>
               <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 md:top-8 md:left-8 w-12 h-12 bg-white/20 hover:bg-red-600 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all z-20"
               >
                 ✕
               </button>
            </div>

            {/* Modal Content Area */}
            <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-20 overflow-y-auto flex flex-col bg-white">
               <div className="flex justify-between items-start mb-8 md:mb-12">
                  <div className="space-y-3 md:space-y-4">
                     <span className="bg-red-600 text-white px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest inline-block">
                        {selectedProject.category}
                     </span>
                     <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic text-slate-950 tracking-tighter leading-none uppercase">
                        {selectedProject.title}
                     </h2>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="hidden md:flex w-12 h-12 bg-slate-100 hover:bg-red-600 hover:text-white rounded-full items-center justify-center text-slate-400 transition-all"
                  >
                    ✕
                  </button>
               </div>

               <div className="space-y-8 md:space-y-10 flex-grow">
                  <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[30px] border border-slate-100">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm">📍</div>
                     <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">লোকেশন</p>
                        <p className="text-lg font-black italic text-slate-900 tracking-tight">{selectedProject.location}</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h4 className="text-[10px] font-black uppercase text-red-600 tracking-[0.4em] border-b border-slate-100 pb-4 italic">প্রজেক্ট বর্ণনা</h4>
                     <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed italic">
                        {selectedProject.description}
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 md:p-8 bg-slate-950 text-white rounded-[30px] md:rounded-[40px] text-center">
                        <p className="text-[8px] font-black uppercase text-slate-500 mb-2">স্ট্যাটাস</p>
                        <p className="text-lg md:text-xl font-black italic uppercase">সম্পূর্ণ</p>
                     </div>
                     <div className="p-6 md:p-8 border border-slate-100 rounded-[30px] md:rounded-[40px] text-center">
                        <p className="text-[8px] font-black uppercase text-slate-400 mb-2">পার্টনার</p>
                        <p className="text-lg md:text-xl font-black italic uppercase text-slate-900">প্রিমিয়ার</p>
                     </div>
                  </div>
               </div>

               <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <button 
                    onClick={handleInquiry}
                    className="w-full sm:w-auto bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-red-600/20 hover:bg-slate-950 transition-all active:scale-95"
                  >
                     অনুরূপ প্রজেক্ট ইনকোয়ারি ➔
                  </button>
                  <div className="flex gap-4">
                     <button className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-all text-xl">🔗</button>
                     <button className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-all text-xl">📸</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
