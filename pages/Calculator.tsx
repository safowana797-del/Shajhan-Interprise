
import React, { useState, useEffect } from 'react';
import { getConstructionAdvice } from '../services/geminiService';

interface HistoryItem {
  id: string;
  timestamp: string;
  area: number;
  floors: number;
  bags: number;
  rodTons: string;
  estimatedCost: number;
}

const Calculator: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [area, setArea] = useState<number>(1200);
  const [floors, setFloors] = useState<number>(1);
  const [result, setResult] = useState<any>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [advice, setAdvice] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('calc_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const calculate = () => {
    const totalArea = area * floors;
    const cementBags = Math.ceil(totalArea * 0.45);
    const rodKg = Math.ceil(totalArea * 4.5);
    const rodTonsNum = (rodKg / 1000).toFixed(2);
    const cost = (cementBags * 565) + (rodKg * 98.5);
    const res = { bags: cementBags, rodKg, rodTons: rodTonsNum, estimatedCost: cost };
    setResult(res);
    setAdvice('');

    const newHistory = [{
      id: Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toLocaleDateString('bn-BD'),
      area, floors, bags: cementBags, rodTons: rodTonsNum, estimatedCost: cost
    }, ...history].slice(0, 3);
    setHistory(newHistory);
    localStorage.setItem('calc_history', JSON.stringify(newHistory));
    
    // Smooth scroll to result on mobile
    if (window.innerWidth < 768) {
        setTimeout(() => {
            document.getElementById('calc-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
  };

  const fetchAIAdvice = async () => {
    if (!result) return;
    setLoadingAdvice(true);
    try {
      const aiResponse = await getConstructionAdvice(area, floors, result.bags, result.rodTons);
      setAdvice(aiResponse);
    } catch (error) {
      setAdvice("দুঃখিত, এই মুহূর্তে পরামর্শ পাওয়া যাচ্ছে না।");
    } finally {
      setLoadingAdvice(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 text-slate-950 font-['Hind_Siliguri']">
      
      {!isStarted ? (
        /* --- INTRO CARD --- */
        <div 
          onClick={() => setIsStarted(true)}
          className="group relative max-w-5xl mx-auto bg-white rounded-[60px] md:rounded-[100px] p-12 md:p-24 text-center border border-slate-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden transition-all duration-700 hover:scale-[1.01] hover:shadow-red-600/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10 space-y-8">
            <div className="inline-block px-6 py-2 bg-red-600/10 rounded-full text-red-600 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
              Smart Estimator
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none text-slate-950">
              নির্ভুল হিসাব, <br/>
              <span className="text-slate-200 group-hover:text-red-600 transition-colors duration-700">মজবুত নির্মাণ</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-400 font-bold italic max-w-2xl mx-auto leading-relaxed">
              আপনার স্বপ্নের ঘর তৈরিতে কত বস্তা সিমেন্ট বা কত টন রড লাগবে, তা এখন মুহূর্তেই নিখুঁতভাবে হিসেব করুন। শাহজাহান এন্টারপ্রাইজের স্মার্ট ক্যালকুলেটর আপনাকে দেবে সঠিক দিকনির্দেশনা।
            </p>
            
            <div className="pt-8">
              <button className="bg-slate-950 text-white px-12 py-6 rounded-[30px] font-black uppercase text-[12px] tracking-[0.4em] shadow-2xl transition-all group-hover:bg-red-600 group-hover:scale-110 active:scale-95">
                হিসাব শুরু করুন ➔
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-600/5 blur-[100px] rounded-full"></div>
          <div className="absolute top-10 left-10 text-9xl opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-1000">📊</div>
        </div>
      ) : (
        /* --- ACTUAL CALCULATOR UI --- */
        <div className="animate-in fade-in zoom-in-95 duration-700">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
               <button onClick={() => setIsStarted(false)} className="text-red-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                 ← ফিরে যান
               </button>
               <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-slate-950 leading-none">
                 নির্মাণ <span className="text-slate-200">পরিকল্পনা</span>
               </h2>
            </div>
            <p className="text-slate-400 text-sm font-bold italic max-w-xs text-right hidden md:block">
              আপনার ইনপুট অনুযায়ী রিয়েল-টাইম এস্টিমেশন তৈরি করা হচ্ছে।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-slate-50 space-y-10">
                <div className="space-y-8">
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 px-2 italic">জায়গার পরিমাণ (Sqft)</label>
                    <input 
                      type="number" 
                      className="w-full p-8 bg-slate-50 border border-slate-100 rounded-[30px] font-black text-3xl outline-none focus:border-red-600 transition-all shadow-inner placeholder:text-slate-200"
                      placeholder="1200"
                      value={area || ''}
                      onChange={(e) => setArea(Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 px-2 italic">তলা (Floors)</label>
                    <div className="grid grid-cols-5 gap-3">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button 
                          key={n}
                          onClick={() => setFloors(n)}
                          className={`py-5 rounded-2xl font-black text-xs transition-all ${floors === n ? 'bg-red-600 text-white shadow-xl scale-110 z-10' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={calculate} 
                    className="w-full bg-slate-950 text-white py-8 rounded-[30px] font-black text-[12px] uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-all hover:bg-red-600"
                  >
                    হিসাব সম্পন্ন করুন ➔
                  </button>
                </div>
              </div>
              
              <div className="bg-[#060B18] text-white p-10 rounded-[50px] shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px] group-hover:bg-red-600/20 transition-all"></div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-8 italic border-b border-white/5 pb-4">সাম্প্রতিক হিসাব</h4>
                 <div className="space-y-6">
                    {history.length > 0 ? history.map(h => (
                       <div key={h.id} className="flex justify-between items-center group/item cursor-pointer">
                          <div className="space-y-1">
                             <p className="text-xs font-black italic text-white group-hover/item:text-red-600 transition-colors">{h.area} sqft • {h.floors} তলা</p>
                             <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest">{h.timestamp}</p>
                          </div>
                          <div className="text-right">
                             <div className="text-sm font-black text-white italic">৳{h.estimatedCost.toLocaleString()}</div>
                          </div>
                       </div>
                    )) : <p className="text-[10px] text-slate-700 font-bold italic text-center py-4">কোন হিস্ট্রি নেই</p>}
                 </div>
              </div>
            </div>

            <div id="calc-results" className="lg:col-span-7 space-y-8 scroll-mt-24">
              {result ? (
                <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-white p-10 md:p-12 rounded-[60px] shadow-xl border border-slate-50 group hover:-translate-y-2 transition-all">
                      <div className="flex justify-between items-center mb-8">
                         <p className="text-[9px] font-black uppercase text-slate-300 tracking-[0.4em]">Premier Cement</p>
                         <span className="text-2xl">🏗️</span>
                      </div>
                      <div className="flex items-end gap-3">
                        <p className="text-7xl md:text-8xl font-black italic text-slate-950 leading-none group-hover:text-red-600 transition-colors">{result.bags}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 italic">বস্তা</p>
                      </div>
                    </div>
                    <div className="bg-[#060B18] p-10 md:p-12 rounded-[60px] shadow-2xl text-white group hover:-translate-y-2 transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px]"></div>
                      <div className="flex justify-between items-center mb-8 relative z-10">
                         <p className="text-[9px] font-black uppercase text-slate-500 tracking-[0.4em]">BSRM Steel</p>
                         <span className="text-2xl">⛓️</span>
                      </div>
                      <div className="flex items-end gap-3 relative z-10">
                        <p className="text-7xl md:text-8xl font-black italic leading-none group-hover:text-red-600 transition-colors">{result.rodTons}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 italic">টন</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-10 md:p-12 rounded-[60px] border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10 shadow-xl group">
                     <div className="text-center md:text-left space-y-2">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1 italic">আনুমানিক মালামাল খরচ</p>
                        <p className="text-4xl md:text-5xl font-black italic text-slate-950 leading-none group-hover:scale-105 transition-transform origin-left tracking-tighter">৳ {result.estimatedCost.toLocaleString()}</p>
                     </div>
                     <button 
                      onClick={fetchAIAdvice}
                      disabled={loadingAdvice}
                      className="w-full md:w-auto bg-red-600 text-white px-10 py-6 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-950 transition-all disabled:opacity-50 shadow-lg shadow-red-600/20"
                     >
                       {loadingAdvice ? 'জেনারেট হচ্ছে...' : 'AI ইঞ্জিনিয়ার পরামর্শ ✨'}
                     </button>
                  </div>

                  {advice && (
                    <div className="bg-white p-10 md:p-16 rounded-[60px] shadow-2xl animate-in slide-in-from-top-6 duration-700 relative overflow-hidden border border-slate-50">
                       <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/5 blur-[80px]"></div>
                       <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-6">
                          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white text-xl">✨</div>
                          <h4 className="text-xl font-black uppercase italic tracking-tighter">Expert Insights</h4>
                       </div>
                       <p className="text-base font-bold text-slate-600 leading-[2] italic whitespace-pre-wrap">{advice}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full min-h-[500px] bg-slate-50/50 backdrop-blur-md border-2 border-dashed border-slate-200 rounded-[70px] flex flex-col items-center justify-center text-center p-12 group hover:border-red-600/30 transition-all">
                   <div className="w-24 h-24 bg-white rounded-[35px] flex items-center justify-center text-4xl mb-8 shadow-xl group-hover:scale-110 transition-transform">📊</div>
                   <p className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-400 italic">হিসাব দেখার জন্য বাম পাশে ইনপুট দিন</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
