
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { InventoryItem, LedgerEntry, ExpenseEntry, ScheduledPost } from '../types';
import { GoogleGenAI, Modality, Type, LiveServerMessage } from "@google/genai";
import { 
  generateActualVideo, 
  getBusinessOracleAdvice, 
  generateRadioAd, 
  generateMarketingPoster
} from '../services/geminiService';

declare var process: {
  env: {
    API_KEY: string;
  };
};

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

const MASTER_PASSWORD = 'shahjahan786';
const LOGO_URL = "https://img.icons8.com/fluency/512/structural.png";

// Audio Helpers
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'accounts' | 'marketing' | 'settings'>('overview');
  
  // Data State
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [expenses, setExpenses] = useState<ExpenseEntry[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  
  // Modals
  const [isInvModalOpen, setIsInvModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  
  // Payment Flow States
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedLedger, setSelectedLedger] = useState<LedgerEntry | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Marketing Generation States
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoPrompt, setVideoPrompt] = useState('Shahjahan Enterprise-er shop theke Premier Cement delivery hocche');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoProgress, setVideoProgress] = useState('');

  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [voicePrompt, setVoicePrompt] = useState('Premier Cement-er mobjut bondhon niye akta ad banan');
  const [generatedAudioBlob, setGeneratedAudioBlob] = useState<string | null>(null);

  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [posterPrompt, setPosterPrompt] = useState('Professional construction banner for Shahjahan Enterprise, showing Premier Cement and BSRM steel rods');
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);

  // Voice Assistant States
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [aiStatus, setAiStatus] = useState('অ্যাসিস্ট্যান্ট রেডি');
  
  const sessionRef = useRef<any>(null);

  useEffect(() => {
    const inv = localStorage.getItem('shahjahan_inventory');
    const led = localStorage.getItem('shahjahan_ledger');
    const exp = localStorage.getItem('shahjahan_expenses');
    const sch = localStorage.getItem('shahjahan_scheduled');
    if (inv) setInventory(JSON.parse(inv));
    if (led) setLedger(JSON.parse(led));
    if (exp) setExpenses(JSON.parse(exp));
    if (sch) setScheduledPosts(JSON.parse(sch));
  }, []);

  const saveToStorage = (type: 'inventory' | 'ledger' | 'expenses' | 'scheduled', data: any) => {
    localStorage.setItem(`shahjahan_${type}`, JSON.stringify(data));
  };

  const stats = useMemo(() => {
    const sales = ledger.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const baki = ledger.reduce((acc, curr) => acc + curr.remainingAmount, 0);
    const exp = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    return { sales, baki, exp, profit: sales - exp };
  }, [ledger, expenses]);

  // CSV EXPORT UTILITY
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert("এক্সপোর্ট করার জন্য কোনো ডাটা নেই।");
      return;
    }
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj).map(val => {
        const strVal = String(val);
        return strVal.includes(',') ? `"${strVal.replace(/"/g, '""')}"` : strVal;
      }).join(',')
    ).join('\n');
    
    const csvContent = `\uFEFF${headers}\n${rows}`; // Added BOM for Excel UTF-8 support
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportInventory = () => {
    const exportData = inventory.map(item => ({
      'ID': item.id,
      'Brand': item.brand,
      'Type': item.type,
      'Quantity': item.quantity,
      'Unit': item.unit,
      'Price': item.unitPrice,
      'Last Updated': item.lastUpdated
    }));
    exportToCSV(exportData, 'Inventory_Report');
  };

  const handleExportLedger = () => {
    const exportData = ledger.map(entry => ({
      'ID': entry.id,
      'Client Name': entry.clientName,
      'Contact': entry.contact,
      'Total': entry.totalAmount,
      'Paid': entry.paidAmount,
      'Baki': entry.remainingAmount,
      'Status': entry.status,
      'Date': entry.lastTransactionDate
    }));
    exportToCSV(exportData, 'Ledger_Report');
  };

  // INVENTORY ACTIONS
  const handleOpenAddInventory = () => {
    setEditingItem(null);
    setIsInvModalOpen(true);
  };

  const handleEditInventory = (item: InventoryItem) => {
    setEditingItem(item);
    setIsInvModalOpen(true);
  };

  const handleSaveInventory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: InventoryItem = {
      id: editingItem ? editingItem.id : Math.random().toString(36).substr(2, 9),
      brand: formData.get('brand') as string,
      type: formData.get('type') as string,
      quantity: Number(formData.get('quantity')),
      unit: formData.get('unit') as any,
      category: formData.get('category') as any,
      unitPrice: Number(formData.get('unitPrice')),
      lastUpdated: new Date().toLocaleDateString()
    };

    const updatedInv = editingItem 
      ? inventory.map(it => it.id === editingItem.id ? newItem : it)
      : [newItem, ...inventory];

    setInventory(updatedInv);
    saveToStorage('inventory', updatedInv);
    setIsInvModalOpen(false);
  };

  // PAYMENT FLOW ACTIONS
  const openPaymentModal = (entry: LedgerEntry) => {
    setSelectedLedger(entry);
    setPaymentAmount(entry.remainingAmount);
    setIsPaymentModalOpen(true);
  };

  const handleProcessPayment = async () => {
    if (!selectedLedger) return;
    if (paymentAmount <= 0) {
      alert("অনুগ্রহ করে সঠিক টাকার পরিমাণ দিন।");
      return;
    }

    setIsProcessingPayment(true);
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newPaidAmount = selectedLedger.paidAmount + paymentAmount;
    const newRemainingAmount = Math.max(0, selectedLedger.totalAmount - newPaidAmount);
    
    const updatedEntry: LedgerEntry = {
      ...selectedLedger,
      paidAmount: newPaidAmount,
      remainingAmount: newRemainingAmount,
      status: newRemainingAmount <= 0 ? 'Paid' : 'Pending',
      lastTransactionDate: new Date().toLocaleDateString('bn-BD')
    };

    const updatedLedger = ledger.map(entry => 
      entry.id === selectedLedger.id ? updatedEntry : entry
    );

    setLedger(updatedLedger);
    saveToStorage('ledger', updatedLedger);
    setIsProcessingPayment(false);
    setIsPaymentModalOpen(false);
    setSelectedLedger(null);
  };

  // SCHEDULING ACTIONS
  const handleAddSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPost: ScheduledPost = {
      id: Math.random().toString(36).substr(2, 9),
      platform: formData.get('platform') as any,
      type: formData.get('type') as any,
      prompt: formData.get('prompt') as string,
      scheduledTime: formData.get('time') as string,
      status: 'Scheduled'
    };
    const updated = [newPost, ...scheduledPosts];
    setScheduledPosts(updated);
    saveToStorage('scheduled', updated);
    setIsScheduleModalOpen(false);
  };

  const deleteSchedule = (id: string) => {
    const updated = scheduledPosts.filter(p => p.id !== id);
    setScheduledPosts(updated);
    saveToStorage('scheduled', updated);
  };

  // GENERATION HANDLERS
  const handleGenerateVideo = async () => {
    const hasKey = await window.aistudio?.hasSelectedApiKey();
    if (!hasKey) {
      await window.aistudio?.openSelectKey();
    }

    setIsGeneratingVideo(true);
    setVideoProgress('Engine starting...');
    try {
      const url = await generateActualVideo(videoPrompt, null, setVideoProgress);
      setGeneratedVideoUrl(url);
    } catch (e: any) { 
      if (e.message?.includes("Requested entity was not found")) {
        await window.aistudio?.openSelectKey();
      }
      alert("ভিডিও এরর: " + (e.message || "Unknown error")); 
    }
    setIsGeneratingVideo(false);
  };

  const handleGenerateVoice = async () => {
    setIsGeneratingVoice(true);
    try {
      const base64Audio = await generateRadioAd(voicePrompt);
      if (base64Audio) {
        setGeneratedAudioBlob(base64Audio);
      }
    } catch (e) { alert("ভয়েস এরর"); }
    setIsGeneratingVoice(false);
  };

  const playGeneratedVoice = async () => {
    if (!generatedAudioBlob) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const buffer = await decodeAudioData(decode(generatedAudioBlob), ctx, 24000, 1);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  };

  const handleGeneratePoster = async () => {
    setIsGeneratingPoster(true);
    try {
      const url = await generateMarketingPoster(posterPrompt);
      setGeneratedPoster(url);
    } catch (e) { alert("পোস্টার এরর"); }
    setIsGeneratingPoster(false);
  };

  const startLiveAssistant = async () => {
    if (isLiveActive) {
      setIsLiveActive(false);
      return;
    }
    setAiStatus('কানেক্ট হচ্ছে...');
    setIsLiveActive(true);
    setAiStatus('আমি শুনছি...');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-['Noto_Sans_Bengali']">
        <div className="bg-white/10 backdrop-blur-3xl p-12 rounded-[50px] border border-white/20 shadow-2xl w-full max-sm text-center">
          <div className="w-24 h-24 bg-white rounded-3xl mx-auto mb-10 flex items-center justify-center p-4 shadow-xl">
             <img src={LOGO_URL} alt="Admin Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-black text-white mb-8 italic">Admin Secure</h1>
          <input 
            type="password" placeholder="Passcode" 
            className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl mb-6 text-center text-xl font-black text-white outline-none focus:border-red-600 transition-all"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => password === MASTER_PASSWORD ? setIsAuthenticated(true) : alert("ভুল")} className="w-full bg-red-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-red-600/40 hover:scale-[1.02] active:scale-95 transition-all">প্রবেশ করুন</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#060B18] text-slate-200 font-['Noto_Sans_Bengali'] relative pb-44">
      
      {/* INVENTORY MODAL */}
      {isInvModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-white/10 w-full max-w-xl rounded-[40px] p-10 shadow-2xl animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter">
                {editingItem ? 'স্টক এডিট করুন' : 'নতুন আইটেম'}
              </h2>
              <button onClick={() => setIsInvModalOpen(false)} className="text-slate-500 hover:text-white transition-colors text-2xl">✕</button>
            </div>
            <form onSubmit={handleSaveInventory} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input required name="brand" defaultValue={editingItem?.brand || ''} placeholder="ব্র্যান্ড" className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600" />
                <input required name="type" defaultValue={editingItem?.type || ''} placeholder="টাইপ (PCC/OPC)" className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <input required name="quantity" type="number" defaultValue={editingItem?.quantity || ''} placeholder="পরিমাণ" className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600" />
                <input required name="unitPrice" type="number" defaultValue={editingItem?.unitPrice || ''} placeholder="৳ দাম" className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600" />
              </div>
              <button type="submit" className="w-full bg-red-600 text-white py-6 rounded-[25px] font-black uppercase text-[12px] tracking-widest shadow-2xl hover:bg-red-500 transition-all">সেভ করুন</button>
            </form>
          </div>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {isPaymentModalOpen && selectedLedger && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
           <div className="bg-slate-900 border border-white/10 w-full max-w-lg rounded-[50px] p-10 shadow-[0_50px_100px_-20px_rgba(237,28,36,0.2)] animate-in zoom-in-95 duration-500 overflow-hidden relative">
              {isProcessingPayment && (
                <div className="absolute inset-0 z-50 bg-slate-900/95 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
                   <div className="w-20 h-20 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
                   <div className="text-center space-y-2">
                     <p className="text-xl font-black italic uppercase tracking-widest text-white">পেমেন্ট প্রসেস হচ্ছে...</p>
                     <p className="text-[10px] font-bold text-slate-500 animate-pulse">অনুগ্রহ করে অপেক্ষা করুন</p>
                   </div>
                </div>
              )}

              <div className="flex justify-between items-start mb-10">
                <div className="space-y-2">
                  <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em]">Payment Collection</p>
                  <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter">টাকা গ্রহণ</h2>
                </div>
                <button onClick={() => setIsPaymentModalOpen(false)} className="text-slate-500 hover:text-white transition-colors text-2xl">✕</button>
              </div>

              <div className="space-y-8">
                 <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">গ্রাহকের নাম</p>
                      <p className="text-xl font-black italic text-white">{selectedLedger.clientName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">মোট বাকি</p>
                      <p className="text-2xl font-black italic text-red-500">৳{selectedLedger.remainingAmount.toLocaleString()}</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2 italic">জমার পরিমাণ (৳)</label>
                    <input 
                      type="number" 
                      className="w-full p-8 bg-slate-950 border border-white/5 rounded-[30px] font-black text-4xl text-center text-white outline-none focus:border-red-600 transition-all shadow-inner"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                      max={selectedLedger.remainingAmount}
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setPaymentAmount(selectedLedger.remainingAmount)}
                      className="py-4 bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      পুরোটা (Full)
                    </button>
                    <button 
                      onClick={() => setPaymentAmount(selectedLedger.remainingAmount / 2)}
                      className="py-4 bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      অর্ধেক (Half)
                    </button>
                 </div>

                 <button 
                    onClick={handleProcessPayment}
                    className="w-full bg-red-600 text-white py-8 rounded-[30px] font-black uppercase text-[12px] tracking-[0.4em] shadow-2xl hover:bg-red-500 transition-all active:scale-95 mt-4"
                 >
                    পেমেন্ট কনফার্ম করুন ➔
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* SCHEDULING MODAL */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
           <div className="bg-slate-900 border border-white/10 w-full max-w-xl rounded-[40px] p-10 shadow-2xl animate-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter">কন্টেন্ট শিডিউল</h2>
                <button onClick={() => setIsScheduleModalOpen(false)} className="text-slate-500 hover:text-white transition-colors text-2xl">✕</button>
              </div>
              <form onSubmit={handleAddSchedule} className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <select name="platform" className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600">
                       <option value="Facebook">Facebook</option>
                       <option value="Instagram">Instagram</option>
                       <option value="WhatsApp">WhatsApp</option>
                    </select>
                    <select name="type" className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600">
                       <option value="Poster">Poster + Caption</option>
                       <option value="Text">Only Caption</option>
                       <option value="Video">Video Ad</option>
                    </select>
                 </div>
                 <textarea required name="prompt" placeholder="কি নিয়ে পোস্ট করবেন? (যেমন: বর্ষা উপলক্ষে ডিসকাউন্ট)" className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600 h-32" />
                 <input required name="time" type="datetime-local" className="w-full bg-slate-950 border border-white/5 p-5 rounded-2xl text-white font-bold outline-none focus:border-red-600" />
                 <button type="submit" className="w-full bg-red-600 text-white py-6 rounded-[25px] font-black uppercase text-[12px] tracking-widest">শিডিউল কনফার্ম করুন</button>
              </form>
           </div>
        </div>
      )}

      <header className="bg-slate-900/40 backdrop-blur-2xl border-b border-white/5 px-8 py-5 flex justify-between items-center sticky top-0 z-[100]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-lg border border-white/10">
             <img src={LOGO_URL} alt="Admin Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-lg font-black uppercase italic tracking-tighter">Admin Suite</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
             <p className="text-[10px] font-black uppercase text-slate-500">System Status</p>
             <p className="text-[10px] font-black uppercase text-green-500">All Nodes Active</p>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-12 max-w-7xl mx-auto w-full">
        
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-700">
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'মোট বিক্রি', val: `৳${stats.sales.toLocaleString()}`, icon: '📈' },
                  { label: 'মোট পাওনা', val: `৳${stats.baki.toLocaleString()}`, icon: '💳' },
                  { label: 'মোট খরচ', val: `৳${stats.exp.toLocaleString()}`, icon: '💸' },
                  { label: 'নিট লাভ', val: `৳${stats.profit.toLocaleString()}`, icon: '💎' }
                ].map((s, i) => (
                  <div key={i} className="bg-slate-900/30 border border-white/5 p-8 rounded-[40px] hover:bg-slate-800/40 transition-all">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{s.label}</p>
                      <span className="text-xl">{s.icon}</span>
                    </div>
                    <p className="text-2xl font-black italic text-white">{s.val}</p>
                  </div>
                ))}
             </div>

             <div className="bg-slate-900/60 backdrop-blur-3xl p-10 rounded-[50px] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] pointer-events-none"></div>
                <div className="flex flex-col md:flex-row items-center gap-10">
                   <div className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl bg-slate-800 border-4 ${isLiveActive ? 'border-red-600 animate-pulse' : 'border-white/5'}`}>🎙️</div>
                   <div className="flex-grow text-center md:text-left space-y-4">
                      <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">ভয়েস সহকারী</h2>
                      <p className="text-sm font-bold text-slate-500 uppercase italic">"{aiStatus}"</p>
                   </div>
                   <button onClick={startLiveAssistant} className="bg-red-600 text-white px-12 py-6 rounded-[30px] font-black uppercase text-[12px] tracking-widest shadow-2xl hover:scale-105 transition-all">কথা বলুন</button>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-8">
             <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">স্টক রিপোর্ট</h2>
                <div className="flex gap-4">
                  <button 
                    onClick={handleExportInventory}
                    className="bg-green-600 text-white px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-green-600/20 hover:bg-green-500 transition-all flex items-center gap-2"
                  >
                    Export CSV ⬇️
                  </button>
                  <button onClick={handleOpenAddInventory} className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest">যোগ করুন +</button>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {inventory.map(item => (
                   <div key={item.id} className="bg-slate-900/30 border border-white/5 p-10 rounded-[50px] group relative hover:border-red-600/20 transition-all">
                      <button onClick={() => handleEditInventory(item)} className="absolute top-8 right-8 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">✏️</button>
                      <h4 className="text-2xl font-black uppercase italic text-white mb-2">{item.brand}</h4>
                      <div className="flex items-end gap-2 mb-6">
                         <span className="text-5xl font-black italic text-white">{item.quantity}</span>
                         <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{item.unit}</span>
                      </div>
                      <div className="pt-6 border-t border-white/5">
                         <span className="text-[10px] font-black uppercase text-slate-600 italic">মূল্য: ৳{item.unitPrice}</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'accounts' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-8">
             <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">লেজার ও হিসাব</h2>
                <button 
                  onClick={handleExportLedger}
                  className="bg-green-600 text-white px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-green-600/20 hover:bg-green-500 transition-all flex items-center gap-2"
                >
                  Export Data ⬇️
                </button>
             </div>
             
             <div className="bg-slate-900/30 border border-white/5 rounded-[40px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-950/50 text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      <tr>
                        <th className="p-8">ক্লাইন্ট নাম</th>
                        <th className="p-8">মোট টাকা</th>
                        <th className="p-8">পরিশোধিত</th>
                        <th className="p-8">বাকি (পাওনা)</th>
                        <th className="p-8">স্ট্যাটাস</th>
                        <th className="p-8">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-bold text-slate-300">
                      {ledger.length > 0 ? ledger.map(entry => (
                        <tr key={entry.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-8">
                             <p className="text-white italic">{entry.clientName}</p>
                             <p className="text-[10px] text-slate-500">{entry.contact}</p>
                          </td>
                          <td className="p-8">৳{entry.totalAmount.toLocaleString()}</td>
                          <td className="p-8 text-green-500">৳{entry.paidAmount.toLocaleString()}</td>
                          <td className="p-8 text-red-500 font-black">৳{entry.remainingAmount.toLocaleString()}</td>
                          <td className="p-8">
                             <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase ${entry.status === 'Paid' ? 'bg-green-500/10 text-green-500' : entry.status === 'Overdue' ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500'}`}>
                               {entry.status}
                             </span>
                          </td>
                          <td className="p-8">
                             {entry.remainingAmount > 0 ? (
                               <button 
                                 onClick={() => openPaymentModal(entry)}
                                 className="bg-red-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20 hover:scale-105 transition-all"
                               >
                                 💸 পেমেন্ট
                               </button>
                             ) : (
                               <span className="text-[10px] text-green-500 font-black uppercase italic">Paid ✅</span>
                             )}
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={6} className="p-20 text-center italic text-slate-600">কোন হিসাব পাওয়া যায়নি</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="space-y-12 animate-in fade-in duration-700">
             <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white">AI প্রচার প্রচারণা</h2>
                <p className="text-sm font-bold text-slate-500 italic mt-4 uppercase">এক ক্লিকেই ভিডিও, ভয়েস এবং ব্যানার অ্যাড তৈরি করুন</p>
             </div>

             {/* SCHEDULING SECTION */}
             <div className="bg-slate-900/40 p-10 rounded-[60px] border border-white/5 space-y-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                   <div className="space-y-2">
                      <h3 className="text-2xl font-black uppercase italic text-white leading-none">সোশ্যাল মিডিয়া শিডিউলার</h3>
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">ভবিষ্যতের জন্য পোস্ট প্ল্যান করুন</p>
                   </div>
                   <button onClick={() => setIsScheduleModalOpen(true)} className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">নতুন শিডিউল +</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {scheduledPosts.length === 0 ? (
                      <div className="col-span-full py-12 border-2 border-dashed border-white/5 rounded-[40px] text-center italic text-slate-600">
                         কোন শিডিউল পোস্ট নেই
                      </div>
                   ) : (
                      scheduledPosts.map(post => (
                         <div key={post.id} className="bg-slate-950/50 p-6 rounded-[30px] border border-white/5 flex flex-col justify-between">
                            <div className="space-y-4">
                               <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                     <span className="text-xl">{post.platform === 'Facebook' ? '🔵' : post.platform === 'Instagram' ? '🟣' : '🟢'}</span>
                                     <span className="text-[10px] font-black uppercase text-slate-400">{post.type}</span>
                                  </div>
                                  <span className="bg-red-600/10 text-red-500 px-3 py-1 rounded-full text-[8px] font-black uppercase">{post.status}</span>
                               </div>
                               <p className="text-xs font-bold text-white line-clamp-2 italic">"{post.prompt}"</p>
                               <p className="text-[9px] font-black text-slate-500 uppercase">📅 {new Date(post.scheduledTime).toLocaleString('bn-BD')}</p>
                            </div>
                            <button onClick={() => deleteSchedule(post.id)} className="mt-6 text-[8px] font-black uppercase text-slate-700 hover:text-red-500 transition-colors">সরিয়ে ফেলুন</button>
                         </div>
                      ))
                   )}
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="bg-slate-900/40 p-10 rounded-[60px] border border-white/5 space-y-8 flex flex-col">
                   <div className="flex justify-between items-center">
                      <div className="w-14 h-14 bg-red-600/10 text-red-600 rounded-2xl flex items-center justify-center text-2xl">🎬</div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">VEO 3.1 ENGINE</span>
                   </div>
                   <h3 className="text-2xl font-black uppercase italic text-white leading-none">AI ভিডিও বিজ্ঞাপন</h3>
                   <textarea className="w-full bg-slate-950 border border-white/5 p-6 rounded-3xl text-xs font-bold text-slate-400 h-32 outline-none focus:border-red-600 transition-all" value={videoPrompt} onChange={e => setVideoPrompt(e.target.value)} />
                   <button onClick={handleGenerateVideo} disabled={isGeneratingVideo} className="w-full bg-red-600 text-white py-6 rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-xl disabled:opacity-50">
                      {isGeneratingVideo ? videoProgress : 'ভিডিও তৈরি করুন'}
                   </button>
                   {generatedVideoUrl && <video src={generatedVideoUrl} controls className="w-full rounded-3xl border border-white/10" />}
                   <p className="mt-2 text-[8px] text-slate-600 italic text-center">
                     Please select a paid API key for Veo. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-red-500 underline">Billing Documentation</a>
                   </p>
                </div>

                <div className="bg-slate-900/40 p-10 rounded-[60px] border border-white/5 space-y-8 flex flex-col">
                   <div className="flex justify-between items-center">
                      <div className="w-14 h-14 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">📻</div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">VOICE ENGINE</span>
                   </div>
                   <h3 className="text-2xl font-black uppercase italic text-white leading-none">রেডিও অ্যাড (ভয়েস)</h3>
                   <textarea className="w-full bg-slate-950 border border-white/5 p-6 rounded-3xl text-xs font-bold text-slate-400 h-32 outline-none focus:border-blue-600 transition-all" value={voicePrompt} onChange={e => setVoicePrompt(e.target.value)} />
                   <button onClick={handleGenerateVoice} disabled={isGeneratingVoice} className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-xl disabled:opacity-50">
                      {isGeneratingVoice ? 'ভয়েস জেনারেট হচ্ছে...' : 'ভয়েস অ্যাড তৈরি করুন'}
                   </button>
                   {generatedAudioBlob && <button onClick={playGeneratedVoice} className="w-full bg-white text-slate-950 py-4 rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-3">▶️ প্লে করুন</button>}
                </div>

                <div className="bg-slate-900/40 p-10 rounded-[60px] border border-white/5 space-y-8 flex flex-col">
                   <div className="flex justify-between items-center">
                      <div className="w-14 h-14 bg-purple-600/10 text-purple-600 rounded-2xl flex items-center justify-center text-2xl">🖼️</div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">IMAGE ENGINE</span>
                   </div>
                   <h3 className="text-2xl font-black uppercase italic text-white leading-none">মার্কেটিং ব্যানার</h3>
                   <textarea className="w-full bg-slate-950 border border-white/5 p-6 rounded-3xl text-xs font-bold text-slate-400 h-32 outline-none focus:border-purple-600 transition-all" value={posterPrompt} onChange={e => setPosterPrompt(e.target.value)} />
                   <button onClick={handleGeneratePoster} disabled={isGeneratingPoster} className="w-full bg-purple-600 text-white py-6 rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-xl disabled:opacity-50">
                      {isGeneratingPoster ? 'ব্যানার তৈরি হচ্ছে...' : 'ব্যানার জেনারেট করুন'}
                   </button>
                   {generatedPoster && <img src={generatedPoster} className="w-full rounded-3xl border border-white/10 shadow-2xl" alt="Marketing Poster" />}
                </div>
             </div>
          </div>
        )}

        {/* SETTINGS TAB WITH LAUNCH GUIDE */}
        {activeTab === 'settings' && (
           <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in">
              <div className="bg-gradient-to-br from-slate-900 to-red-950/20 p-10 rounded-[50px] border border-red-600/10 space-y-8 relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/5 blur-[60px] -z-10"></div>
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center text-3xl font-black">🚀</div>
                    <div>
                       <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter">অ্যাপ লঞ্চ গাইড</h2>
                       <p className="text-[10px] font-black uppercase text-red-600 tracking-widest">কিভাবে ফোনে ইনস্টল করবেন</p>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="p-6 bg-slate-950/50 rounded-3xl border border-white/5">
                       <h4 className="text-white text-sm font-black mb-2 italic">১. হোস্টিং করুন (Host Online)</h4>
                       <p className="text-xs text-slate-400 leading-relaxed italic">ফোনে অ্যাপ হিসেবে চালানোর জন্য এটি একটি সিকিউর সার্ভারে থাকতে হবে। আপনি **Vercel** বা **Netlify** ব্যবহার করে ফ্রিতে এটি পাবলিশ করতে পারেন।</p>
                    </div>
                    <div className="p-6 bg-slate-950/50 rounded-3xl border border-white/5">
                       <h4 className="text-white text-sm font-black mb-2 italic">২. সিকিউর লিঙ্ক (HTTPS)</h4>
                       <p className="text-xs text-slate-400 leading-relaxed italic">হোস্ট করার পর আপনি একটি লিঙ্ক পাবেন (যেমন: `shahjahan.vercel.app`)। এই লিঙ্কটি ফোনে ওপেন করলে ব্রাউজার "Install App" অপশন দেবে।</p>
                    </div>
                    <div className="p-6 bg-slate-950/50 rounded-3xl border border-white/5">
                       <h4 className="text-white text-sm font-black mb-2 italic">৩. ফোনে সেভ করা</h4>
                       <p className="text-xs text-slate-400 leading-relaxed italic">ক্রোম ব্রাউজারের ডানপাশের 'তিনটি ডট' থেকে **Add to Home Screen** এ ক্লিক করলেই এটি আপনার ফোনের ডেস্কটপে চলে আসবে।</p>
                    </div>
                 </div>
                 
                 <div className="pt-4">
                    <p className="text-[10px] font-bold text-slate-500 italic text-center">** ব্রাউজারে সাইটটি অফলাইনে চললেও ইনস্টল করতে হোস্টিং বাধ্যতামূলক। **</p>
                 </div>
              </div>

              <div className="bg-slate-900/40 p-10 rounded-[50px] border border-white/5 space-y-8">
                 <h2 className="text-3xl font-black uppercase italic text-white">প্যানেল সেটিং</h2>
                 <button onClick={async () => await window.aistudio?.openSelectKey()} className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase text-[10px] tracking-widest">API কী পরিবর্তন করুন</button>
                 <button onClick={() => window.location.reload()} className="w-full bg-slate-800 text-white py-6 rounded-2xl font-black uppercase text-[10px] tracking-widest">রিস্টার্ট সিস্টেম</button>
                 <button onClick={() => setIsAuthenticated(false)} className="w-full bg-red-600/10 text-red-500 py-6 rounded-2xl font-black uppercase text-[10px] border border-red-600/20 tracking-widest">লগ আউট</button>
              </div>
           </div>
        )}

      </main>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-[700px] bg-slate-900/80 backdrop-blur-3xl border border-white/10 px-6 py-5 flex justify-around items-center z-[200] rounded-[40px] shadow-2xl">
        {[
          { id: 'overview', icon: '📊', label: 'হোম' },
          { id: 'inventory', icon: '📦', label: 'স্টক' },
          { id: 'accounts', icon: '🧾', label: 'হিসাব' },
          { id: 'marketing', icon: '🎨', label: 'প্রচার' },
          { id: 'settings', icon: '⚙️', label: 'সেটিং' }
        ].map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id as any)} className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === item.id ? 'text-white' : 'text-slate-500'}`}>
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
        <button onClick={startLiveAssistant} className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-3xl transition-all -translate-y-10 border-4 border-[#060B18] ${isLiveActive ? 'bg-white animate-pulse text-red-600' : 'bg-red-600 text-white shadow-red-600/40'}`}>
           {isLiveActive ? '⏹️' : '🎙️'}
        </button>
      </nav>

    </div>
  );
};

export default AdminDashboard;
