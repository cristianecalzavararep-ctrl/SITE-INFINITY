
import { Product, Brand, BlogPost } from './types';

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
    color: '#F7B718',
    description: 'Fabricante oficial da tecnologia Ortholite. Palmilhas com 95% de respirabilidade e controle de umidade.'
  },
  { 
    id: 'Raima', 
    name: 'Raima Têxtil', 
    color: '#22C55E',
    description: 'Especialista em tecidos técnicos, forros e dublagens com precisão de cores Pantone para coleções.'
  },
  { 
    id: 'Cordex', 
    name: 'Cordex Têxtil', 
    color: '#EF4444',
    description: 'Cordões, atacadores e elásticos industriais de alta resistência e durabilidade premium.'
  },
  { 
    id: 'SJB', 
    name: 'Solados SJB', 
    color: '#F59E0B',
    description: 'Solados femininos em PU, MICRO e TR. O equilíbrio perfeito entre design, leveza e moda.'
  },
  { 
    id: 'Totalmaq', 
    name: 'Totalmaq Máquinas', 
    color: '#64748B',
    description: 'Maquinário de ponta para automação e dublagem industrial. Eficiência em larga escala.'
  },
  { 
    id: 'Dayuse', 
    name: 'Dayuse Embalagens', 
    color: '#10B981',
    description: 'Soluções em plásticos flexíveis: Zip Lock, envelopes de segurança e autoadesivos personalizados.'
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'trend-1',
    title: 'Franca: O Hub da Inovação 2026',
    excerpt: 'Como o polo calçadista mineiro e paulista estão se preparando para a revolução dos materiais inteligentes e sustentáveis.',
    brand: 'Infinity News',
    date: 'Maio 2024',
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'trend-2',
    title: 'A Era dos Ecoadesivos',
    excerpt: 'Por que a tecnologia termocolante da Pollibox está substituindo as colas tradicionais em fábricas de alta produtividade.',
    brand: 'Tecnologia',
    date: 'Maio 2024',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'trend-3',
    title: 'Conforto Ortholite no Brasil',
    excerpt: 'O impacto da respirabilidade e do amortecimento de longo prazo na fidelização do consumidor final de calçados casuais.',
    brand: 'Componentes',
    date: 'Maio 2024',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'pol-01',
    name: 'Filme Adesivo Termo-Reativo',
    brand: 'Pollibox',
    description: 'Filme para colagem de cabedais e reforços sem a necessidade de adesivos líquidos ou solventes.',
    technicalSpecs: ['Ativação 70°C', 'Eco-friendly', 'Resistência UV'],
    category: 'Adesivos',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
    tags: ['colagem', 'tecnologia', 'sustentável']
  },
  {
    id: 'ortho-01',
    name: 'Palmilha Ortholite Hybrid',
    brand: 'Espugum',
    description: 'Palmilha de alta performance com células abertas para máxima respirabilidade.',
    technicalSpecs: ['Lavável', 'Antimicrobiano', '95% Amortecimento'],
    category: 'Componentes',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop',
    tags: ['conforto', 'premium']
  }
];
