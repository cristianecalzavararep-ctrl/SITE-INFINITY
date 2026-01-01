
import React, { useState, useMemo, useEffect } from 'react';
import { Product, ViewState, Lead, BlogPost } from './types';
import { PRODUCTS, BRANDS_DATA } from './data';
import Icon from './components/Icon';
import { searchProductsWithAI, getIndustryNews, AISearchResult } from './services/geminiService';

const CONTACT_INFO = {
  name: "Cristiane",
  phone: "(35) 9 8424-8711",
  whatsappUrl: "https://wa.me/5535984248711",
  whatsappWelcomeMsg: "Olá! Seja bem-vindo à Infinity Soluções Têxteis Representações Comerciais. Por favor, escolha uma de nossas representadas para falar com a Cristiane:\n\n1. Pollibox Ecoadesivos\n2. Espugum - Ortholite Brasil\n3. Raima Têxtil\n4. Cordex Têxtil\n5. Solados SJB\n6. Totalmaq Máquinas\n7. Dayuse Embalagens\n\nDigite o número correspondente:",
  email: "CRISTIANECALZAVARAREP@GMAIL.COM",
  location: "Franca - SP"
};

const RotatingBanner: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (posts.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [posts.length]);

  if (posts.length === 0) return (
    <div className="w-full h-[400px] bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin text-[#F7B718]"><Icon name="RotateCw" size={32} /></div>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Conectando com o Setor Calçadista...</p>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[450px] md:h-[650px] overflow-hidden bg-black">
      {posts.map((post, index) => (
        <div 
          key={post.id || index}
          className={`absolute inset-0 transition-all duration-1000 flex items-center ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
        >
          <img src={post.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="relative z-20 container mx-auto px-6 md:px-12 text-left max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#F7B718] text-black text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-2xl">Panorama Setorial</span>
              <span className="text-white font-black text-xs uppercase tracking-widest border-l border-[#F7B718] pl-4">{post.brand}</span>
            </div>
            <h2 className="text-white text-4xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter uppercase drop-shadow-2xl">{post.title}</h2>
            <div className="max-w-2xl bg-white/5 backdrop-blur-md border-l-8 border-[#F7B718] p-8 rounded-r-3xl mb-10">
               <p className="text-slate-100 text-sm md:text-xl font-medium leading-relaxed italic">"{post.excerpt}"</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const news = await getIndustryNews();
    setBlogPosts(news);
  };

  const handleAISearch = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || searchQuery;
    if (!query.trim()) return;
    setAiLoading(true);
    const result = await searchProductsWithAI(query, PRODUCTS as any);
    setAiResult(result);
    setAiLoading(false);
  };

  const Logo = ({ light = false, small = false }: { light?: boolean; small?: boolean }) => (
    <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { setCurrentView('catalog'); setAiResult(null); }}>
      <Icon name="Infinity" className="text-[#F7B718]" size={light ? 48 : (small ? 56 : 64)} />
      <div className="flex flex-col leading-tight">
        <span className={`${small ? 'text-2xl' : 'text-3xl md:text-4xl'} font-black tracking-tighter uppercase ${light ? 'text-white' : 'text-[#1B345B]'}`}>INFINITY</span>
        <div className="flex flex-col -mt-1">
          <span className="text-[10px] md:text-[12px] font-black text-[#EAB308] tracking-[0.1em] uppercase">SOLUÇÕES TÊXTEIS</span>
          <span className={`text-[8px] md:text-[9px] font-bold tracking-[0.05em] uppercase ${light ? 'text-white/40' : 'text-slate-400'}`}>REPRESENTAÇÕES COMERCIAIS</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#F7B718] selection:text-black flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-32 flex items-center px-6 md:px-12 justify-between border-b-2 border-[#F7B718]">
        <Logo />
        <nav className="hidden lg:flex items-center gap-10">
          <button onClick={() => { setCurrentView('catalog'); setAiResult(null); }} className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1B345B] hover:text-[#F7B718] transition-colors">Home</button>
          <button onClick={() => setCurrentView('contact')} className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1B345B] hover:text-[#F7B718] transition-colors">Contato</button>
          <a href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(CONTACT_INFO.whatsappWelcomeMsg)}`} target="_blank" rel="noopener noreferrer" className="bg-[#1B345B] text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-black transition-all">
            <Icon name="Infinity" size={18} /> WhatsApp
          </a>
        </nav>
      </header>

      <div className="h-32" />

      <main className="flex-grow">
        {currentView === 'catalog' && (
          <>
            <RotatingBanner posts={blogPosts.slice(0, 5)} />
            
            <section className="bg-white py-16 px-6 border-b border-slate-100">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-[#1B345B] text-3xl md:text-4xl font-black mb-8 uppercase tracking-tighter">Consultoria <span className="text-[#F7B718]">Infinity</span></h1>
                <form onSubmit={handleAISearch} className="relative shadow-xl rounded-full overflow-hidden flex items-center bg-slate-50 border border-slate-200 focus-within:border-[#F7B718] transition-all max-w-2xl mx-auto">
                  <input 
                    className="w-full pl-14 pr-40 py-5 bg-transparent border-none text-slate-800 font-bold outline-none text-sm"
                    placeholder="Busque por soluções técnicas para sua fábrica..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Icon name="Search" className="absolute left-5 text-slate-300" size={22} />
                  <button type="submit" className="absolute right-2 bg-[#1B345B] text-white px-8 py-2.5 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-black transition-colors">
                    {aiLoading ? '...' : 'Consultar'}
                  </button>
                </form>
                {aiResult && aiResult.message && (
                  <div className="mt-8 p-6 bg-slate-50 rounded-3xl border-l-4 border-[#F7B718] text-left max-w-2xl mx-auto shadow-sm">
                    <p className="text-[#1B345B] font-medium text-xs leading-relaxed italic">"{aiResult.message}"</p>
                  </div>
                )}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-24">
              <div className="flex flex-col items-center mb-20 text-center">
                <div className="w-12 h-1 bg-[#F7B718] mb-6 rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#1B345B]">Representadas</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BRANDS_DATA.map(brand => (
                  <div key={brand.id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:border-[#F7B718] transition-all shadow-sm hover:shadow-lg flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-2 h-10 rounded-full" style={{ backgroundColor: brand.color }}></div>
                      <h3 className="text-xl font-black text-[#1B345B] uppercase leading-tight tracking-tight">{brand.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500 font-medium mb-10 flex-1 italic leading-relaxed">"{brand.description}"</p>
                    <a 
                      href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent("Olá Cristiane! Gostaria de mais informações sobre a " + brand.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-slate-50 text-[#1B345B] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#F7B718] hover:text-black transition-all border border-slate-100"
                    >
                      Mais Informações <Icon name="Infinity" size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {currentView === 'contact' && (
          <section className="max-w-3xl mx-auto px-6 py-20">
             <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col border border-slate-100 text-center p-12">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Phone" className="text-[#F7B718]" size={24} />
                </div>
                <h2 className="text-xl font-black text-[#1B345B] mb-3 uppercase tracking-tighter">Atendimento Cristiane</h2>
                <p className="text-slate-400 mb-8 text-xs uppercase tracking-widest">Infinity Soluções Têxteis Representações Comerciais</p>
                <a 
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(CONTACT_INFO.whatsappWelcomeMsg)}`} 
                  className="bg-[#1B345B] text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-black transition-all mx-auto w-fit"
                >
                  <Icon name="Infinity" size={18} /> Menu Digital de Opções
                </a>
             </div>
          </section>
        )}
      </main>

      <a 
        href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(CONTACT_INFO.whatsappWelcomeMsg)}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all border-2 border-white/20"
      >
        <Icon name="Infinity" size={28} />
      </a>

      {/* Footer Premium e Elitizado - Sem Links nos Dados de Contato e Sem Lista de Representadas */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 px-8 relative mt-auto border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
          <div className="max-w-md">
            <Logo light small />
            <p className="mt-6 text-slate-500 text-sm font-medium leading-relaxed italic opacity-60">
              Infinity Soluções Têxteis Representações Comerciais. Parceria estratégica para o setor calçadista com as melhores marcas do mercado mundial.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-2 text-left md:text-right">
             <span className="text-[10px] font-black text-[#F7B718] uppercase tracking-[0.4em] mb-4">Contato Oficial</span>
             <div className="space-y-1">
               <p className="text-2xl font-black tracking-tighter text-white/90">Cristiane</p>
               <p className="text-lg font-black tracking-tight text-white/70">{CONTACT_INFO.phone}</p>
               <p className="text-sm font-bold text-slate-500 lowercase tracking-wide">{CONTACT_INFO.email}</p>
             </div>
             <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mt-8 flex items-center gap-2 md:justify-end">
               <Icon name="MapPin" size={14} className="text-[#F7B718]" /> {CONTACT_INFO.location}
             </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center">
          <p className="text-[9px] font-black uppercase tracking-[1em] text-slate-800">
            INFINITY SOLUÇÕES TÊXTEIS REPRESENTAÇÕES COMERCIAIS © 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
