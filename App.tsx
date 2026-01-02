
import React, { useState, useEffect } from 'react';
import { Product, ViewState, BlogPost } from './types';
import { PRODUCTS, BRANDS_DATA, INITIAL_BLOG_POSTS } from './data';
import Icon from './components/Icon';
import { searchProductsWithAI, getIndustryNews, AISearchResult } from './services/geminiService';

const CONTACT_INFO = {
  name: "Cristiane",
  phone: "(35) 9 8424-8711",
  whatsappNumber: "5535984248711",
  whatsappUrl: "https://wa.me/5535984248711",
  whatsappWelcomeMsg: "Olá! Seja bem-vindo à Infinity Soluções Têxteis Representações Comerciais. Por favor, escolha uma de nossas representadas para falar com Cristiane:\n\n1. Pollibox Ecoadesivos\n2. Espugum - Ortholite Brasil\n3. Raima Têxtil\n4. Cordex Têxtil\n5. Solados SJB\n6. Totalmaq Máquinas\n7. Dayuse Embalagens\n\nDigite o número correspondente:",
  email: "CRISTIANECALZAVARAREP@GMAIL.COM",
  location: "Franca - SP"
};

const Logo = ({ small = false }: { small?: boolean }) => (
  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.reload()}>
    <div className="relative">
      <svg 
        viewBox="0 0 24 24" 
        className="animate-spin-slow"
        style={{ width: small ? 40 : 52, height: small ? 40 : 52 }}
      >
        <path fill="#1B345B" d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.5l-2.83 2.83l-2.83-2.83c-.97-.94-2.33-1.5-3.77-1.5c-2.98 0-5.4 2.42-5.4 5.4s2.42 5.4 5.4 5.4c1.44 0 2.8-.56 3.77-1.5l2.83-2.83l2.83 2.83c.97.94 2.33 1.5 3.77 1.5c2.98 0 5.4-2.42 5.4-5.4s-2.42-5.4-5.4-5.4zm-13.2 8.4c-1.65 0-3-1.35-3-3s1.35-3 3-3c.83 0 1.58.34 2.12.88l2.88 2.88l-2.88 2.88c-.54.54-1.29.88-2.12.88zm13.2 0c-.83 0-1.58-.34-2.12-.88l-2.88-2.88l2.88-2.88c.54-.54 1.29-.88 2.12-.88c1.65 0 3 1.35 3 3s-1.35 3-3 3z"/>
        <path fill="#F7B718" d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.5l-2.83 2.83l2.83 2.83c.97.94 2.33 1.5 3.77 1.5c2.98 0 5.4-2.42 5.4-5.4s-2.42-5.4-5.4-5.4zm3 5.4c0 1.65-1.35 3-3 3c-.83 0-1.58-.34-2.12-.88l-2.88-2.88l2.88-2.88c.54-.54 1.29-.88 2.12-.88c1.65 0 3 1.35 3 3z"/>
      </svg>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-2xl font-black text-[#1B345B] tracking-tighter uppercase">INFINITY</span>
      <span className="text-[8px] font-black text-[#F7B718] tracking-[0.1em] uppercase">SOLUÇÕES TÊXTEIS</span>
    </div>
  </div>
);

const RotatingBanner: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (posts.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [posts.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden bg-[#1B345B]">
      {posts.map((post, index) => (
        <div 
          key={post.id}
          className={`absolute inset-0 transition-all duration-1000 flex items-center ${index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        >
          <img src={post.image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B345B] to-transparent" />
          <div className="relative z-10 container mx-auto px-6 md:px-20">
            <span className="bg-[#F7B718] text-[#1B345B] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">Tendência 2026</span>
            <h2 className="text-white text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-none max-w-4xl">{post.title}</h2>
            <p className="text-white/80 text-lg italic max-w-xl border-l-4 border-[#F7B718] pl-6">{post.excerpt}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {posts.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all ${i === current ? 'w-10 bg-[#F7B718]' : 'w-2 bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('catalog');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    getIndustryNews().then(news => news.length && setBlogPosts(news));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setAiLoading(true);
    const result = await searchProductsWithAI(searchQuery, PRODUCTS);
    setAiResult(result);
    setAiLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full h-24 bg-white shadow-xl z-50 flex items-center justify-between px-6 md:px-12 border-b-4 border-[#F7B718]">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => setCurrentView('catalog')} className="text-[10px] font-black uppercase tracking-widest text-[#1B345B]">Catálogo</button>
          <button onClick={() => setCurrentView('contact')} className="text-[10px] font-black uppercase tracking-widest text-[#1B345B]">Contato</button>
          <a href={CONTACT_INFO.whatsappUrl} className="bg-[#1B345B] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all">
            WhatsApp <Icon name="MessageCircle" size={16} className="text-[#F7B718]" />
          </a>
        </nav>
      </header>
      
      <div className="h-24" />

      {currentView === 'catalog' && (
        <main>
          <RotatingBanner posts={blogPosts} />
          
          <section className="py-20 px-6 max-w-7xl mx-auto text-center">
            <h1 className="text-[#1B345B] text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">Infinity <span className="text-[#F7B718]">IA</span></h1>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mb-20">
              <input 
                className="w-full p-6 bg-slate-100 rounded-2xl outline-none font-bold text-[#1B345B] border-2 border-transparent focus:border-[#F7B718] transition-all"
                placeholder="Busque por soluções técnicas..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-3 bg-[#1B345B] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">
                {aiLoading ? '...' : 'Consultar'}
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
              {BRANDS_DATA.map(brand => (
                <div key={brand.id} className="p-10 bg-white rounded-[3rem] border-2 border-slate-50 shadow-xl hover:-translate-y-2 transition-all">
                  <div className="w-12 h-2 bg-[#F7B718] mb-6 rounded-full" style={{ backgroundColor: brand.color }}></div>
                  <h3 className="text-2xl font-black text-[#1B345B] uppercase tracking-tighter mb-4">{brand.name}</h3>
                  <p className="text-slate-500 font-medium mb-8 leading-relaxed italic">"{brand.description}"</p>
                  <a href={CONTACT_INFO.whatsappUrl} className="text-[#1B345B] font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                    Consultar Orçamento <Icon name="ArrowRight" size={14} className="text-[#F7B718]" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {currentView === 'contact' && (
        <section className="flex-grow py-20 px-6 max-w-4xl mx-auto text-center">
           <h2 className="text-5xl font-black text-[#1B345B] uppercase tracking-tighter mb-12">Atendimento Direto</h2>
           <div className="bg-[#1B345B] text-white p-12 rounded-[4rem] shadow-2xl">
              <p className="text-[#F7B718] font-black uppercase tracking-[0.3em] mb-4">Cristiane Calzavara</p>
              <p className="text-3xl font-black mb-10">{CONTACT_INFO.phone}</p>
              <a href={CONTACT_INFO.whatsappUrl} className="bg-[#F7B718] text-[#1B345B] px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest inline-block hover:scale-105 transition-all">
                Iniciar Conversa no WhatsApp
              </a>
           </div>
        </section>
      )}

      <footer className="bg-white border-t-2 border-[#F7B718] py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo small />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2026 Infinity Soluções Têxteis - Franca/SP</p>
      </footer>
    </div>
  );
};

export default App;
