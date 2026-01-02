
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

// Componente de formulário de contato para capturar leads e solicitações.
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
      <div className="bg-white p-12 rounded-[4rem] border-2 border-[#F7B718] text-center shadow-2xl animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10">
          <Icon name="CheckCircle" size={48} className="text-green-500" />
        </div>
        <h3 className="text-3xl font-black text-[#1B345B] uppercase tracking-tighter mb-4">Mensagem Enviada!</h3>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[11px] mb-12 max-w-[250px] mx-auto">
          Agradecemos o contato. A Cristiane Calzavara retornará sua solicitação em breve.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-[#1B345B] text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl"
        >
          Enviar Nova Mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 md:p-14 rounded-[4rem] border border-slate-100 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7B718]/5 rounded-bl-full pointer-events-none"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Seu Nome</label>
          <input 
            required
            className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-2xl outline-none font-bold text-[#1B345B] transition-all placeholder:text-slate-300"
            placeholder="Nome completo"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">E-mail</label>
          <input 
            required
            type="email"
            className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-2xl outline-none font-bold text-[#1B345B] transition-all placeholder:text-slate-300"
            placeholder="exemplo@empresa.com"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Fábrica / Empresa</label>
          <input 
            required
            className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-2xl outline-none font-bold text-[#1B345B] transition-all placeholder:text-slate-300"
            placeholder="Nome da sua fábrica"
            value={formData.company}
            onChange={e => setFormData({...formData, company: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Interesse</label>
          <div className="relative">
            <select 
              className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-2xl outline-none font-bold text-[#1B345B] transition-all appearance-none cursor-pointer"
              value={formData.interest}
              onChange={e => setFormData({...formData, interest: e.target.value})}
            >
              {BRANDS_DATA.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Icon name="ChevronDown" size={18} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Como podemos ajudar?</label>
        <textarea 
          required
          rows={4}
          className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-2xl outline-none font-bold text-[#1B345B] transition-all resize-none placeholder:text-slate-300"
          placeholder="Descreva sua dúvida técnica ou solicitação de orçamento..."
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
        />
      </div>

      <button type="submit" className="w-full bg-[#1B345B] hover:bg-black text-white py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-4">
        Enviar Mensagem <Icon name="Send" size={18} className="text-[#F7B718]" />
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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#F7B718] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#F7B718] rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="flex flex-col items-center gap-6 relative z-10">
        <div className="w-16 h-16 border-4 border-white/10 border-t-[#F7B718] rounded-full animate-spin"></div>
        <div className="text-center">
          <p className="text-white font-black text-[12px] uppercase tracking-[0.4em]">Panorama Setorial 2026</p>
          <p className="text-white/40 text-[9px] uppercase tracking-widest mt-2">Sincronizando tendências globais...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] overflow-hidden bg-black">
      {posts.map((post, index) => (
        <div 
          key={post.id || index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center ${index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}
        >
          <img src={post.image} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          
          <div className="relative z-20 container mx-auto px-6 sm:px-12 md:px-20 text-left max-w-6xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#F7B718] text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">Tendência 2026</span>
              <span className="text-white font-black text-[10px] uppercase tracking-widest border-l-2 border-[#F7B718] pl-4">{post.brand}</span>
            </div>
            <h2 className="text-white text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1] tracking-tighter uppercase drop-shadow-2xl max-w-4xl">
              {post.title}
            </h2>
            <div className="max-w-2xl bg-white/10 backdrop-blur-xl border-l-8 border-[#F7B718] p-6 md:p-8 rounded-r-3xl shadow-2xl">
               <p className="text-slate-100 text-sm sm:text-base md:text-xl font-medium leading-relaxed italic opacity-90">
                 "{post.excerpt}"
               </p>
               {post.sourceUrl && (
                 <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 text-[#F7B718] text-[10px] font-black uppercase tracking-widest hover:underline">
                   Ver Referência Completa <Icon name="ExternalLink" size={12} />
                 </a>
               )}
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

  const handleAISearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setAiLoading(true);
    const result = await searchProductsWithAI(searchQuery, PRODUCTS);
    setAiResult(result);
    setAiLoading(false);
  };

  const Logo = ({ light = false, small = false }: { light?: boolean; small?: boolean }) => (
    <div className="flex items-center gap-3 md:gap-5 cursor-pointer group" onClick={() => { setCurrentView('catalog'); setAiResult(null); window.scrollTo(0,0); }}>
      <div className="relative">
        <Icon name="Infinity" className={`text-[#F7B718] animate-spin-slow relative z-10`} size={light ? 44 : (small ? 52 : 64)} />
        <div className="absolute inset-0 bg-[#F7B718]/20 blur-xl rounded-full group-hover:bg-[#F7B718]/40 transition-all"></div>
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`${small ? 'text-2xl' : 'text-3xl md:text-5xl'} font-black tracking-tighter uppercase ${light ? 'text-white' : 'text-[#1B345B]'}`}>INFINITY</span>
        <div className="flex flex-col -mt-1">
          <span className="text-[9px] md:text-[13px] font-black text-[#EAB308] tracking-[0.15em] uppercase">SOLUÇÕES TÊXTEIS</span>
          <span className={`text-[8px] md:text-[10px] font-bold tracking-[0.1em] uppercase ${light ? 'text-white/40' : 'text-slate-400'}`}>REPRESENTAÇÕES COMERCIAIS</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] selection:bg-[#F7B718] selection:text-black flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 h-24 md:h-32 flex items-center px-6 md:px-16 justify-between border-b-4 border-[#F7B718]">
        <Logo small />
        <nav className="hidden lg:flex items-center gap-12">
          <button onClick={() => { setCurrentView('catalog'); setAiResult(null); window.scrollTo(0,0); }} className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1B345B] hover:text-[#F7B718] transition-all relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F7B718] transition-all group-hover:w-full"></span>
          </button>
          <button onClick={() => { setCurrentView('contact'); window.scrollTo(0,0); }} className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1B345B] hover:text-[#F7B718] transition-all relative group">
            Atendimento
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F7B718] transition-all group-hover:w-full"></span>
          </button>
          <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-[#1B345B] hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-4 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0">
             WhatsApp <Icon name="MessageCircle" size={18} className="text-[#F7B718]" />
          </a>
        </nav>
        <div className="lg:hidden flex items-center gap-4">
           <button onClick={() => setCurrentView('contact')} className="bg-[#1B345B] p-4 rounded-xl text-white shadow-lg">
             <Icon name="Mail" size={24} />
           </button>
        </div>
      </header>

      <div className="h-24 md:h-32" />

      <main className="flex-grow">
        {currentView === 'catalog' && (
          <>
            <RotatingBanner posts={blogPosts} />
            
            <section className="bg-white py-16 md:py-28 px-6 border-b border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#F7B718]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-3 bg-[#1B345B]/5 px-6 py-2 rounded-full mb-8">
                  <Icon name="Zap" size={14} className="text-[#F7B718]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1B345B]">Tecnologia Gemini AI</span>
                </div>
                <h1 className="text-[#1B345B] text-3xl md:text-5xl font-black mb-10 uppercase tracking-tighter leading-none">
                  Consultoria <span className="text-[#F7B718]">Técnica Digital</span>
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-12 max-w-xl mx-auto">
                  Tire dúvidas técnicas sobre adesivos, têxteis e solados instantaneamente
                </p>
                <form onSubmit={handleAISearch} className="relative shadow-[0_30px_60px_-15px_rgba(27,52,91,0.2)] rounded-3xl overflow-hidden flex items-center bg-white border-2 border-slate-100 focus-within:border-[#F7B718] transition-all max-w-3xl mx-auto p-2">
                  <input 
                    className="w-full pl-8 md:pl-10 pr-32 md:pr-48 py-6 md:py-7 bg-transparent border-none text-[#1B345B] font-bold outline-none text-base md:text-lg placeholder:text-slate-300"
                    placeholder="Ex: Qual adesivo Pollibox usar em couro?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" disabled={aiLoading} className="absolute right-4 bg-[#1B345B] text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center gap-3 disabled:opacity-50">
                    {aiLoading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Icon name="Send" size={16} />}
                    {aiLoading ? 'Processando' : 'Consultar'}
                  </button>
                </form>

                {aiResult && (
                  <div className="mt-14 p-8 md:p-12 bg-white rounded-[3rem] border-2 border-[#F7B718] text-left max-w-3xl mx-auto shadow-2xl animate-in fade-in slide-in-from-top-6 duration-700 relative">
                    <div className="absolute -top-6 left-12 bg-[#F7B718] text-black px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl">Resposta da Consultoria</div>
                    <div className="flex items-start gap-6">
                       <div className="hidden md:flex w-14 h-14 bg-[#1B345B] rounded-2xl items-center justify-center shrink-0">
                         <Icon name="Infinity" size={28} className="text-[#F7B718] animate-spin-slow" />
                       </div>
                       <div className="space-y-6">
                         <p className="text-[#1B345B] font-bold text-lg md:text-xl leading-relaxed italic">
                           "{aiResult.message}"
                         </p>
                         <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4">
                            <a href={CONTACT_INFO.whatsappUrl} className="bg-green-50 text-green-700 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-100 transition-colors flex items-center gap-2">
                              Falar com Cristiane <Icon name="ArrowRight" size={14} />
                            </a>
                         </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
              <div className="flex flex-col items-center mb-20 md:mb-32 text-center">
                <div className="w-20 h-2 bg-[#F7B718] mb-8 rounded-full"></div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#1B345B]">Portfólio de Marcas</h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.4em] mt-4 text-[10px] md:text-[12px]">Representação Exclusiva Franca-SP</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
                {BRANDS_DATA.map(brand => (
                  <div key={brand.id} className="group bg-white p-10 md:p-14 rounded-[3.5rem] md:rounded-[4.5rem] border border-slate-100 hover:border-[#F7B718] transition-all shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(247,183,24,0.15)] flex flex-col h-full transform hover:-translate-y-4">
                    <div className="flex items-center gap-6 mb-10">
                      <div className="w-3 h-14 rounded-full shadow-lg" style={{ backgroundColor: brand.color }}></div>
                      <h3 className="text-2xl md:text-3xl font-black text-[#1B345B] uppercase leading-[1.1] tracking-tighter group-hover:text-[#F7B718] transition-colors">{brand.name}</h3>
                    </div>
                    <p className="text-base md:text-lg text-slate-500 font-medium mb-14 flex-1 italic leading-relaxed opacity-80">
                      "{brand.description}"
                    </p>
                    <a 
                      href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent("Olá Cristiane! Gostaria de conhecer melhor o catálogo da " + brand.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-4 bg-[#1B345B] text-white py-5 md:py-6 rounded-2xl text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] hover:bg-black transition-all shadow-lg hover:shadow-[#1B345B]/30"
                    >
                      Solicitar Catálogo <Icon name="ArrowRight" size={18} />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {currentView === 'contact' && (
          <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
             <div className="text-center mb-16">
               <button onClick={() => setCurrentView('catalog')} className="bg-slate-100 hover:bg-[#F7B718] text-[#1B345B] px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all mb-12 flex items-center gap-3 mx-auto">
                 <Icon name="ArrowLeft" size={16} /> Voltar ao Início
               </button>
               <h2 className="text-4xl md:text-6xl font-black text-[#1B345B] uppercase tracking-tighter mb-4">Entre em Contato</h2>
               <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-[12px]">Fale diretamente com nossa diretoria comercial</p>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                <div className="bg-[#1B345B] p-12 md:p-20 rounded-[4rem] text-white shadow-3xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <Icon name="Infinity" size={600} className="absolute -top-48 -left-48 animate-spin-slow" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-10 text-[#F7B718]">Canais Oficiais</h3>
                    <div className="space-y-12">
                      <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                          <Icon name="User" className="text-[#F7B718]" size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Representante Responsável</p>
                          <p className="text-2xl font-black">Cristiane Calzavara</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                          <Icon name="Phone" className="text-[#F7B718]" size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Telefone Direto</p>
                          <p className="text-2xl font-black">{CONTACT_INFO.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                          <Icon name="MapPin" className="text-[#F7B718]" size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Sede Comercial</p>
                          <p className="text-2xl font-black">{CONTACT_INFO.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <ContactForm />
                </div>
             </div>
          </section>
        )}
      </main>

      {/* Botão WhatsApp Flutuante Estilizado */}
      <a 
        href={CONTACT_INFO.whatsappUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[1000] group"
        aria-label="WhatsApp"
      >
        <div className="absolute inset-0 bg-green-500 blur-2xl opacity-40 group-hover:opacity-60 transition-all rounded-full scale-150"></div>
        <div className="relative w-16 h-16 md:w-24 md:h-24 bg-green-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 group-hover:-rotate-3 border-4 border-white/20">
          <Icon name="MessageCircle" size={32} className="md:hidden" />
          <Icon name="MessageCircle" size={48} className="hidden md:block" />
        </div>
      </a>

      <footer className="bg-slate-950 text-white pt-24 md:pt-40 pb-16 px-6 md:px-16 relative mt-auto border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 mb-24">
          <div className="max-w-md">
            <Logo light />
            <p className="mt-10 text-slate-500 text-base md:text-lg font-medium leading-relaxed italic opacity-80">
              Transformando a indústria calçadista através da inovação têxtil e soluções adesivas sustentáveis. Representando as maiores marcas globais em Franca-SP.
            </p>
            <div className="mt-12 flex gap-6">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#F7B718] transition-colors group">
                <Icon name="Instagram" size={20} className="text-white group-hover:text-black" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#F7B718] transition-colors group">
                <Icon name="Linkedin" size={20} className="text-white group-hover:text-black" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col lg:items-end gap-2">
             <span className="text-[11px] font-black text-[#F7B718] uppercase tracking-[0.5em] mb-10">Central de Negócios</span>
             <div className="space-y-6 text-left lg:text-right">
               <p className="text-3xl md:text-5xl font-black tracking-tighter text-white/95">Cristiane Calzavara</p>
               <p className="text-2xl md:text-3xl font-black tracking-tight text-[#F7B718]">{CONTACT_INFO.phone}</p>
               <p className="text-base font-bold text-slate-500 lowercase tracking-wide border-b-2 border-white/10 pb-2">{CONTACT_INFO.email}</p>
               <p className="text-[12px] font-black text-white/40 uppercase tracking-[0.4em] pt-4 flex items-center gap-4 lg:justify-end">
                 <Icon name="MapPin" size={18} className="text-[#F7B718]" /> {CONTACT_INFO.location}
               </p>
             </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-14 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="text-[10px] font-black uppercase tracking-[0.7em] text-slate-600">
              INFINITY SOLUÇÕES TÊXTEIS © 2026
            </p>
            <p className="text-[8px] font-bold text-slate-800 uppercase tracking-widest">Tecnologia, Inovação e Representação Industrial</p>
          </div>
          <div className="flex gap-12">
             <button onClick={() => { setCurrentView('catalog'); window.scrollTo(0,0); }} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-[#F7B718] transition-colors">Home</button>
             <button onClick={() => { setCurrentView('contact'); window.scrollTo(0,0); }} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-[#F7B718] transition-colors">Contato</button>
             <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-[#F7B718] transition-colors">Privacidade</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
