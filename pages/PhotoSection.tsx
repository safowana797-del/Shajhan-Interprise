
import React from 'react';

const PhotoSection: React.FC = () => {
  const images = [
    { 
      url: 'https://lh3.googleusercontent.com/d/1FNAlpU5xzfo71m3-LlhWrLT8gp0HRsA_', 
      title: 'Koyra Model Women\'s College', 
      size: 'large' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1200', 
      title: 'Construction Progress', 
      size: 'large' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800', 
      title: 'Premier Cement Stock', 
      size: 'small' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', 
      title: 'Worker Safety', 
      size: 'small' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=1200', 
      title: 'Rod Inventory', 
      size: 'large' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=800', 
      title: 'Koyra Project Site', 
      size: 'small' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800', 
      title: 'Authorized Store', 
      size: 'small' 
    }
  ];

  return (
    <div className="min-h-screen bg-transparent px-6 py-12 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4 animate-in fade-in duration-700">
        <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.5em]">Visual Legacy</p>
        <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-slate-950">ফটো <span className="text-slate-200">সেকশন</span></h1>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative overflow-hidden rounded-[40px] shadow-lg border border-white hover:shadow-2xl transition-all duration-700 break-inside-avoid animate-in zoom-in duration-500"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <img 
              src={img.url} 
              alt={img.title} 
              className="w-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
               <h3 className="text-white font-black italic uppercase tracking-tighter text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSection;
