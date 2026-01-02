
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
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl relative overflow-hidden text-left">
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
        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4 leading-tight block">Mensagem ou dúvida específica</label>
        <textarea 
          required
          rows={3}
          className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-[#F7B718] rounded-xl outline-none font-bold text-[#1B345B] transition-all resize-none placeholder:text-slate-300 text-sm"
          placeholder="Não encontrou o que procurava? Temos parcerias que podemos indicar"
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
    <div className="flex flex-col leading-none text-left">
      <span className="text-2xl font-black text-[#1B345B] tracking-tighter uppercase">INFINITY</span>
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-[#F7B718] tracking-[0.1em] uppercase">SOLUÇÕES TÊXTEIS</span>
        <span className="text-[6px] font-black text-[#1B345B] opacity-70 tracking-[0.05em] uppercase">REPRESENTAÇÕES COMERCIAIS</span>
      </div>
    </div>
  </div>
);

const RotatingBanner: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (posts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [posts.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden bg-[#1B345B]">
      {posts.map((post, index) => (
        <div 
          key={post.id}
          className={`absolute inset-0 transition-all duration-1000 flex items-center ${index === current ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
          style={{ transitionDelay: index === current ? '0ms' : '0ms' }}
        >
          <img src={post.image} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B345B] via-[#1B345B]/40 to-transparent" />
          <div className="relative z-10 container mx-auto px-6 md:px-20 text-center md:text-left">
            <span className="bg-[#F7B718] text-[#1B345B] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">Tendência 2026</span>
            <h2 className="text-white text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-none max-w-4xl">{post.title}</h2>
            <p className="text-white/80 text-lg italic max-w-xl border-l-4 border-[#F7B718] pl-6 mx-auto md:mx-0">{post.excerpt}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {posts.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? 'w-12 bg-[#F7B718]' : 'w-3 bg-white/30 hover:bg-white/50'}`} 
          />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('catalog');
  // Usando apenas posts estáticos confiáveis por enquanto para o banner principal
  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const whatsappBrandUrl = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(CONTACT_INFO.whatsappWelcomeMsg)}`;

  // Desativado o fetch automático de notícias para o banner hero para evitar informações não solicitadas
  // useEffect(() => {
  //   getIndustryNews().then(news => news.length && setBlogPosts(news));
  // }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setAiLoading(true);
    const result = await searchProductsWithAI(searchQuery, PRODUCTS);
    setAiResult(result);
    setAiLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="fixed top-0 w-full h-24 bg-white shadow-xl z-50 flex items-center justify-between px-6 md:px-12 border-b-4 border-[#F7B718]">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => setCurrentView('catalog')} className="text-[10px] font-black uppercase tracking-widest text-[#1B345B]">Home</button>
          <a href="#contato" className="text-[10px] font-black uppercase tracking-widest text-[#1B345B]">Contato</a>
          <a href={whatsappBrandUrl} target="_blank" rel="noopener noreferrer" className="bg-[#1B345B] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all">
            WhatsApp <Icon name="MessageCircle" size={16} className="text-[#F7B718]" />
          </a>
        </nav>
      </header>
      
      <div className="h-24" />

      <main>
        <RotatingBanner posts={blogPosts} />
        
        <section className="py-20 px-6 max-w-7xl mx-auto text-center">
          <h1 className="text-[#1B345B] text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">Infinity <span className="text-[#F7B718]">IA</span></h1>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative mb-20">
            <input 
              className="w-full p-6 md:p-8 bg-slate-100 rounded-3xl outline-none font-bold text-[#1B345B] border-2 border-transparent focus:border-[#F7B718] transition-all text-lg shadow-inner"
              placeholder="O que você procura para sua produção hoje?"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-4 top-4 bg-[#1B345B] text-white px-8 py-4 md:py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all">
              {aiLoading ? 'Consultando...' : 'CONSULTAR'}
            </button>
          </form>

          {aiResult && (
            <div className="mb-20 p-8 bg-white rounded-[3rem] border-2 border-[#F7B718] text-left max-w-3xl mx-auto shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-[#1B345B] font-bold text-lg leading-relaxed italic">"{aiResult.message}"</p>
              <div className="mt-8">
                <a href={whatsappBrandUrl} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all inline-block">Falar com Cristiane</a>
              </div>
            </div>
          )}

          <div className="mb-20">
            <h2 className="text-[#1B345B] text-3xl font-black uppercase tracking-tighter mb-12 flex items-center justify-center gap-4">
              <div className="h-1 w-12 bg-[#F7B718] rounded-full"></div>
              NOSSAS REPRESENTADAS
              <div className="h-1 w-12 bg-[#F7B718] rounded-full"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
              {BRANDS_DATA.map(brand => (
                <div key={brand.id} className="p-10 bg-white rounded-[3rem] border-2 border-slate-50 shadow-xl hover:-translate-y-2 transition-all group">
                  <div className="w-12 h-2 bg-[#F7B718] mb-6 rounded-full group-hover:w-20 transition-all" style={{ backgroundColor: brand.color }}></div>
                  <h3 className="text-2xl font-black text-[#1B345B] uppercase tracking-tighter mb-4">{brand.name}</h3>
                  <p className="text-slate-500 font-medium mb-8 leading-relaxed italic">"{brand.description}"</p>
                  <a href={whatsappBrandUrl} target="_blank" rel="noopener noreferrer" className="text-[#1B345B] font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                    Consultar Orçamento <Icon name="ArrowRight" size={14} className="text-[#F7B718]" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Contato na Home */}
        <section id="contato" className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-[#1B345B] uppercase tracking-tighter mb-4">Fale com a gente</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Sua produção merece componentes de alta performance.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="bg-[#1B345B] p-10 md:p-14 rounded-[3.5rem] text-white shadow-2xl h-full flex flex-col justify-center">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 text-[#F7B718]">Canais Oficiais</h3>
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Icon name="User" className="text-[#F7B718]" size={24} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Responsável</p>
                      <p className="text-xl font-black">{CONTACT_INFO.name} Calzavara</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Icon name="Phone" className="text-[#F7B718]" size={24} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">WhatsApp</p>
                      <p className="text-xl font-black">{CONTACT_INFO.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Icon name="Mail" className="text-[#F7B718]" size={24} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">E-mail</p>
                      <p className="text-sm font-bold opacity-80">{CONTACT_INFO.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* WhatsApp FAB Flutuante */}
      <a 
        href={whatsappBrandUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 group scale-110 md:scale-125"
      >
        <div className="absolute inset-0 bg-green-500 blur-2xl opacity-40 group-hover:opacity-60 transition-all rounded-full animate-pulse"></div>
        <div className="relative w-16 h-16 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 border-4 border-white/20">
          <Icon name="MessageCircle" size={32} />
        </div>
      </a>

      <footer className="bg-white border-t-2 border-[#F7B718] py-16 px-6 flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto w-full">
        <Logo small />
        <div className="text-center md:text-right">
          <p className="text-[10px] font-black text-[#1B345B] uppercase tracking-widest mb-2">© 2026 Infinity Soluções Têxteis Representações Comerciais</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Franca - SP | Polo Calçadista</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
