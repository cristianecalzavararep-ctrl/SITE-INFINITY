
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
  whatsappWelcomeMsg: "Olá! Seja bem-vindo à Infinity Soluções Têxteis Representações Comerciais. Por favor, escolha uma de nossas representadas para falar com Cristiane:\n\n1. Pollibox Ecoadesivos\n2. Espugum - Ortholite Brasil\n3. Raima Têxtil\n4. Cordex Têxtil\n5. Solados SJB\n6. Totalmaq Máquinas\n7. Dayuse Embalagens\n\nDigite o número correspondente:",
  email: "CRISTIANECALZAVARAREP@GMAIL.COM",
  location: "Franca - SP"
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: BRANDS_DATA[0]?.id || '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border-2 border-[#F7B718] text-center shadow-2xl animate-in zoom-in duration-500">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="CheckCircle" size={32} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-black text-[#1B345B] uppercase tracking-tighter mb-4">Mensagem Enviada!</h3>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-10 max-w-[220px] mx-auto">
          Agradecemos o contato. A Cristiane Calzavara retornará sua solicitação em breve.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-[#1B345B] text-white px-10 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl"
        >
          Enviar Nova Mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#F7B718]/5 rounded-bl-full pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Seu Nome</label>
          <input 
            required
            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-xl outline-none font-bold text-[#1B345B] transition-all placeholder:text-slate-300 text-sm"
            placeholder="Nome completo"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">E-mail</label>
          <input 
            required
            type="email"
            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-xl outline-none font-bold text-[#1B345B] transition-all placeholder:text-slate-300 text-sm"
            placeholder="exemplo@empresa.com"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Fábrica / Empresa</label>
          <input 
            required
            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-xl outline-none font-bold text-[#1B345B] transition-all placeholder:text-slate-300 text-sm"
            placeholder="Nome da sua fábrica"
            value={formData.company}
            onChange={e => setFormData({...formData, company: e.target.value})}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Interesse</label>
          <div className="relative">
            <select 
              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-xl outline-none font-bold text-[#1B345B] transition-all appearance-none cursor-pointer text-sm"
              value={formData.interest}
              onChange={e => setFormData({...formData, interest: e.target.value})}
            >
              {BRANDS_DATA.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Icon name="ChevronDown" size={16} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1B345B] ml-4 leading-tight block">
          Não encontrou o que estava procurando? <span className="text-slate-400 block text-[9px] mt-0.5">Temos parcerias valiosas neste segmento que podemos indicar.</span>
        </label>
        <textarea 
          required
          rows={3}
          className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-xl outline-none font-bold text-[#1B345B] transition-all resize-none placeholder:text-slate-300 text-sm"
          placeholder="Descreva o que você precisa..."
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
        />
      </div>

      <button type="submit" className="w-full bg-[#1B345B] hover:bg-black text-white py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-4">
        Enviar Mensagem <Icon name="Send" size={16} className="text-[#F7B718]" />
      </button>
    </form>
  );
};

const RotatingBanner: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (posts.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [posts.length]);

  if (posts.length === 0) return (
    <div className="w-full h-[350px] bg-[#1B345B] flex items-center justify-center relative overflow-hidden">
      <div className="flex flex-col items-center gap-6 relative z-10">
        <div className="w-12 h-12 border-4 border-white/10 border-t-[#F7B718] rounded-full animate-spin"></div>
        <p className="text-white font-black text-[10px] uppercase tracking-[0.4em]">Sincronizando Visão 2026...</p>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] overflow-hidden bg-black">
      {posts.map((post, index) => (
        <div 
          key={post.id || index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
        >
          <img src={post.image} className="absolute inset-0 w-full h-full object-cover opacity-70" alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          
          <div className="relative z-20 container mx-auto px-6 sm:px-12 md:px-20 text-left max-w-6xl">
            <div className={`flex items-center gap-4 mb-6 transition-all duration-700 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <span className="bg-[#F7B718] text-black text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl">Tendência 2026</span>
              <span className="text-white font-black text-[10px] uppercase tracking-widest border-l-2 border-[#F7B718] pl-4">{post.brand}</span>
            </div>
            <h2 className={`text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-8 leading-[1.05] tracking-tighter uppercase drop-shadow-2xl max-w-4xl transition-all duration-700 delay-500 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {post.title}
            </h2>
            <div className={`max-w-xl bg-white/10 backdrop-blur-xl border-l-4 border-[#F7B718] p-6 rounded-r-3xl shadow-2xl transition-all duration-700 delay-700 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
               <p className="text-slate-100 text-sm sm:text-base md:text-lg font-medium leading-relaxed italic opacity-90">
                 "{post.excerpt}"
               </p>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {posts.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-12 bg-[#F7B718]' : 'w-2 bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const whatsappBrandUrl = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(CONTACT_INFO.whatsappWelcomeMsg)}`;

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const news = await getIndustryNews();
    setBlogPosts(news);
  };

  const handleAISearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setAiLoading(true);
    const result = await searchProductsWithAI(searchQuery, PRODUCTS);
    setAiResult(result);
    setAiLoading(false);
  };

  const Logo = ({ light = false, small = false }: { light?: boolean; small?: boolean }) => (
    <div className="flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={() => { setCurrentView('catalog'); setAiResult(null); window.scrollTo(0,0); }}>
      <div className="relative">
        <Icon name="Infinity" className={`text-[#F7B718] animate-spin-slow relative z-10`} size={light ? 36 : (small ? 40 : 52)} />
        <div className="absolute inset-0 bg-[#F7B718]/20 blur-lg rounded-full group-hover:bg-[#F7B718]/40 transition-all"></div>
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`${small ? 'text-lg' : 'text-2xl md:text-4xl'} font-black tracking-tighter uppercase ${light ? 'text-white' : 'text-[#1B345B]'}`}>INFINITY</span>
        <div className="flex flex-col -mt-0.5">
          <span className="text-[6px] md:text-[9px] font-black text-[#EAB308] tracking-[0.1em] uppercase">SOLUÇÕES TÊXTEIS REPRESENTAÇÕES COMERCIAIS</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] selection:bg-[#F7B718] selection:text-black flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 h-20 md:h-24 flex items-center px-6 md:px-12 justify-between border-b-4 border-[#F7B718]">
        <Logo small />
        <nav className="hidden lg:flex items-center gap-10">
          <button onClick={() => { setCurrentView('catalog'); setAiResult(null); window.scrollTo(0,0); }} className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B345B] hover:text-[#F7B718] transition-all relative group">
            Catálogo
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F7B718] transition-all group-hover:w-full"></span>
          </button>
          <button onClick={() => { setCurrentView('contact'); window.scrollTo(0,0); }} className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B345B] hover:text-[#F7B718] transition-all relative group">
            Atendimento
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F7B718] transition-all group-hover:w-full"></span>
          </button>
          <a href={whatsappBrandUrl} target="_blank" rel="noopener noreferrer" className="bg-[#1B345B] hover:bg-black text-white px-8 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.3em] flex items-center gap-3 transition-all shadow-xl hover:-translate-y-1">
             WhatsApp <Icon name="MessageCircle" size={16} className="text-[#F7B718]" />
          </a>
        </nav>
        <div className="lg:hidden flex items-center gap-3">
           <button onClick={() => setCurrentView('contact')} className="bg-[#1B345B] p-3.5 rounded-xl text-white shadow-lg">
             <Icon name="Mail" size={20} />
           </button>
        </div>
      </header>

      <div className="h-20 md:h-24" />

      <main className="flex-grow">
        {currentView === 'catalog' && (
          <>
            <RotatingBanner posts={blogPosts} />
            
            <section className="bg-white py-16 md:py-24 px-6 border-b border-slate-100 relative overflow-hidden">
              <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-3 bg-[#1B345B]/5 px-6 py-2.5 rounded-full mb-8">
                  <Icon name="Zap" size={14} className="text-[#F7B718]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1B345B]">Consultoria Técnica IA</span>
                </div>
                <h1 className="text-[#1B345B] text-4xl md:text-6xl font-black mb-10 uppercase tracking-tighter leading-none">
                  Infinity <span className="text-[#F7B718]">Inteligência</span>
                </h1>
                <p className="text-slate-400 text-sm md:text-lg font-bold uppercase tracking-[0.2em] mb-12 max-w-2xl mx-auto leading-relaxed">
                  Busque por artigos técnicos ou peça recomendações para sua produção.
                </p>
                <form onSubmit={handleAISearch} className="relative shadow-2xl rounded-[1.5rem] overflow-hidden flex items-center bg-white border-2 border-slate-100 focus-within:border-[#F7B718] transition-all max-w-2xl mx-auto p-2">
                  <input 
                    className="w-full pl-6 pr-32 py-5 bg-transparent border-none text-[#1B345B] font-bold outline-none text-base placeholder:text-slate-300"
                    placeholder="Ex: Qual adesivo Pollibox usar em calçados infantis?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" disabled={aiLoading} className="absolute right-3 bg-[#1B345B] text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all flex items-center gap-3 shadow-lg">
                    {aiLoading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Icon name="Sparkles" size={16} className="text-[#F7B718]" />}
                    {aiLoading ? 'Consultando...' : 'Consultar'}
                  </button>
                </form>

                {aiResult && (
                  <div className="mt-16 p-8 md:p-12 bg-white rounded-[3rem] border-2 border-[#F7B718] text-left max-w-3xl mx-auto shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
                    <div className="absolute -top-5 left-10 bg-[#F7B718] text-black px-6 py-2 rounded-full font-black text-[9px] uppercase tracking-[0.3em] shadow-xl">Análise Técnica Gemini</div>
                    <div className="flex flex-col md:flex-row items-start gap-8">
                       <div className="w-16 h-16 bg-[#1B345B] rounded-2xl items-center justify-center shrink-0 flex shadow-xl shadow-[#1B345B]/20">
                         <Icon name="Infinity" size={32} className="text-[#F7B718] animate-spin-slow" />
                       </div>
                       <div className="space-y-6">
                         <p className="text-[#1B345B] font-bold text-lg md:text-xl leading-relaxed italic opacity-90">
                           "{aiResult.message}"
                         </p>
                         <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-5">
                            <a href={whatsappBrandUrl} className="bg-[#25D366] text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-green-600 transition-all flex items-center gap-3 shadow-lg shadow-green-500/20">
                              Validar com Cristiane <Icon name="MessageCircle" size={16} />
                            </a>
                         </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
              <div className="flex flex-col items-center mb-20 md:mb-28 text-center">
                <div className="w-20 h-2 bg-[#F7B718] mb-8 rounded-full"></div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#1B345B] mb-4 leading-none">Representadas</h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-[13px]">Parceiros estratégicos de alto nível</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
                {BRANDS_DATA.map(brand => (
                  <div 
                    key={brand.id} 
                    className="group bg-white p-10 md:p-12 rounded-[3rem] border-2 border-slate-50 transition-all shadow-xl hover:shadow-2xl flex flex-col h-full transform hover:-translate-y-3"
                    style={{ '--brand-shadow': brand.color } as any}
                  >
                    <div className="flex items-center gap-6 mb-10">
                      <div className="w-3 h-12 rounded-full shadow-lg" style={{ backgroundColor: brand.color }}></div>
                      <h3 className="text-2xl md:text-3xl font-black text-[#1B345B] uppercase leading-[0.9] tracking-tighter group-hover:text-[#F7B718] transition-colors">{brand.name}</h3>
                    </div>
                    <p className="text-base md:text-lg text-slate-500 font-medium mb-12 flex-1 italic leading-relaxed opacity-75">
                      "{brand.description}"
                    </p>
                    <a 
                      href={whatsappBrandUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-4 bg-[#1B345B] text-white py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl"
                    >
                      Consultar Orçamento <Icon name="ChevronRight" size={18} className="text-[#F7B718]" />
                    </a>
                    
                    {/* Efeito de brilho customizado por marca no hover */}
                    <style>{`
                      .group:hover {
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 40px -5px ${brand.color}20;
                        border-color: ${brand.color}30;
                      }
                    `}</style>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {currentView === 'contact' && (
          <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
             <div className="text-center mb-16">
               <button onClick={() => setCurrentView('catalog')} className="bg-slate-100 hover:bg-[#F7B718] text-[#1B345B] px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all mb-12 flex items-center gap-3 mx-auto shadow-sm">
                 <Icon name="ArrowLeft" size={16} /> Voltar ao Catálogo
               </button>
               <h2 className="text-4xl md:text-6xl font-black text-[#1B345B] uppercase tracking-tighter mb-6 leading-none">Fale com a gente</h2>
               <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-[13px] max-w-2xl mx-auto leading-relaxed">Sua produção merece componentes de alta performance e tecnologia 2026.</p>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="bg-[#1B345B] p-10 md:p-14 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <Icon name="Infinity" size={500} className="absolute -top-32 -left-32 animate-spin-slow" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-14 text-[#F7B718]">Canais Oficiais</h3>
                    <div className="space-y-12">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-white/5">
                          <Icon name="User" className="text-[#F7B718]" size={22} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Responsável Comercial</p>
                          <p className="text-xl font-black tracking-tight">Cristiane Calzavara</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-white/5">
                          <Icon name="Phone" className="text-[#F7B718]" size={22} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">WhatsApp Direto</p>
                          <p className="text-xl font-black tracking-tight">{CONTACT_INFO.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-white/5">
                          <Icon name="MapPin" className="text-[#F7B718]" size={22} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Polo de Atendimento</p>
                          <p className="text-xl font-black tracking-tight">{CONTACT_INFO.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <ContactForm />
                </div>
             </div>
          </section>
        )}
      </main>

      {/* WhatsApp FAB */}
      <a 
        href={whatsappBrandUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[1000] group"
        aria-label="WhatsApp"
      >
        <div className="absolute inset-0 bg-green-500 blur-2xl opacity-40 group-hover:opacity-60 transition-all rounded-full scale-150 animate-pulse"></div>
        <div className="relative w-16 h-16 md:w-24 md:h-24 bg-[#25D366] text-white rounded-[2rem] flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 group-hover:rotate-3 border-4 border-white/20">
          <Icon name="MessageCircle" size={32} className="md:hidden" />
          <Icon name="MessageCircle" size={44} className="hidden md:block" />
        </div>
      </a>

      {/* Footer simplificado e limpo */}
      <footer className="bg-white border-t-2 border-[#F7B718] py-12 px-6 md:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo small />
          <div className="flex flex-col items-center md:items-end">
            <p className="text-[10px] font-black text-[#1B345B] uppercase tracking-[0.4em] mb-2">Cristiane Calzavara</p>
            <p className="text-sm font-black text-[#F7B718] tracking-widest">{CONTACT_INFO.phone}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-400">
            INFINITY SOLUÇÕES TÊXTEIS REPRESENTAÇÕES COMERCIAIS © 2026 | FRANCA-SP
          </p>
          <div className="flex gap-8">
             <button onClick={() => { setCurrentView('catalog'); window.scrollTo(0,0); }} className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-[#1B345B]">Catálogo</button>
             <button onClick={() => { setCurrentView('contact'); window.scrollTo(0,0); }} className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-[#1B345B]">Atendimento</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
