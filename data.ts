
import { Product, Brand } from './types';

export const BRANDS_DATA: Brand[] = [
  { 
    id: 'Pollibox', 
    name: 'Pollibox Ecoadesivos', 
    color: '#1B345B',
    description: 'Líder em adesivos termocolantes e filmes TPU. Tecnologia limpa para colagens de alta performance sem solventes.'
  },
  { 
    id: 'Espugum', 
    name: 'Espugum - Ortholite Brasil', 
    color: '#2563eb',
    description: 'Fabricante oficial da tecnologia Ortholite. Palmilhas com 95% de respirabilidade e controle de umidade.'
  },
  { 
    id: 'Raima', 
    name: 'Raima Têxtil', 
    color: '#059669',
    description: 'Especialista em tecidos técnicos, forros e dublagens com precisão de cores Pantone.'
  },
  { 
    id: 'Cordex', 
    name: 'Cordex Têxtil', 
    color: '#dc2626',
    description: 'Cordões, atacadores e elásticos industriais de alta resistência e durabilidade.'
  },
  { 
    id: 'SJB', 
    name: 'Solados SJB', 
    color: '#d97706',
    description: 'SOLADOS FEMININOS EM PU, MICRO, TR. Design e leveza para o mercado de moda.'
  },
  { 
    id: 'Totalmaq', 
    name: 'Totalmaq Máquinas', 
    color: '#4b5563',
    description: 'Maquinário de ponta para automação e dublagem industrial.'
  },
  { 
    id: 'Dayuse', 
    name: 'Dayuse Embalagens', 
    color: '#22c55e',
    description: 'Soluções em plásticos flexíveis: Zip Lock, envelopes de segurança e autoadesivos.'
  },
];

export const PRODUCTS: Product[] = [
  // DAYUSE
  {
    id: 'day-01',
    name: 'Zip Lock Personalizado',
    brand: 'Dayuse',
    description: 'Sacos com fechamento hermético personalizados com a logomarca da sua fábrica.',
    technicalSpecs: ['Polietileno de baixa densidade', 'Impressão em até 4 cores', 'Fechamento trilho'],
    category: 'Embalagem',
    image: 'https://images.unsplash.com/photo-1605600611284-195205e0ae85?q=80&w=800&auto=format&fit=crop',
    tags: ['embalagem', 'zip lock', 'personalizado']
  },
  {
    id: 'day-02',
    name: 'Envelope E-commerce',
    brand: 'Dayuse',
    description: 'Envelopes de segurança com fita autoadesiva inviolável para envios postais.',
    technicalSpecs: ['Plástico Coextrusado', 'Fita Hot-Melt Inviolável', 'Interior em Blackout'],
    category: 'Embalagem',
    image: 'https://images.unsplash.com/photo-1589793463357-5fb813435467?q=80&w=800&auto=format&fit=crop',
    tags: ['e-commerce', 'envios', 'segurança']
  },
  // POLLIBOX
  {
    id: 'pol-01',
    name: 'Filme Adesivo Termo-Reativo',
    brand: 'Pollibox',
    description: 'Filme para colagem de cabedais e reforços sem a necessidade de adesivos líquidos.',
    technicalSpecs: ['Ativação térmica 70°C-90°C', 'Eco-friendly', 'Alta resistência mecânica'],
    category: 'Adesivos',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
    tags: ['colagem', 'tecnologia', 'sustentável']
  },
  // SJB
  {
    id: 'sjb-01',
    name: 'Solado Feminino Casual PU',
    brand: 'SJB',
    description: 'SOLADOS FEMININOS EM PU, MICRO, TR. Leveza extrema e acabamento premium.',
    technicalSpecs: ['Material: PU de alta densidade', 'Textura antiderrapante', 'Design Fashion 2026'],
    category: 'Solados',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
    tags: ['solados', 'feminino', 'conforto']
  },
  // ORTHOLITE
  {
    id: 'ortho-01',
    name: 'Palmilha Ortholite Hybrid',
    brand: 'Espugum',
    description: 'Tecnologia mundial líder em conforto. Mantém 95% do amortecimento após o primeiro ano.',
    technicalSpecs: ['Células abertas respiráveis', 'Lavável à máquina', 'Antimicrobiano'],
    category: 'Componentes',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop',
    tags: ['palmilha', 'ortholite', 'performance']
  }
];
