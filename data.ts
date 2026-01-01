
import { Product, Brand } from './types';

export const BRANDS_DATA: Brand[] = [
  { 
    id: 'Pollibox', 
    name: 'Pollibox Ecoadesivos', 
    color: '#1B345B',
    description: 'Explore nossa linha de filmes adesivos, desenvolvidos com tecnologia de ponta para proporcionar colagem superior e confiável em uma ampla gama de materiais. Entretelas: Temos diversos tecidos com filme adesivo termorreativo aplicado, tanto para reforço com costura quanto sem costura, utilizados na estruturação e formação de cambrê. Filmes TPU.'
  },
  { 
    id: 'Espugum', 
    name: 'Espugum - Ortholite Brasil', 
    color: '#2563eb',
    description: 'Fabricante oficial da tecnologia Ortholite no Brasil. Produção de palmilhas de alta performance com células abertas, respirabilidade máxima e conforto duradouro.'
  },
  { 
    id: 'Raima', 
    name: 'Raima Têxtil', 
    color: '#059669',
    description: 'Especialista em tecidos para forração e cabedal. Oferece dublagens técnicas de alta resistência e desenvolvimento exclusivo de cores Pantone para grandes marcas.'
  },
  { 
    id: 'Cordex', 
    name: 'Cordex Têxtil', 
    color: '#dc2626',
    description: 'Referência em cordões, atacadores e elásticos industriais. Produtos com alta estabilidade dimensional e resistência à tração para o setor calçadista.'
  },
  { 
    id: 'SJB', 
    name: 'Solados SJB', 
    color: '#d97706',
    description: 'SOLADOS FEMININOS EM PU, MICRO, TR. Combinação de design fashion com tecnologias de injeção direta que garantem leveza e durabilidade.'
  },
  { 
    id: 'Totalmaq', 
    name: 'Totalmaq Máquinas', 
    color: '#4b5563',
    description: 'Tecnologia avançada em máquinas para dublagem, costura e automação industrial. Suporte técnico especializado e alta produtividade para sua fábrica.'
  },
  { 
    id: 'Dayuse', 
    name: 'Dayuse Embalagens', 
    color: '#22c55e', // Verde conforme solicitado
    description: 'Especialista em embalagens flexíveis: Zip Lock (liso e personalizado), envelopes plásticos para e-commerce e embalagens autoadesivas transparentes.'
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'd1',
    name: 'Zip Lock Liso e Personalizado',
    brand: 'Dayuse',
    description: 'Embalagens Zip Lock de alta qualidade, disponíveis em versões lisas ou personalizadas com sua marca.',
    technicalSpecs: ['Polietileno de Alta Densidade', 'Fechamento Hermético'],
    category: 'Embalagem',
    image: '',
    tags: ['zip lock', 'personalizado']
  }
];
