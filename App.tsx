
import React, { useState, useEffect } from 'react';
import { BRANDS_DATA } from './data';
import Icon from './components/Icon';

const CONTACT_INFO = {
  phone: "(35) 9 8424-8711",
  whatsappUrl: "https://wa.me/5535984248711",
  whatsappWelcomeMsg: "Olá! Seja bem-vindo à Infinity Soluções Têxteis Representações Comerciais. Por favor, escolha uma de nossas representadas para falar com Cristiane:\n\n1. Pollibox Ecoadesivos\n2. Espugum - Ortholite Brasil\n3. Raima Têxtil\n4. Cordex Têxtil\n5. Solados SJB\n6. Totalmaq Máquinas\n7. Dayuse Embalagens\n\nDigite o número correspondente:",
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
    <div className="flex items-center gap-2 select-none cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
      <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={light ? "#FFFFFF" : "#1B345B"} d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.5l-2.83 2.83l-2.83-2.83c-.97-.94-2.33-1.5-3.77-1.5c-2.98 0-5.4 2.42-5.4 5.4s2.42 5.4 5.4 5.4c1.44 0 2.8-.56 3.77-1.5l2.83-2.83l2.83 2.83c.97.94 2.33 1.5 3.77 1.5c2.98 0 5.4-2.42 5.4-5.4s-2.42-5.4-5.4-5.4zm-13.2 8.4c-1.65 0-3-1.35-3-3s1.35-3 3-3c.83 0 1.58.34 2.12.88l2.88 2.88l-2.88 2.88c-.54.54-1.29.88-2.12.88zm13.2 0c-.83 0-1.58-.34-2.12-.88l-2.88-2.88l2.88-2.88c.54-.54 1.29-.88 2.12-.88c1.65 0 3 1.35 3 3s-1.35 3-3 3z"/>
        <path fill="#F7B718" d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.5l-2.83 2.83l2.83 2.83c.97.94 2.33 1.5 3.77 1.5c2.98 0 5.4-2.42 5.4-5.4s-2.42-5.4-5.4-5.4zm3 5.4c0 1.65-1.35 3-3 3c-.83 0-1.58-.34-2.12-.88l-2.88-2.88l2.88-2.88c.54-.54 1.29-.88 2.12-.88c1.65 0 3 1.35 3 3z"/>
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`text-base md:text-xl font-black tracking-tighter ${light ? 'text-white' : 'text-[#1B345B]'}`}>INFINITY</span>
        <span className="text-[7px] font-bold uppercase tracking-[0.25em] text-[#F7B718]">Soluções Têxteis</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-[#F7B718]/30">
      
      {/* HEADER */}
      <header className={`fixed top-0 w-full h-20 z-50 transition-all duration-500 flex items-center justify-between px-6 md:px-20 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-xl h-16' : 'bg-transparent'}`}>
        <Logo light={!scrolled} />
        
        <nav className="hidden lg:flex items-center gap-12">
          <button onClick={() => scrollToSection('fornecedores')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${scrolled ? 'text-[#1B345B]' : 'text-white'} hover:text-[#F7B718]`}>Representadas</button>
          <button onClick={() => scrollToSection('atendimento')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${scrolled ? 'text-[#1B345B]' : 'text-white'} hover:text-[#F7B718]`}>Atendimento</button>
          <a href={waLink} target="_blank" className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105 active:scale-95 ${scrolled ? 'bg-[#1B345B] text-white shadow-lg' : 'bg-[#F7B718] text-[#1B345B] shadow-2xl'}`}>
            Falar no WhatsApp
          </a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover scale-105"
            alt="Fábrica de Calçados de Alta Tecnologia"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B345B] via-[#1B345B]/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block bg-[#F7B718] text-[#1B345B] px-4 py-1.5 mb-6 text-[9px] font-black uppercase tracking-[0.3em]">
              Franca - SP | Brasil
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-white leading-[0.9] mb-10 uppercase tracking-tighter">
              TECNOLOGIA <br/>
              PARA <span className="text-[#F7B718]">PRODUÇÃO</span> <br/>
              CALÇADISTA.
            </h1>
            <p className="text-slate-200 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed mb-12 border-l-2 border-[#F7B718] pl-6">
              Infinity Soluções Têxteis: Representação estratégica de componentes, adesivos e máquinas para a indústria de calçados e artefatos.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => scrollToSection('fornecedores')} className="bg-[#F7B718] text-[#1B345B] px-14 py-6 font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all shadow-3xl text-center transform hover:-translate-y-1">
                Conhecer Marcas
              </button>
              <a href={waLink} target="_blank" className="bg-transparent border-2 border-white/30 text-white px-14 py-6 font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-[#1B345B] hover:border-white transition-all text-center backdrop-blur-sm">
                Falar com Cristiane
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-20 animate-bounce text-white/40 hidden lg:block">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] rotate-90 origin-left translate-y-20">Scroll</p>
          <Icon name="ChevronDown" size={32} />
        </div>
      </section>

      {/* REPRESENTADAS - GRID MAIS PREMIUM */}
      <section id="fornecedores" className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
            <div className="max-w-3xl">
              <h2 className="text-[#1B345B] text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">Nossas <span className="text-[#F7B718]">Representadas</span></h2>
              <p className="text-slate-500 text-xl font-medium leading-relaxed">
                Selecionamos parceiros que entregam tecnologia sustentável, durabilidade e produtividade para a sua fábrica.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {BRANDS_DATA.map((brand) => (
              <div key={brand.id} className="group relative p-12 bg-white hover:bg-[#1B345B] transition-all duration-700 flex flex-col justify-between border border-slate-100 min-h-[360px] shadow-sm hover:shadow-4xl overflow-hidden rounded-sm">
                <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-10 transition-all duration-700 group-hover:rotate-12">
                  <Icon name="Layers" size={200} className="text-[#F7B718]" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-1.5 bg-[#F7B718] mb-8 transition-all group-hover:w-24"></div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 group-hover:text-[#F7B718] transition-colors leading-tight">
                    {brand.name.split(' - ')[0]}
                    {brand.name.includes(' - ') && <span className="block text-sm text-slate-400 group-hover:text-slate-300 mt-1 font-bold">{brand.name.split(' - ')[1]}</span>}
                  </h3>
                  <p className="text-slate-500 group-hover:text-slate-300 text-sm font-medium leading-relaxed">
                    {brand.description}
                  </p>
                </div>
                
                <div className="mt-12 relative z-10">
                  <a href={waLink} target="_blank" className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1B345B] group-hover:text-[#F7B718] flex items-center gap-4 transition-all">
                    Solicitar Info <Icon name="Plus" size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO - DESIGN MAIS LIMPO */}
      <section id="atendimento" className="py-32 bg-slate-50 relative">
        <div className="container mx-auto px-6 md:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-[#1B345B] text-5xl font-black uppercase tracking-tighter mb-10">Suporte Técnico e <span className="text-[#F7B718]">Comercial</span></h3>
              <p className="text-slate-600 mb-12 text-lg leading-relaxed">
                Estamos localizados no coração do polo calçadista de Franca, facilitando o atendimento presencial, entrega de amostras e suporte técnico imediato.
              </p>
              
              <div className="space-y-10">
                <div className="flex items-center gap-6 group">
                  <div className="bg-[#1B345B] w-16 h-16 flex items-center justify-center rounded-sm text-[#F7B718] shadow-xl group-hover:bg-[#F7B718] group-hover:text-[#1B345B] transition-all">
                    <Icon name="Target" size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#1B345B] uppercase text-sm tracking-widest mb-1">Foco no Cliente</h4>
                    <p className="text-slate-400 text-sm font-bold">Soluções sob medida para sua necessidade.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="bg-[#1B345B] w-16 h-16 flex items-center justify-center rounded-sm text-[#F7B718] shadow-xl group-hover:bg-[#F7B718] group-hover:text-[#1B345B] transition-all">
                    <Icon name="Activity" size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-[#1B345B] uppercase text-sm tracking-widest mb-1">Alta Performance</h4>
                    <p className="text-slate-400 text-sm font-bold">Aumente sua produtividade em 2026.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white p-12 shadow-4xl border-t-8 border-[#F7B718] rounded-sm">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Empresa / Contato</label>
                      <input 
                        type="text" className="w-full p-5 bg-slate-50 border border-slate-100 outline-none focus:border-[#F7B718] focus:bg-white text-xs font-bold transition-all"
                        value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp</label>
                      <input 
                        type="text" className="w-full p-5 bg-slate-50 border border-slate-100 outline-none focus:border-[#F7B718] focus:bg-white text-xs font-bold transition-all"
                        value={formData.telefone} onChange={(e) => setFormData({...formData, telefone: e.target.value})} required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
                    <input 
                      type="email" className="w-full p-5 bg-slate-50 border border-slate-100 outline-none focus:border-[#F7B718] focus:bg-white text-xs font-bold transition-all"
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Mensagem</label>
                    <textarea 
                      className="w-full p-5 bg-slate-50 border border-slate-100 outline-none focus:border-[#F7B718] focus:bg-white text-xs font-bold transition-all min-h-[140px]"
                      value={formData.mensagem} onChange={(e) => setFormData({...formData, mensagem: e.target.value})} required
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#1B345B] text-white py-6 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-[#F7B718] hover:text-[#1B345B] transition-all shadow-2xl flex items-center justify-center gap-4">
                    Falar com Atendimento <Icon name="ArrowRight" size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - INDUSTRIAL & PROFISSIONAL */}
      <footer className="bg-[#1B345B] text-white pt-32 pb-16">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 md:col-span-2">
              <Logo light />
              <p className="mt-10 text-slate-400 max-w-sm text-lg leading-relaxed font-medium">
                Conectando a indústria calçadista às soluções tecnológicas mais avançadas do mercado global.
              </p>
              <div className="flex gap-6 mt-10">
                <div className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-[#F7B718] hover:text-[#1B345B] transition-all cursor-pointer rounded-sm">
                  <Icon name="Instagram" size={20} />
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-[#F7B718] hover:text-[#1B345B] transition-all cursor-pointer rounded-sm">
                  <Icon name="Linkedin" size={20} />
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-black uppercase tracking-[0.3em] text-[10px] text-[#F7B718] mb-10">Mapa do Site</h5>
              <ul className="space-y-5 text-slate-400 font-bold text-xs uppercase tracking-widest">
                <li><button onClick={() => scrollToSection('fornecedores')} className="hover:text-white transition-colors">Representadas</button></li>
                <li><button onClick={() => scrollToSection('atendimento')} className="hover:text-white transition-colors">Solicitar Visita</button></li>
                <li><a href={waLink} target="_blank" className="hover:text-white transition-colors">Canal do WhatsApp</a></li>
                <li><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">Enviar E-mail</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-black uppercase tracking-[0.3em] text-[10px] text-[#F7B718] mb-10">Contato Direto</h5>
              <div className="space-y-6 text-slate-400 font-bold text-sm uppercase tracking-wider">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={16} className="text-[#F7B718]" />
                  <span>{CONTACT_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={16} className="text-[#F7B718]" />
                  <span>{CONTACT_INFO.location}</span>
                </div>
                <p className="text-[10px] leading-relaxed opacity-50 font-medium">
                  Atendimento de Segunda a Sexta<br/>das 08h às 18h.
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] text-center md:text-left">
              © 2026 INFINITY SOLUÇÕES TÊXTEIS | CRISTIANE CALZAVARA
            </p>
            <div className="flex items-center gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <span className="text-[8px] font-black uppercase tracking-widest mr-2">Tecnologia</span>
              <div className="h-4 w-px bg-white/20"></div>
              <Logo light />
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT - O BOTÃO QUE VENDE */}
      <a href={waLink} target="_blank" className="fixed bottom-10 right-10 z-[100] group flex items-center gap-4">
        <div className="bg-white px-8 py-4 rounded-sm shadow-4xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-10 group-hover:translate-x-0 hidden lg:block">
          <p className="text-[11px] font-black text-[#1B345B] uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Online Agora
          </p>
        </div>
        <div className="bg-[#25D366] text-white p-6 rounded-full shadow-4xl hover:scale-110 transition-all active:scale-90 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <Icon name="MessageCircle" size={32} className="relative z-10" />
        </div>
      </a>
    </div>
  );
};

export default App;
