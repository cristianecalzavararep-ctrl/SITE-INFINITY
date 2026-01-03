
import React, { useState, useEffect } from 'react';
import { BRANDS_DATA } from './data';
import Icon from './components/Icon';

const CONTACT_INFO = {
  phone: "(35) 9 8424-8711",
  whatsappUrl: "https://wa.me/5535984248711",
  email: "CRISTIANECALZAVARAREP@GMAIL.COM",
  location: "Franca - SP"
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWaLink = (brandName?: string) => {
    const text = brandName 
      ? `Olá Cristiane! Vi o site da Infinity e tenho interesse na marca: ${brandName}. Pode me enviar o catálogo?`
      : "Olá Cristiane! Gostaria de agendar uma visita ou saber mais sobre as soluções da Infinity.";
    return `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `SOLICITAÇÃO DE CONTATO - SITE\n\nNome: ${formData.nome}\nTelefone: ${formData.telefone}\nMensagem: ${formData.mensagem}`;
    window.open(`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const Logo = ({ light = false }: { light?: boolean }) => (
    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
      <div className="relative">
        <svg className={`w-10 h-10 md:w-12 md:h-12 transition-transform duration-500 group-hover:rotate-180`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill={light ? "#FFFFFF" : "#1B345B"} d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.5l-2.83 2.83l-2.83-2.83c-.97-.94-2.33-1.5-3.77-1.5c-2.98 0-5.4 2.42-5.4 5.4s2.42 5.4 5.4 5.4c1.44 0 2.8-.56 3.77-1.5l2.83-2.83l2.83 2.83c.97.94 2.33 1.5 3.77 1.5c2.98 0 5.4-2.42 5.4-5.4s-2.42-5.4-5.4-5.4zm-13.2 8.4c-1.65 0-3-1.35-3-3s1.35-3 3-3c.83 0 1.58.34 2.12.88l2.88 2.88l-2.88 2.88c-.54.54-1.29.88-2.12.88zm13.2 0c-.83 0-1.58-.34-2.12-.88l-2.88-2.88l2.88-2.88c.54-.54 1.29-.88 2.12-.88c1.65 0 3 1.35 3 3s-1.35 3-3 3z"/>
          <path fill="#F7B718" d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.5l-2.83 2.83l2.83 2.83c.97.94 2.33 1.5 3.77 1.5c2.98 0 5.4-2.42 5.4-5.4s-2.42-5.4-5.4-5.4zm3 5.4c0 1.65-1.35 3-3 3c-.83 0-1.58-.34-2.12-.88l-2.88-2.88l2.88-2.88c.54-.54 1.29-.88 2.12-.88c1.65 0 3 1.35 3 3z"/>
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-xl md:text-2xl font-black tracking-tighter transition-colors ${light ? 'text-white' : 'text-[#1B345B]'}`}>INFINITY</span>
        <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#F7B718]">Soluções Têxteis</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#F7B718] selection:text-[#1B345B]">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-700 flex items-center justify-between px-6 md:px-20 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl h-20' : 'bg-transparent h-28'}`}>
        <Logo light={!scrolled} />
        
        <div className="hidden lg:flex items-center gap-12">
          {['fornecedores', 'atendimento'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item)} 
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-[#F7B718] ${scrolled ? 'text-[#1B345B]' : 'text-white'}`}
            >
              {item === 'fornecedores' ? 'Representadas' : 'Contato'}
            </button>
          ))}
          <a 
            href={getWaLink()} 
            target="_blank" 
            className={`px-10 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all transform hover:scale-105 active:scale-95 shadow-xl ${scrolled ? 'bg-[#1B345B] text-white' : 'bg-[#F7B718] text-[#1B345B]'}`}
          >
            Falar no WhatsApp
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-[95vh] min-h-[700px] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-50 scale-110 animate-pulse-slow"
            alt="Processo industrial calçadista"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B345B] via-[#1B345B]/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#F7B718]"></div>
              <span className="text-[#F7B718] text-[10px] font-black uppercase tracking-[0.5em]">Tecnologia 2026</span>
            </div>
            <h1 className="text-6xl md:text-[120px] font-black text-white leading-[0.85] mb-12 uppercase tracking-tighter">
              ALTA <br/>
              <span className="text-[#F7B718]">PERFORMANCE</span> <br/>
              CALÇADISTA.
            </h1>
            <p className="text-slate-300 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed mb-16 border-l-4 border-[#F7B718] pl-8">
              Representação oficial das marcas que definem o padrão de qualidade, conforto e durabilidade na indústria de Franca/SP.
            </p>
            <div className="flex flex-wrap gap-8">
              <button 
                onClick={() => scrollToSection('fornecedores')} 
                className="group flex items-center gap-6 bg-[#F7B718] text-[#1B345B] px-16 py-7 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white transition-all shadow-3xl"
              >
                Explorar Soluções
                <Icon name="ArrowRight" className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex flex-col justify-center">
                <span className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Localização</span>
                <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Icon name="MapPin" size={12} className="text-[#F7B718]" /> {CONTACT_INFO.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS GRID - PREMIUM BENTO STYLE */}
      <section id="fornecedores" className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[#1B345B] text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">Representadas <span className="text-[#F7B718]">Exclusivas</span></h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed">Fornecemos os insumos mais críticos para a sua produção com agilidade e suporte técnico especializado.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-16 h-16 border border-slate-100 flex items-center justify-center text-slate-300">
                <Icon name="Layers" size={24} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRANDS_DATA.map((brand) => (
              <div 
                key={brand.id}
                onMouseEnter={() => setActiveBrand(brand.id)}
                onMouseLeave={() => setActiveBrand(null)}
                className="group relative p-12 bg-slate-50 border border-slate-100 hover:bg-[#1B345B] transition-all duration-700 min-h-[420px] flex flex-col justify-between overflow-hidden cursor-default"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all group-hover:rotate-12 group-hover:scale-150">
                  <Icon name="Cpu" size={120} className="text-[#F7B718]" />
                </div>
                
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#F7B718] mb-6 block">Insumo Industrial</span>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 group-hover:text-white transition-colors leading-tight">
                    {brand.name}
                  </h3>
                  <p className="text-slate-500 group-hover:text-slate-300 text-base font-medium leading-relaxed max-w-[280px]">
                    {brand.description}
                  </p>
                </div>

                <div className="mt-12 relative z-10 flex flex-col gap-4">
                  <div className="w-full h-px bg-slate-200 group-hover:bg-white/10 transition-colors"></div>
                  <a 
                    href={getWaLink(brand.name)} 
                    target="_blank" 
                    className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-[#1B345B] group-hover:text-[#F7B718] transition-all group-hover:gap-4"
                  >
                    Falar sobre esta marca
                    <Icon name="ArrowUpRight" size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REINFORCEMENT SECTION */}
      <section className="bg-[#1B345B] py-24">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
                Pronta entrega e <span className="text-[#F7B718]">atendimento presencial</span> em Franca e região.
              </h3>
              <p className="text-slate-300 text-lg font-medium leading-relaxed">
                Entendemos a dinâmica do polo industrial. Oferecemos suporte técnico para a aplicação de cada componente, garantindo que sua produção não pare.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-white/5 p-8 border-l-4 border-[#F7B718]">
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Visita Técnica</h4>
                <p className="text-slate-400 text-sm">Agende uma demonstração de produtos em sua fábrica.</p>
              </div>
              <div className="bg-white/5 p-8 border-l-4 border-[#F7B718]">
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Amostras</h4>
                <p className="text-slate-400 text-sm">Receba amostras para testes de dublagem e colagem.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="atendimento" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-20">
          <div className="max-w-6xl mx-auto bg-white shadow-4xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-sm border border-slate-100">
            <div className="p-12 md:p-20 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7B718] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-10 relative z-10">Agende sua <br/><span className="text-[#F7B718]">Solução.</span></h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-[#F7B718] text-[#1B345B] rounded-sm shadow-xl"><Icon name="Phone" /></div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Telefone / WhatsApp</span>
                    <span className="text-xl font-bold">{CONTACT_INFO.phone}</span>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white/5 text-[#F7B718] rounded-sm"><Icon name="Mail" /></div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">E-mail Comercial</span>
                    <span className="text-base font-bold uppercase break-all">{CONTACT_INFO.email}</span>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white/5 text-[#F7B718] rounded-sm"><Icon name="Map" /></div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Escritório Central</span>
                    <span className="text-base font-bold uppercase">{CONTACT_INFO.location} - Polo Industrial</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 md:p-20">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Seu Nome / Empresa</label>
                  <input 
                    type="text" className="w-full p-5 bg-slate-50 border border-slate-100 outline-none focus:border-[#F7B718] focus:bg-white text-sm font-bold transition-all"
                    value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Telefone de Contato</label>
                  <input 
                    type="text" className="w-full p-5 bg-slate-50 border border-slate-100 outline-none focus:border-[#F7B718] focus:bg-white text-sm font-bold transition-all"
                    value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Como podemos ajudar?</label>
                  <textarea 
                    className="w-full p-5 bg-slate-50 border border-slate-100 outline-none focus:border-[#F7B718] focus:bg-white text-sm font-bold transition-all min-h-[140px]"
                    value={formData.mensagem} onChange={(e) => setFormData({...formData, mensagem: e.target.value})} required
                  />
                </div>
                <button type="submit" className="w-full bg-[#1B345B] text-white py-7 font-black uppercase tracking-[0.4em] text-[11px] hover:bg-[#F7B718] hover:text-[#1B345B] transition-all shadow-2xl flex items-center justify-center gap-4">
                  Enviar Solicitação <Icon name="Send" size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">
            <div className="max-w-md">
              <Logo light />
              <p className="mt-12 text-slate-500 text-lg leading-relaxed font-medium">
                Transformando a produção calçadista em Franca através da inovação em materiais e excelência em representação comercial.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-20">
              <div>
                <h5 className="font-black uppercase tracking-[0.3em] text-[10px] text-[#F7B718] mb-10">Site</h5>
                <ul className="space-y-6 text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
                  <li><button onClick={() => scrollToSection('fornecedores')} className="hover:text-white transition-colors">Representadas</button></li>
                  <li><button onClick={() => scrollToSection('atendimento')} className="hover:text-white transition-colors">Atendimento</button></li>
                  <li><a href={getWaLink()} target="_blank" className="hover:text-white transition-colors">Suporte</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-black uppercase tracking-[0.3em] text-[10px] text-[#F7B718] mb-10">Social</h5>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm hover:bg-[#F7B718] hover:text-[#1B345B] transition-all cursor-pointer">
                    <Icon name="Instagram" size={20} />
                  </div>
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm hover:bg-[#F7B718] hover:text-[#1B345B] transition-all cursor-pointer">
                    <Icon name="Linkedin" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.6em] text-center md:text-left">
              © 2026 INFINITY SOLUÇÕES TÊXTEIS | CRISTIANE CALZAVARA REPRESENTAÇÕES
            </p>
            <div className="flex items-center gap-6 opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-[8px] font-black uppercase tracking-widest">Inovação em Franca</span>
              <Logo light />
            </div>
          </div>
        </div>
      </footer>

      {/* STICKY WHATSAPP */}
      <a 
        href={getWaLink()} 
        target="_blank" 
        className="fixed bottom-10 right-10 z-[100] group"
      >
        <div className="absolute -left-48 top-1/2 -translate-y-1/2 bg-white px-6 py-3 shadow-4xl border border-slate-100 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-10 group-hover:translate-x-0 hidden lg:flex items-center gap-3">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <p className="text-[10px] font-black text-[#1B345B] uppercase tracking-[0.2em] whitespace-nowrap">Online agora</p>
        </div>
        <div className="bg-[#25D366] text-white p-6 rounded-full shadow-4xl hover:rotate-[360deg] transition-all duration-700 active:scale-90 relative">
          <Icon name="MessageCircle" size={32} />
        </div>
      </a>
    </div>
  );
};

export default App;
