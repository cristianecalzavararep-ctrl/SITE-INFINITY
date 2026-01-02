
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
    console.log('Formulário enviado:', formData);
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
        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Como podemos ajudar?</label>
        <textarea 
          required
          rows={3}
          className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-xl outline-none font-bold text-[#1B345B] transition-all resize-none placeholder:text-slate-300 text-sm"
          placeholder="Descreva sua dúvida técnica ou solicitação..."
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
    <div className="w-full h-[300px] bg-[#1B345B] flex items-center justify-center relative overflow-hidden">
      <div className="flex flex-col items-center gap-6 relative z-10">
        <div className="w-12 h-12 border-4 border-white/10 border-t-[#F7B718] rounded-full animate-spin"></div>
        <p className="text-white font-black text-[10px] uppercase tracking-[0.4em]">Sincronizando Tendências...</p>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[550px] overflow-hidden bg-black">
      {posts.map((post, index) => (
        <div 
          key={post.id || index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}
        >
          <img src={post.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          
          <div className="relative z-20 container mx-auto px-6 sm:px-12 md:px-20 text-left max-w-6xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#F7B718] text-black text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg">Visão 2026</span>
              <span className="text-white font-black text-[9px] uppercase tracking-widest border-l border-[#F7B718] pl-3">{post.brand}</span>
            </div>
            <h2 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tighter uppercase drop-shadow-2xl max-w-4xl">
              {post.title}
            </h2>
            <div className="max-w-xl bg-white/10 backdrop-blur-md border-l-4 border-[#F7B718] p-5 rounded-r-2xl shadow-xl">
               <p className="text-slate-100 text-xs sm:text-sm md:text-base font-medium leading-relaxed italic opacity-90">
                 "{post.excerpt}"
               </p>
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
        <Icon name="Infinity" className={`text-[#F7B718] animate-spin-slow relative z-10`} size={light ? 36 : (small ? 44 : 52)} />
        <div className="absolute inset-0 bg-[#F7B718]/20 blur-lg rounded-full group-hover:bg-[#F7B718]/40 transition-all"></div>
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`${small ? 'text-xl' : 'text-2xl md:text-4xl'} font-black tracking-tighter uppercase ${light ? 'text-white' : 'text-[#1B345B]'}`}>INFINITY</span>
        <div className="flex flex-col -mt-0.5">
          <span className="text-[8px] md:text-[11px] font-black text-[#EAB308] tracking-[0.15em] uppercase">SOLUÇÕES TÊXTEIS</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] selection:bg-[#F7B718] selection:text-black flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50 h-20 md:h-24 flex items-center px-6 md:px-12 justify-between border-b-2 border-[#F7B718]">
        <Logo small />
        <nav className="hidden lg:flex items-center gap-10">
          <button onClick={() => { setCurrentView('catalog'); setAiResult(null); window.scrollTo(0,0); }} className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1B345B] hover:text-[#F7B718] transition-all relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F7B718] transition-all group-hover:w-full"></span>
          </button>
          <button onClick={() => { setCurrentView('contact'); window.scrollTo(0,0); }} className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1B345B] hover:text-[#F7B718] transition-all relative group">
            Atendimento
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F7B718] transition-all group-hover:w-full"></span>
          </button>
          <a href={whatsappBrandUrl} target="_blank" rel="noopener noreferrer" className="bg-[#1B345B] hover:bg-black text-white px-8 py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.3em] flex items-center gap-3 transition-all shadow-lg hover:-translate-y-0.5">
             WhatsApp <Icon name="MessageCircle" size={16} className="text-[#F7B718]" />
          </a>
        </nav>
        <div className="lg:hidden flex items-center gap-3">
           <button onClick={() => setCurrentView('contact')} className="bg-[#1B345B] p-3 rounded-lg text-white">
             <Icon name="Mail" size={20} />
           </button>
        </div>
      </header>

      <div className="h-20 md:h-24" />

      <main className="flex-grow">
        {currentView === 'catalog' && (
          <>
            <RotatingBanner posts={blogPosts} />
            
            <section className="bg-white py-12 md:py-20 px-6 border-b border-slate-100 relative overflow-hidden">
              <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-[#1B345B]/5 px-5 py-2 rounded-full mb-6">
                  <Icon name="Zap" size={12} className="text-[#F7B718]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1B345B]">Tecnologia Gemini AI</span>
                </div>
                <h1 className="text-[#1B345B] text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter leading-none">
                  Infinity <span className="text-[#F7B718]">IA</span>
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-[0.15em] mb-10 max-w-xl mx-auto">
                  Qual produto ou artigo está buscando hoje?
                </p>
                <form onSubmit={handleAISearch} className="relative shadow-2xl rounded-2xl overflow-hidden flex items-center bg-white border border-slate-200 focus-within:border-[#F7B718] transition-all max-w-2xl mx-auto p-1.5">
                  <input 
                    className="w-full pl-6 pr-32 py-4 bg-transparent border-none text-[#1B345B] font-bold outline-none text-sm md:text-base placeholder:text-slate-300"
                    placeholder="Ex: Qual adesivo Pollibox usar em couro?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" disabled={aiLoading} className="absolute right-2 bg-[#1B345B] text-white px-6 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center gap-2">
                    {aiLoading ? <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Icon name="Send" size={14} />}
                    {aiLoading ? '...' : 'Consultar'}
                  </button>
                </form>

                {aiResult && (
                  <div className="mt-12 p-8 bg-white rounded-[2rem] border border-[#F7B718] text-left max-w-2xl mx-auto shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500 relative">
                    <div className="absolute -top-4 left-8 bg-[#F7B718] text-black px-4 py-1.5 rounded-full font-black text-[8px] uppercase tracking-widest shadow-lg">Resposta Infinity IA</div>
                    <div className="flex items-start gap-5">
                       <div className="hidden md:flex w-12 h-12 bg-[#1B345B] rounded-xl items-center justify-center shrink-0">
                         <Icon name="Infinity" size={24} className="text-[#F7B718] animate-spin-slow" />
                       </div>
                       <div className="space-y-4">
                         <p className="text-[#1B345B] font-bold text-base md:text-lg leading-relaxed italic">
                           "{aiResult.message}"
                         </p>
                         <div className="pt-4 border-t border-slate-50 flex flex-wrap gap-4">
                            <a href={whatsappBrandUrl} className="bg-green-50 text-green-700 px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-green-100 transition-colors flex items-center gap-2">
                              Falar com Cristiane <Icon name="ArrowRight" size={12} />
                            </a>
                         </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
              <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
                <div className="w-16 h-1.5 bg-[#F7B718] mb-6 rounded-full"></div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#1B345B]">Portfólio de Marcas</h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] mt-3 text-[9px] md:text-[11px]">Representação Exclusiva Franca-SP</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {BRANDS_DATA.map(brand => (
                  <div key={brand.id} className="group bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 hover:border-[#F7B718] transition-all shadow-xl hover:shadow-2xl flex flex-col h-full transform hover:-translate-y-2">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="w-2.5 h-10 rounded-full shadow-md" style={{ backgroundColor: brand.color }}></div>
                      <h3 className="text-xl md:text-2xl font-black text-[#1B345B] uppercase leading-tight tracking-tighter group-hover:text-[#F7B718] transition-colors">{brand.name}</h3>
                    </div>
                    <p className="text-sm md:text-base text-slate-500 font-medium mb-10 flex-1 italic leading-relaxed opacity-80">
                      "{brand.description}"
                    </p>
                    <a 
                      href={whatsappBrandUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 bg-[#1B345B] text-white py-4 md:py-5 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg"
                    >
                      Fale Conosco <Icon name="ArrowRight" size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {currentView === 'contact' && (
          <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
             <div className="text-center mb-12">
               <button onClick={() => setCurrentView('catalog')} className="bg-slate-100 hover:bg-[#F7B718] text-[#1B345B] px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all mb-10 flex items-center gap-2 mx-auto">
                 <Icon name="ArrowLeft" size={14} /> Voltar
               </button>
               <h2 className="text-3xl md:text-5xl font-black text-[#1B345B] uppercase tracking-tighter mb-4">Entre em Contato</h2>
               <p className="text-[#1B345B] font-bold uppercase tracking-[0.2em] text-[11px] md:text-[14px] mb-3 max-w-2xl mx-auto leading-relaxed">Não encontrou o que queria? Temos vários parceiros comerciais que podemos direcionar</p>
               <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[9px] md:text-[11px]">Fale diretamente com nossa diretoria comercial</p>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="bg-[#1B345B] p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <Icon name="Infinity" size={400} className="absolute -top-24 -left-24 animate-spin-slow" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 text-[#F7B718]">Canais Oficiais</h3>
                    <div className="space-y-10">
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <Icon name="User" className="text-[#F7B718]" size={20} />
                        </div>
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Responsável</p>
                          <p className="text-lg font-black">Cristiane Calzavara</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <Icon name="Phone" className="text-[#F7B718]" size={20} />
                        </div>
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Telefone Direto</p>
                          <p className="text-lg font-black">{CONTACT_INFO.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <Icon name="MapPin" className="text-[#F7B718]" size={20} />
                        </div>
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">Sede Comercial</p>
                          <p className="text-lg font-black">{CONTACT_INFO.location}</p>
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

      <a 
        href={whatsappBrandUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[1000] group"
        aria-label="WhatsApp"
      >
        <div className="absolute inset-0 bg-green-500 blur-xl opacity-30 group-hover:opacity-50 transition-all rounded-full scale-125"></div>
        <div className="relative w-14 h-14 md:w-20 md:h-20 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 border-2 border-white/20">
          <Icon name="MessageCircle" size={28} className="md:hidden" />
          <Icon name="MessageCircle" size={36} className="hidden md:block" />
        </div>
      </a>

      <footer className="bg-slate-950 text-white pt-10 pb-8 px-6 md:px-12 relative mt-auto border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-8">
          <div>
            <Logo light small />
            <p className="mt-4 text-slate-500 text-xs md:text-sm font-medium leading-relaxed italic opacity-70 max-w-sm">
              REPRESENTAÇÃO COMERCIAL FRANCA -SP.
            </p>
          </div>
          
          <div className="flex flex-col lg:items-end justify-center">
             <div className="text-left lg:text-right space-y-1.5">
               <p className="text-xl md:text-2xl font-black tracking-tighter text-white/95">Cristiane Calzavara</p>
               <p className="text-lg md:text-xl font-black text-[#F7B718]">{CONTACT_INFO.phone}</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{CONTACT_INFO.location}</p>
             </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-700">
            INFINITY SOLUÇÕES TÊXTEIS © 2026
          </p>
          <div className="flex gap-8">
             <button onClick={() => { setCurrentView('catalog'); window.scrollTo(0,0); }} className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-[#F7B718]">Home</button>
             <button onClick={() => { setCurrentView('contact'); window.scrollTo(0,0); }} className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-[#F7B718]">Contato</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
