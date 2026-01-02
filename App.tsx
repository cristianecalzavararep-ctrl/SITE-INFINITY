
import React, { useState, useEffect } from 'react';
import { Product, ViewState, BlogPost } from './types';
import { PRODUCTS, BRANDS_DATA } from './data';
import Icon from './components/Icon';
import { searchProductsWithAI, getIndustryNews, AISearchResult } from './services/geminiService';

const CONTACT_INFO = {
  name: "Cristiane",
  phone: "(35) 9 8424-8711",
  whatsappNumber: "5535984248711",
  whatsappUrl: "https://wa.me/5535984248711",
  whatsappWelcomeMsg: "Olá! Seja bem-vindo à Infinity Soluções Têxteis Representações Comerciais.",
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
    <div className="w-full h-[300px] bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin text-[#F7B718]"><Icon name="RotateCw" size={32} /></div>
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Conectando com o Setor Calçadista...</p>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] md:h-[550px] overflow-hidden bg-black">
      {posts.map((post, index) => (
        <div 
          key={post.id || index}
          className={`absolute inset-0 transition-all duration-1000 flex items-center ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
        >
          <img src={post.image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="relative z-20 container mx-auto px-4 sm:px-8 md:px-12 text-left max-w-5xl py-8">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="bg-[#F7B718] text-black text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-[0.15em] shadow-xl">Panorama Setorial</span>
              <span className="text-white font-black text-[9px] sm:text-[10px] uppercase tracking-widest border-l border-[#F7B718] pl-3">{post.brand}</span>
            </div>
            <h2 className="text-white text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-[1.1] tracking-tighter uppercase drop-shadow-2xl break-words max-w-full">
              {post.title}
            </h2>
            <div className="max-w-xl bg-white/5 backdrop-blur-md border-l-4 border-[#F7B718] p-4 sm:p-6 rounded-r-2xl">
               <p className="text-slate-100 text-[11px] sm:text-sm md:text-lg font-medium leading-relaxed italic line-clamp-3 sm:line-clamp-none">
                 "{post.excerpt}"
               </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*SOLICITAÇÃO DE ATENDIMENTO - INFINITY*\n\n*Nome:* ${formData.nome}\n*E-mail:* ${formData.email}\n*Telefone:* ${formData.telefone}\n\n*Dúvida/Não encontrou:* \n${formData.mensagem}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 p-8 md:p-12 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-[#F7B718]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="MessageSquare" className="text-[#F7B718]" size={32} />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-[#1B345B] uppercase tracking-tighter">Atendimento</h2>
        <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-2">Infinity Soluções Têxteis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <Icon name="User" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F7B718] transition-colors" size={18} />
          <input
            required
            type="text"
            placeholder="Seu Nome Completo"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#F7B718] focus:bg-white outline-none font-bold text-slate-700 text-sm transition-all"
            value={formData.nome}
            onChange={e => setFormData({...formData, nome: e.target.value})}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <Icon name="Mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F7B718] transition-colors" size={18} />
            <input
              required
              type="email"
              placeholder="E-mail profissional"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#F7B718] focus:bg-white outline-none font-bold text-slate-700 text-sm transition-all"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="relative group">
            <Icon name="Phone" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F7B718] transition-colors" size={18} />
            <input
              required
              type="tel"
              placeholder="WhatsApp / Telefone"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#F7B718] focus:bg-white outline-none font-bold text-slate-700 text-sm transition-all"
              value={formData.telefone}
              onChange={e => setFormData({...formData, telefone: e.target.value})}
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-[10px] font-black text-[#1B345B] uppercase tracking-widest mb-3 ml-1">Não encontrou o que procurava?</label>
          <textarea
            required
            placeholder="Descreva aqui o produto ou solução que sua empresa necessita..."
            rows={4}
            className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-[#F7B718] focus:bg-white outline-none font-bold text-slate-700 text-sm transition-all resize-none shadow-inner"
            value={formData.mensagem}
            onChange={e => setFormData({...formData, mensagem: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-[#1B345B] hover:bg-black text-white py-5 rounded-2xl font-black text-[11px] md:text-[12px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 transition-all shadow-xl hover:shadow-[#1B345B]/30 transform active:scale-[0.98]"
        >
          <Icon name="Send" size={20} /> Enviar Solicitação
        </button>
      </form>
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
    <div className="flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={() => { setCurrentView('catalog'); setAiResult(null); }}>
      <Icon name="Infinity" className={`text-[#F7B718] animate-spin-slow`} size={light ? 40 : (small ? 48 : 56)} />
      <div className="flex flex-col leading-tight">
        <span className={`${small ? 'text-xl' : 'text-2xl md:text-4xl'} font-black tracking-tighter uppercase ${light ? 'text-white' : 'text-[#1B345B]'}`}>INFINITY</span>
        <div className="flex flex-col -mt-1">
          <span className="text-[8px] md:text-[12px] font-black text-[#EAB308] tracking-[0.1em] uppercase">SOLUÇÕES TÊXTEIS</span>
          <span className={`text-[7px] md:text-[9px] font-bold tracking-[0.05em] uppercase ${light ? 'text-white/40' : 'text-slate-400'}`}>REPRESENTAÇÕES COMERCIAIS</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-[#F7B718] selection:text-black flex flex-col overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-24 md:h-32 flex items-center px-4 md:px-12 justify-between border-b-2 border-[#F7B718]">
        <Logo small />
        <nav className="hidden lg:flex items-center gap-10">
          <button onClick={() => { setCurrentView('catalog'); setAiResult(null); }} className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1B345B] hover:text-[#F7B718] transition-colors">Home</button>
          <button onClick={() => setCurrentView('contact')} className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1B345B] hover:text-[#F7B718] transition-colors">Contato</button>
          <a href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(CONTACT_INFO.whatsappWelcomeMsg)}`} target="_blank" rel="noopener noreferrer" className="bg-[#1B345B] text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-black transition-all">
            <Icon name="Infinity" size={18} className="animate-spin-slow" /> WhatsApp
          </a>
        </nav>
        <div className="lg:hidden">
          <button onClick={() => setCurrentView('contact')} className="text-[#1B345B] p-2" aria-label="Atendimento">
            <Icon name="MoreVertical" size={24} />
          </button>
        </div>
      </header>

      <div className="h-24 md:h-32" />

      <main className="flex-grow">
        {currentView === 'catalog' && (
          <>
            <RotatingBanner posts={blogPosts} />
            
            <section className="bg-white py-12 md:py-20 px-6 border-b border-slate-100">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-[#1B345B] text-2xl md:text-4xl font-black mb-8 uppercase tracking-tighter">
                  Infinity <span className="text-[#F7B718]">IA</span>
                </h1>
                <form onSubmit={handleAISearch} className="relative shadow-2xl rounded-full overflow-hidden flex items-center bg-slate-50 border border-slate-200 focus-within:border-[#F7B718] transition-all max-w-2xl mx-auto transform hover:scale-[1.01]">
                  <input 
                    className="w-full pl-12 md:pl-16 pr-32 md:pr-44 py-5 md:py-6 bg-transparent border-none text-slate-800 font-bold outline-none text-sm"
                    placeholder="Busque por soluções técnicas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Icon name="Search" className="absolute left-5 md:left-6 text-slate-300" size={20} />
                  <button type="submit" className="absolute right-2 md:right-3 bg-[#1B345B] text-white px-6 md:px-10 py-3 md:py-3.5 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-black transition-colors">
                    {aiLoading ? 'Processando...' : 'Consultar'}
                  </button>
                </form>
                {aiResult && aiResult.message && (
                  <div className="mt-10 p-6 md:p-8 bg-slate-50 rounded-3xl border-l-8 border-[#F7B718] text-left max-w-2xl mx-auto shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-3 mb-3">
                       <Icon name="Infinity" size={20} className="text-[#F7B718] animate-spin-slow" />
                       <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Consultoria IA</span>
                    </div>
                    <p className="text-[#1B345B] font-bold text-sm md:text-base leading-relaxed italic">"{aiResult.message}"</p>
                  </div>
                )}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
              <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
                <div className="w-12 h-1.5 bg-[#F7B718] mb-6 rounded-full"></div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#1B345B]">Nossas Representadas</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {BRANDS_DATA.map(brand => (
                  <div key={brand.id} className="group bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 hover:border-[#F7B718] transition-all shadow-sm hover:shadow-2xl flex flex-col h-full transform hover:-translate-y-2">
                    <div className="flex items-center gap-5 mb-8 md:mb-10">
                      <div className="w-2.5 h-10 md:h-12 rounded-full" style={{ backgroundColor: brand.color }}></div>
                      <h3 className="text-xl md:text-2xl font-black text-[#1B345B] uppercase leading-tight tracking-tight group-hover:text-[#F7B718] transition-colors">{brand.name}</h3>
                    </div>
                    <p className="text-sm md:text-base text-slate-500 font-medium mb-10 md:mb-14 flex-1 italic leading-relaxed">"{brand.description}"</p>
                    <a 
                      href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent("Olá! Gostaria de mais informações sobre as soluções da " + brand.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-4 bg-slate-50 text-[#1B345B] py-4 md:py-5 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] hover:bg-[#F7B718] hover:text-black transition-all border border-slate-100 group-hover:border-transparent"
                    >
                      Fale com o Representante <Icon name="Infinity" size={16} className="group-hover:animate-spin-medium" />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {currentView === 'contact' && (
          <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
             <div className="flex flex-col items-center mb-12 text-center lg:hidden">
               <button onClick={() => setCurrentView('catalog')} className="text-[10px] font-black uppercase tracking-widest text-[#1B345B] flex items-center gap-2 mb-8">
                 <Icon name="ArrowLeft" size={14} /> Voltar para o Início
               </button>
             </div>
             <ContactForm />
          </section>
        )}
      </main>

      {/* Botão WhatsApp Flutuante - Ícone ESTÁTICO (sem animate-spin) */}
      <a 
        href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(CONTACT_INFO.whatsappWelcomeMsg)}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[1000] w-14 h-14 md:w-20 md:h-20 bg-green-600 text-white rounded-full md:rounded-3xl flex items-center justify-center shadow-[0_15px_45px_rgba(22,163,74,0.4)] hover:scale-110 active:scale-95 transition-all border-2 border-white/20 group overflow-hidden"
        aria-label="WhatsApp"
      >
        <Icon name="Infinity" size={32} />
      </a>

      <footer className="bg-slate-950 text-white pt-20 md:pt-32 pb-12 px-6 md:px-12 relative mt-auto border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-20 md:mb-24">
          <div className="max-w-md">
            <Logo light />
            <p className="mt-8 text-slate-500 text-sm md:text-base font-medium leading-relaxed italic opacity-70">
              Infinity Soluções Têxteis Representações Comerciais. Fornecendo os componentes e máquinas mais tecnológicos para a indústria calçadista global.
            </p>
          </div>
          
          <div className="flex flex-col lg:items-end gap-2 text-left lg:text-right">
             <span className="text-[10px] font-black text-[#F7B718] uppercase tracking-[0.4em] mb-6">Central de Atendimento</span>
             <div className="space-y-3">
               <p className="text-2xl md:text-4xl font-black tracking-tighter text-white/95">Cristiane Calzavara</p>
               <p className="text-xl md:text-2xl font-black tracking-tight text-[#F7B718]">{CONTACT_INFO.phone}</p>
               <p className="text-sm font-bold text-slate-500 lowercase tracking-wide">{CONTACT_INFO.email}</p>
             </div>
             <p className="text-[10px] md:text-[12px] font-black text-white/40 uppercase tracking-[0.3em] mt-10 flex items-center gap-3 lg:justify-end">
               <Icon name="MapPin" size={14} className="text-[#F7B718]" /> {CONTACT_INFO.location}
             </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-700">
            INFINITY SOLUÇÕES TÊXTEIS © 2024
          </p>
          <div className="flex gap-8">
             <button onClick={() => setCurrentView('catalog')} className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Home</button>
             <button onClick={() => setCurrentView('contact')} className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Contato</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
