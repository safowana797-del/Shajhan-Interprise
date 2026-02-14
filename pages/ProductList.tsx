
import React from 'react';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  const products = [
    {
      id: 'p1',
      brand: 'Premier Cement',
      type: 'PCC (Puzzolana Portland Cement)',
      price: '৳ ৫৬৫',
      unit: 'বস্তা',
      desc: 'নির্মাণে দীর্ঘস্থায়ী শক্তির নিশ্চয়তা। উপকূলীয় লোনা আবহাওয়ার জন্য সবচেয়ে কার্যকর।',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p2',
      brand: 'BSRM Steel',
      type: '500W TMT Bar',
      price: '৳ ৯৮,৫০০',
      unit: 'টন',
      desc: 'বিশ্বমানের রড, যা আপনার দালানকে দেয় সর্বোচ্চ ভূমিকম্প প্রতিরোধ ক্ষমতা।',
      image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'p3',
      brand: 'AKS Steel',
      type: 'TMT 500W',
      price: '৳ ৯৬,০০০',
      unit: 'টন',
      desc: 'মজবুত বাঁধন এবং সাশ্রয়ী মূল্যে সেরা মানের রড।',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-40 font-['Noto_Sans_Bengali']">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 space-y-4 text-center">
           <p className="text-red-600 text-xs font-black uppercase tracking-[0.3em]">Authorized Inventory</p>
           <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-slate-950">আমাদের <span className="text-slate-300">প্রডাক্টসমূহ</span></h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl group hover:shadow-2xl transition-all duration-500">
              <div className="h-64 overflow-hidden relative">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.brand} />
                <div className="absolute top-6 right-6 bg-red-600 text-white px-6 py-2 rounded-full font-black text-xs shadow-lg">
                  {p.price} / {p.unit}
                </div>
              </div>
              <div className="p-10 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black italic text-slate-950">{p.brand}</h3>
                  <p className="text-[10px] font-black uppercase text-red-600 tracking-widest">{p.type}</p>
                </div>
                <p className="text-sm text-slate-500 font-bold leading-relaxed italic">{p.desc}</p>
                <Link 
                  to="/contact" 
                  className="block w-full text-center bg-slate-950 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 transition-all shadow-xl"
                >
                  অর্ডার করুন ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
