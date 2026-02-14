
import React, { useState, useEffect } from 'react';
import { getConstructionAdvice } from '../services/geminiService.ts';

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
    <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 text-slate-950 font-['Inter']">
      <div className="text-center mb-16 space-y-4 animate-fade-up">
        <p className="text-red-600 text-[10px] font-black uppercase tracking-widest">Construction Planner</p>
        <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">নির্মাণ মেটেরিয়াল <br/><span className="text-slate-300">ক্যালকুলেটর</span></h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-8 animate-fade-up">
          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-slate-100 space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">জায়গার পরিমাণ (Sqft)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[25px] font-black text-2xl outline-none focus:border-red-600 transition-all"
                    placeholder="1200"
                    value={area || ''}
                    onChange={(e) => setArea(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">তলা (Floors)</label>
                <div className="grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button 
                      key={n}
                      onClick={() => setFloors(n)}
                      className={`py-4 rounded-xl font-black text-sm transition-all ${floors === n ? 'bg-red-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={calculate} 
                className="w-full bg-slate-950 text-white py-6 rounded-[25px] font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all"
              >
                হিসাব সম্পন্ন করুন
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-10 rounded-[40px] shadow-lg border border-slate-100">
                  <p className="text-[9px] font-black uppercase text-slate-400 mb-4">Premier Cement</p>
                  <p className="text-6xl font-black italic text-slate-950 leading-none">{result.bags}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">বস্তা</p>
                </div>
                <div className="bg-slate-950 p-10 rounded-[40px] shadow-2xl text-white">
                  <p className="text-[9px] font-black uppercase text-slate-500 mb-4">BSRM Steel</p>
                  <p className="text-6xl font-black italic leading-none">{result.rodTons}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">টন</p>
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-[35px] border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div>
                    <p className="text-[9px] font-black uppercase text-slate-400">আনুমানিক খরচ</p>
                    <p className="text-3xl font-black italic text-slate-950">৳ {result.estimatedCost.toLocaleString()}</p>
                 </div>
                 <button 
                  onClick={fetchAIAdvice}
                  disabled={loadingAdvice}
                  className="bg-white border-2 border-slate-200 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-red-600 transition-all disabled:opacity-50"
                 >
                   {loadingAdvice ? 'জেনারেট হচ্ছে...' : 'AI ইঞ্জিনিয়ার পরামর্শ ✨'}
                 </button>
              </div>

              {advice && (
                <div className="bg-white p-8 md:p-12 rounded-[40px] border border-red-50 shadow-2xl animate-fade-up">
                   <h4 className="text-lg font-black uppercase italic text-slate-950 mb-6">Expert Insights</h4>
                   <p className="text-sm font-bold text-slate-600 leading-relaxed italic whitespace-pre-wrap">{advice}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center text-center p-12">
               <p className="text-xs font-bold text-slate-400 italic">হিসাব দেখার জন্য উপরে ইনপুট দিন</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
