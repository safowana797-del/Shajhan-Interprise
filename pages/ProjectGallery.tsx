
import React from 'react';

const ProjectGallery: React.FC = () => {
  const projects = [
    {
      id: '1',
      title: 'কয়রা কেন্দ্রীয় জামে মসজিদ',
      location: 'কয়রা বাজার, খুলনা',
      image: 'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?auto=format&fit=crop&q=80&w=1200',
      category: 'ধর্মীয় স্থাপত্য',
    },
    {
      id: '2',
      title: 'পাইকগাছা রিভারসাইড পার্ক',
      location: 'পাইকগাছা, খুলনা',
      image: 'https://images.unsplash.com/photo-1578345218746-50a229b3d0f8?auto=format&fit=crop&q=80&w=1200',
      category: 'ইনফ্রাস্ট্রাকচার',
    },
    {
      id: '3',
      title: 'মর্ডান ডুপ্লেক্স হাউস',
      location: 'কয়রা মেইন রোড, খুলনা',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      category: 'আবাসিক',
    }
  ];

  return (
    <div className="min-h-screen bg-[#060B18] pt-32 pb-40 font-['Noto_Sans_Bengali']">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 space-y-4 text-center">
           <p className="text-red-600 text-xs font-black uppercase tracking-[0.3em]">Legacy of Strength</p>
           <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white">সাফল্যের <span className="text-slate-600">গল্পসমূহ</span></h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map(p => (
            <div key={p.id} className="group relative rounded-[50px] overflow-hidden border border-white/5 aspect-video shadow-2xl">
              <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={p.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-10 left-10 space-y-2">
                <span className="bg-red-600 text-white px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">{p.category}</span>
                <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter">{p.title}</h3>
                <p className="text-xs font-bold text-slate-400">📍 {p.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
