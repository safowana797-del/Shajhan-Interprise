
import React, { useState, useEffect, useRef } from 'react';
import { generateDetailedProductDescription, checkQuotaStatus } from '../services/geminiService';

const CACHE_KEY = 'shahjahan_product_descriptions';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

interface CachedData {
  descriptions: Record<string, string>;
  timestamp: number;
}

const ProductList: React.FC = () => {
  const [aiDescriptions, setAiDescriptions] = useState<Record<string, string>>({});
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const quotaAlreadyHit = checkQuotaStatus();

  const products = [
    {
      id: 'p1',
      category: 'Cement',
      brand: 'Premier Cement',
      type: 'PCC (Puzzolana Portland Cement)',
      price: '৳ ৫৬৫',
      unit: 'বস্তা',
      defaultDesc: 'নির্মাণে দীর্ঘস্থায়ী শক্তির নিশ্চয়তা। উপকূলীয় লোনা আবহাওয়ার জন্য সবচেয়ে কার্যকর।',
      image: 'https://lh3.googleusercontent.com/d/1GgsK_lueRPq-m_tKTZrhlNM1yvG2Q4Bs'
    },
    {
      id: 'p2',
      category: 'Rod',
      brand: 'BSRM Steel',
      type: '500W TMT Bar',
      price: '৳ ৯৮,৫০০',
      unit: 'টন',
      defaultDesc: 'বিশ্বমানের রড, যা আপনার দালানকে দেয় সর্বোচ্চ ভূমিকম্প প্রতিরোধ ক্ষমতা।',
      image: 'https://lh3.googleusercontent.com/d/1HJuPUaad7edlT_FsiI98l9N-CjIHNvrm'
    },
    {
      id: 'p3',
      category: 'Rod',
      brand: 'AKS Steel',
      type: 'TMT 500W',
      price: '৳ ৯৬,০০০',
      unit: 'টন',
      defaultDesc: 'মজবুত বাঁধন এবং সাশ্রয়ী মূল্যে সেরা মানের রড।',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  useEffect(() => {
    const fetchAllDescriptions = async () => {
      // 1. Try to load from cache first
      const saved = localStorage.getItem(CACHE_KEY);
      let cached: CachedData | null = null;
      
      if (saved) {
        try {
          cached = JSON.parse(saved);
          const isExpired = Date.now() - (cached?.timestamp || 0) > CACHE_EXPIRY;
          if (cached && !isExpired) {
            setAiDescriptions(cached.descriptions);
          }
        } catch (e) {
          console.error("Cache parse error", e);
        }
      }

      // Check if we need to fetch anything
      const productsToFetch = products.filter(p => !cached?.descriptions[p.id]);
      if (productsToFetch.length === 0 || checkQuotaStatus()) return;

      // 2. Set missing ones to loading
      setLoadingIds(new Set(productsToFetch.map(p => p.id)));

      const newDescriptions = { ...(cached?.descriptions || {}) };

      // 3. Fetch sequentially with a generous delay to avoid 429 Rate Limit
      for (const p of productsToFetch) {
        // Double check quota status within the loop
        if (checkQuotaStatus()) {
          setLoadingIds(new Set());
          break;
        }

        try {
          const desc = await generateDetailedProductDescription(p.brand, p.type);
          if (desc) {
            newDescriptions[p.id] = desc;
            setAiDescriptions(prev => ({ ...prev, [p.id]: desc }));
            
            // Update cache progressively
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              descriptions: newDescriptions,
              timestamp: Date.now()
            }));
          }
        } catch (e: any) {
          if (e.message === "QUOTA_EXHAUSTED") {
            setLoadingIds(new Set());
            break; 
          }
        } finally {
          setLoadingIds(prev => {
            const next = new Set(prev);
            next.delete(p.id);
            return next;
          });
        }
        // Delay 3 seconds between requests (20 RPM) which is safer for free tier
        await new Promise(r => setTimeout(r, 3000));
      }
    };
    
    fetchAllDescriptions();
  }, []);

  const renderProductCard = (p: typeof products[0]) => (
    <div key={p.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl group hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      <div className="h-64 overflow-hidden relative">
        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.brand} />
        <div className="absolute top-6 right-6 bg-red-600 text-white px-6 py-2 rounded-full font-black text-xs shadow-lg">
          {p.price} / {p.unit}
        </div>
        <div className="absolute bottom-6 left-6">
           <span className="bg-white/90 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-xl font-black uppercase text-[8px] tracking-[0.2em] shadow-sm">
             {p.category}
           </span>
        </div>
      </div>
      
      <div className="p-10 flex flex-col flex-grow space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-black italic text-slate-950 group-hover:text-red-600 transition-colors">{p.brand}</h3>
          <div className="flex items-center gap-3">
             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{p.type}</p>
             {(aiDescriptions[p.id] || (loadingIds.has(p.id) && !checkQuotaStatus())) && (
               <span className="flex items-center gap-1.5 text-[8px] bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-black uppercase tracking-widest shadow-sm">
                 <span className={`w-1.5 h-1.5 bg-red-600 rounded-full ${loadingIds.has(p.id) ? 'animate-pulse' : ''}`}></span>
                 Smart AI Review
               </span>
             )}
          </div>
        </div>

        <div className="flex-grow min-h-[80px]">
          {loadingIds.has(p.id) && !checkQuotaStatus() ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                 <p className="text-[9px] font-black uppercase text-red-600 tracking-widest animate-pulse">AI is writing description...</p>
              </div>
              <div className="space-y-2 animate-pulse">
                <div className="h-2.5 bg-slate-100 rounded-full w-full"></div>
                <div className="h-2.5 bg-slate-100 rounded-full w-[95%]"></div>
                <div className="h-2.5 bg-slate-100 rounded-full w-[70%]"></div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-2 duration-700">
               <p className="text-sm text-slate-500 font-bold leading-relaxed italic border-l-2 border-red-600/20 pl-4">
                {aiDescriptions[p.id] || p.defaultDesc}
              </p>
            </div>
          )}
        </div>

        <div className="pt-6 mt-auto border-t border-slate-50">
          <button 
            onClick={() => document.getElementById('calculator')?.scrollIntoView({behavior: 'smooth'})}
            className="group/btn relative w-full overflow-hidden bg-slate-950 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl hover:shadow-red-600/20 active:scale-95"
          >
            <span className="relative z-10">অর্ডার ও হিসাব ➔</span>
            <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-20 font-['Hind_Siliguri']">
      <div className="mb-20 space-y-4 text-center">
         <div className="inline-block relative">
            <p className="text-red-600 text-xs font-black uppercase tracking-[0.4em] mb-2">Authorized Inventory</p>
            <div className="h-1 w-full bg-red-600 rounded-full scale-x-50"></div>
         </div>
         <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-slate-950 leading-none">
           আমাদের <br/><span className="text-slate-200">প্রডাক্টসমূহ</span>
         </h1>
         <p className="text-slate-400 text-sm md:text-lg font-bold italic max-w-xl mx-auto">Gemini AI দ্বারা চালিত রিয়েল-টাইম লোকাল কন্টেন্ট এবং উপকূলীয় অঞ্চলের জন্য সেরা মেটেরিয়াল গাইড।</p>
      </div>

      <div id="cement-products" className="scroll-mt-32">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-slate-950 flex-shrink-0">সিমেন্ট <span className="text-slate-200">(CEMENT)</span></h2>
          <div className="h-px flex-grow bg-slate-100"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.filter(p => p.category === 'Cement').map(renderProductCard)}
        </div>
      </div>

      <div id="rod-products" className="scroll-mt-32">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-slate-950 flex-shrink-0">রড ও স্টিল <span className="text-slate-200">(STEEL)</span></h2>
          <div className="h-px flex-grow bg-slate-100"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.filter(p => p.category === 'Rod').map(renderProductCard)}
        </div>
      </div>
      
      <div className="pt-10 flex justify-center">
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-6 py-3 rounded-2xl">
           <span className="text-lg">✨</span>
           <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Descriptions dynamically enhanced by <span className="text-red-600">Gemini 3.0</span> for coastal Khulna</p>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
