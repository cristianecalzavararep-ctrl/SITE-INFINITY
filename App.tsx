
import React, { useState, useMemo } from 'react';
import { BRANDS_DATA } from './data';
import Icon from './components/Icon';

const CONTACT_INFO = {
  phone: "(35) 9 8424-8711",
  whatsappNumber: "5535984248711",
  email: "CRISTIANECALZAVARAREP@GMAIL.COM",
  location: "Franca - SP"
};

const CATEGORIES = ['Todas', 'Adesivos', 'Componentes', 'Tecidos', 'Máquinas', 'Embalagens'];

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredBrands = useMemo(() => {
    return BRANDS_DATA.filter(brand => {
      const matchesSearch = 
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        brand.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Todas' || 
        (selectedCategory === 'Adesivos' && brand.id === 'Pollibox') ||
        (selectedCategory === 'Componentes' && (brand.id === 'Espugum' || brand.id === 'SJB' || brand.id === 'Cordex')) ||
        (selectedCategory === 'Tecidos' && brand.id === 'Raima') ||
        (selectedCategory === 'Máquinas' && brand.id === 'Totalmaq') ||
        (selectedCategory === 'Embalagens' && brand.id === 'Dayuse');

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const getWaLink = (brandName: string, type: 'info' | 'visita') => {
    const text = type === 'info' 
      ? `Olá! Vi o site da Infinity e gostaria de receber mais informações sobre a marca ${brandName}.`
      : `Olá! Gostaria de agendar uma visita para tratar dos produtos da ${brandName}.`;
    return `https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsappNumber}&text=${encodeURIComponent(text)}`;
  };

  const getGeneralWaLink = () => {
    const text = `Olá! Seja bem-vindo à Infinity Soluções Têxteis Representações Comerciais. Por favor, escolha uma de nossas representadas para falar com Cristiane:

1. Pollibox Ecoadesivos
2. Espugum - Ortholite Brasil
3. Raima Têxtil
4. Cordex Têxtil
5. Solados SJB
6. Totalmaq Máquinas
7. Dayuse Embalagens

Digite o número correspondente:`;
    return `https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsappNumber}&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-[#F7B718]">
      {/* HEADER ESTRUTURADO */}
      <header className="bg-[#1B345B] text-white sticky top-0 z-50 border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-lg shadow-inner">
               <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#1B345B" d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.5l-2.83 2.83l-2.83-2.83c-.97-.94-2.33-1.5-3.77-1.5c-2.98 0-5.4 2.42-5.4 5.4s2.42 5.4 5.4 5.4c1.44 0 2.8-.56 3.77-1.5l2.83-2.83l2.83 2.83c.97.94 2.33 1.5 3.77 1.5c2.98 0 5.4-2.42 5.4-5.4s-2.42-5.4-5.4-5.4zm-13.2 8.4c-1.65 0-3-1.35-3-3s1.35-3 3-3c.83 0 1.58.34 2.12.88l2.88 2.88l-2.88 2.88c-.54.54-1.29.88-2.12.88zm13.2 0c-.83 0-1.58-.34-2.12-.88l-2.88-2.88l2.88-2.88c.54-.54 1.29-.88 2.12-.88c1.65 0 3 1.35 3 3s-1.35 3-3 3z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter leading-none">INFINITY</h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#F7B718] font-bold">Soluções Têxteis</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center bg-white/10 rounded-lg px-4 py-2 border border-white/5 focus-within:bg-white focus-within:border-[#F7B718] transition-all group">
            <Icon name="Search" size={18} className="text-slate-400 group-focus-within:text-[#1B345B]" />
            <input 
              type="text" 
              placeholder="Buscar marcas ou componentes..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-64 ml-3 outline-none text-white focus:text-slate-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* BANNER INDUSTRIAL PESADO */}
      <section className="bg-[#1B345B] py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 border-2 border-[#F7B718] rounded text-[#F7B718] text-[11px] font-black uppercase tracking-[0.3em]">
            Polo Calçadista Franca - SP
          </div>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
            Representações <br /> <span className="text-[#F7B718]">Comerciais</span>
          </h2>
          <div className="w-24 h-2 bg-[#F7B718] mx-auto mb-8"></div>
          <p className="text-blue-100/60 max-w-2xl mx-auto text-lg md:text-xl font-medium uppercase tracking-widest">
            A ponte entre a tecnologia e a sua fábrica
          </p>
        </div>
      </section>

      {/* FILTROS E BUSCA MOBILE */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-40 overflow-x-auto no-scrollbar py-4 shadow-sm">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded font-black text-[10px] uppercase tracking-widest transition-all border-2 ${
                selectedCategory === cat 
                ? 'bg-[#1B345B] border-[#1B345B] text-white shadow-lg' 
                : 'bg-transparent border-slate-100 text-slate-400 hover:border-[#1B345B] hover:text-[#1B345B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE MARCAS */}
      <main className="container mx-auto px-4 py-16">
        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <div key={brand.id} className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                <div className="h-2 w-full" style={{ backgroundColor: brand.color }}></div>
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 bg-slate-50 flex items-center justify-center border border-slate-100">
                      <Icon name="Factory" size={24} className="text-slate-400" />
                    </div>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Comp. Industrial</span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-[#1B345B] mb-3 uppercase tracking-tighter leading-tight">{brand.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">{brand.description}</p>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-2">
                  <a 
                    href={getWaLink(brand.name, 'info')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#1B345B] text-white py-4 rounded-none text-[11px] font-black uppercase tracking-[0.2em] text-center hover:bg-[#F7B718] hover:text-[#1B345B] transition-all flex items-center justify-center gap-3"
                  >
                    Receber Mais Informações <Icon name="PlusCircle" size={16} />
                  </a>
                  <a 
                    href={getWaLink(brand.name, 'visita')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white border border-slate-200 text-slate-600 py-3 rounded-none text-[10px] font-black uppercase tracking-widest text-center hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    Agendar Visita
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white border border-dashed border-slate-200 rounded-lg">
            <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">Nenhuma marca encontrada</h3>
            <button onClick={() => {setSearchTerm(''); setSelectedCategory('Todas');}} className="mt-4 text-[#F7B718] font-bold uppercase text-xs tracking-widest">Limpar filtros</button>
          </div>
        )}
      </main>

      {/* FOOTER PROFISSIONAL - ELITIZADO */}
      <footer className="bg-white border-t-4 border-[#1B345B] pt-20 pb-10">
        <div className="container mx-auto px-4 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-10 mb-20">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-[#1B345B] mb-2 uppercase tracking-tighter">INFINITY SOLUÇÕES TÊXTEIS</h2>
              <p className="text-slate-400 font-bold uppercase text-[10px] md:text-xs tracking-[0.4em] mb-6">Representação Comercial de Alta Performance</p>
              <div className="w-16 h-1 bg-[#F7B718] mx-auto lg:mx-0"></div>
            </div>
            
            <a 
              href={getGeneralWaLink()}
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative px-10 py-6 bg-[#1B345B] text-[#F7B718] font-black uppercase text-xs tracking-[0.3em] overflow-hidden shadow-2xl transition-all hover:bg-[#1B345B] hover:text-white flex items-center gap-4 border-2 border-[#1B345B] w-full lg:w-auto justify-center"
            >
              <div className="absolute inset-0 w-1/4 h-full bg-white/5 skew-x-[-20deg] group-hover:left-full transition-all duration-700 -left-1/4"></div>
              <Icon name="Send" size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
              Solicitar Atendimento Personalizado
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 border-t border-slate-100 text-sm">
            <div>
              <p className="font-black text-slate-300 uppercase text-[10px] tracking-widest mb-3">Localização</p>
              <p className="font-bold text-[#1B345B] uppercase tracking-wider">{CONTACT_INFO.location}</p>
            </div>
            <div>
              <p className="font-black text-slate-300 uppercase text-[10px] tracking-widest mb-3">Contato Direto</p>
              <p className="font-bold text-[#1B345B]">{CONTACT_INFO.phone}</p>
            </div>
            <div>
              <p className="font-black text-slate-300 uppercase text-[10px] tracking-widest mb-3">E-mail Corporativo</p>
              <p className="font-bold text-[#1B345B] uppercase text-[11px]">{CONTACT_INFO.email}</p>
            </div>
            <div className="md:text-right">
              <p className="font-black text-slate-200 uppercase text-[10px] tracking-widest mb-3">© 2026</p>
              <p className="font-bold text-slate-400">TODOS OS DIREITOS RESERVADOS</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
