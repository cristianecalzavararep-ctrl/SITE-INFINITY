
import React, { useState, useEffect } from 'react';
import { BRANDS_DATA } from './data';
import Icon from './components/Icon';

const CONTACT_INFO = {
  phone: "(35) 9 8424-8711",
  whatsappUrl: "https://wa.me/5535984248711",
  whatsappWelcomeMsg: "Olá! Gostaria de mais informações sobre os produtos da Infinity.",
  email: "CRISTIANECALZAVARAREP@GMAIL.COM",
  location: "Franca - SP"
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
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

  const waLink = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(CONTACT_INFO.whatsappWelcomeMsg)}`;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `SOLICITAÇÃO DE ATENDIMENTO - INFINITY\n\nNome: ${formData.nome}\nE-mail: ${formData.email}\nTelefone: ${formData.telefone}\n\nDúvida/Não encontrou: ${formData.mensagem}`;
    window.open(`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const Logo = ({ light = false }: { light?: boolean }) => (
    <div className="flex items-center gap-2">
      <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={light ? "#FFFFFF" : "#1B345B"} d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.5l-2.83 2.83l-2.83-2.83c-.97-.94-2.33-1.5-3.77-1.5c-2.98 0-5.4 2.42-5.4 5.4s2.42 5.4 5.4 5.4c1.44 0 2.8-.56 3.77-1.5l2.83-2.83l2.83 2.83c.97.94 2.33 1.5 3.77 1.5c2.98 0 5.4-2.42 5.4-5.4s-2.42-5.4-5.4-5.4zm-13.2 8.4c-1.65 0-3-1.35-3-3s1.35-3 3-3c.83 0 1.58.34 2.12.88l2.88 2.88l-2.88 2.88c-.54.54-1.29.88-2.12.88zm13.2 0c-.83 0-1.58-.34-2.12-.88l-2.88-2.88l2.88-2.88c.54-.54 1.29-.88 2.12-.88c1.65 0 3 1.35 3 3s-1.35 3-3 3z"/>
        <path fill="#F7B718" d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.5l-2.83 2.83l2.83 2.83c.97.94 2.33 1.5 3.77 1.5c2.98 0 5.4-2.42 5.4-5.4s-2.42-5.4-5.4-5.4zm3 5.4c0 1.65-1.35 3-3 3c-.83 0-1.58-.34-2.12-.88l-2.88-2.88l2.88-2.88c.54-.54 1.29-.88 2.12-.88c1.65 0 3 1.35 3 3z"/>
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`text-base md:text-lg font-black tracking-tighter ${light ? 'text-white' : 'text-[#1B345B]'}`}>INFINITY</span>
        <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#F7B718]">Soluções Têxteis</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-[#F7B718]/30">
      
      {/* HEADER */}
      <header className={`fixed top-0 w-full h-20 z-50 transition-all duration-300 flex items-center justify-between px-6 md:px-20 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm h-16' : 'bg-transparent'}`}>
        <Logo light={!scrolled} />
        
        <nav className="hidden lg:flex items-center gap-10">
          <button onClick={() => scrollToSection('fornecedores')} className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${scrolled ? 'text-[#1B345B]' : 'text-white'} hover:text-[#F7B718]`}>Fornecedores</button>
          <a href={waLink} target="_blank" className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${scrolled ? 'bg-[#1B345B] text-white' : 'bg-[#F7B718] text-[#1B345B]'}`}>
            Aguardamos seu contato
          </a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Moda Calçados"
          />
          <div className="absolute inset-0 bg-[#1B345B]/80"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-20 relative z-10 text-center md:text-left">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
              TECNOLOGIA DE PONTA <br/>
              PARA O SEU <span className="text-[#F7B718]">CALÇADO.</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-10">
              Soluções estratégicas em componentes para a indústria calçadista. Materiais de alta performance e inovação constante.
            </p>
            <div className="flex justify-center md:justify-start">
              <button onClick={() => scrollToSection('fornecedores')} className="bg-[#F7B718] text-[#1B345B] px-12 py-5 font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all shadow-xl">
                Ver Fornecedores
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* REPRESENTADAS */}
      <section id="fornecedores" className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-20">
          <div className="mb-12 border-l-4 border-[#F7B718] pl-6">
            <h2 className="text-[#1B345B] text-3xl font-black uppercase tracking-tighter mb-1">Nossas Representadas</h2>
            <p className="text-slate-500 font-medium text-sm">Qualidade e tecnologia para sua indústria.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRANDS_DATA.map((brand) => (
              <div key={brand.id} className="group p-6 bg-slate-50 hover:bg-[#1B345B] transition-all duration-500 flex flex-col justify-between border border-slate-100 min-h-[250px]">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tighter mb-3 group-hover:text-[#F7B718] transition-colors">{brand.name}</h3>
                  <p className="text-slate-500 group-hover:text-slate-300 text-xs leading-relaxed">
                    {brand.description}
                  </p>
                </div>
                <div className="mt-6">
                  <a href={waLink} target="_blank" className="text-[9px] font-black uppercase tracking-widest text-[#1B345B] group-hover:text-white flex items-center gap-2">
                    Aguardamos seu contato <Icon name="ArrowRight" size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO DE ATENDIMENTO */}
      <section id="atendimento" className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-6 md:px-20 max-w-4xl">
          <div className="bg-white p-8 md:p-10 shadow-sm border border-slate-200 rounded-sm">
            <div className="text-center mb-10">
              <h3 className="text-[#1B345B] text-2xl font-black uppercase tracking-tighter mb-2">Solicitação de Atendimento</h3>
              <p className="text-slate-500 font-medium text-xs">Preencha o formulário e nossa equipe entrará em contato.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Nome" 
                  className="w-full p-3 bg-slate-50 border border-slate-100 outline-none focus:border-[#F7B718] text-xs font-medium"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                />
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  className="w-full p-3 bg-slate-50 border border-slate-100 outline-none focus:border-[#F7B718] text-xs font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Telefone" 
                  className="w-full p-3 bg-slate-50 border border-slate-100 outline-none focus:border-[#F7B718] text-xs font-medium"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <textarea 
                  placeholder="Dúvida / O que não encontrou?" 
                  className="w-full h-full p-3 bg-slate-50 border border-slate-100 outline-none focus:border-[#F7B718] text-xs font-medium min-h-[120px]"
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                  required
                />
                <button type="submit" className="w-full bg-[#1B345B] text-white py-4 font-black uppercase tracking-widest text-[10px] hover:bg-[#F7B718] hover:text-[#1B345B] transition-all">
                  Enviar Solicitação
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CONTATO COMPACTO */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 border-t border-slate-50 pt-10">
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={16} className="text-[#F7B718]" />
              <div>
                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Telefone</p>
                <p className="font-bold text-sm text-[#1B345B]">{CONTACT_INFO.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Mail" size={16} className="text-[#F7B718]" />
              <div>
                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">E-mail</p>
                <p className="font-bold text-sm text-[#1B345B] uppercase">{CONTACT_INFO.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={16} className="text-[#F7B718]" />
              <div>
                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Sede</p>
                <p className="font-bold text-sm text-[#1B345B]">{CONTACT_INFO.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-slate-50">
        <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-4">
          <Logo />
          <p className="text-[7px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            © 2026 INFINITY REPRESENTAÇÕES - FRANCA/SP
          </p>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href={waLink} target="_blank" className="fixed bottom-6 right-6 z-50">
        <div className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
          <Icon name="MessageCircle" size={24} />
        </div>
      </a>
    </div>
  );
};

export default App;
