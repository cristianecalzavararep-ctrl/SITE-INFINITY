
export interface Product {
  id: string;
  name: string;
  brand: 'Pollibox' | 'Espugum' | 'Raima' | 'Cordex' | 'SJB' | 'Totalmaq' | 'Dayuse';
  description: string;
  technicalSpecs: string[];
  category: string;
  image: string;
  tags: string[];
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  color: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  brand: string;
  date: string;
  image: string;
  sourceUrl?: string;
}

export type ViewState = 'catalog' | 'details' | 'contact' | 'blog';

export interface Lead {
  name: string;
  email: string;
  company: string;
  phone: string;
  interest: string;
  message: string;
}
