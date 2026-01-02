
import { GoogleGenAI, Type } from "@google/genai";
import { Product, BlogPost } from "../types";

export interface AISearchResult {
  ids: string[];
  message: string;
}

export const searchProductsWithAI = async (query: string, products: Product[]): Promise<AISearchResult> => {
  // Inicialização local para garantir que pegue o process.env.API_KEY atualizado
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const productContext = products.map(p => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      description: p.description,
      category: p.category
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você é o Consultor Técnico da Infinity Soluções Têxteis Representações Comerciais.
O usuário enviou esta dúvida/pedido: "${query}".
Seu catálogo disponível: ${JSON.stringify(productContext)}.

Instruções Cruciais de Fidelidade:
1. Dayuse: Foco em Zip Lock (liso/personalizado), Envelopes para E-commerce e Autoadesivos Transparentes.
2. SJB: SEMPRE use a descrição: "SOLADOS FEMININOS EM PU, MICRO, TR".
3. Espugum: Fabricante Oficial Ortholite no Brasil. Destaque a tecnologia Ortholite Foam (espuma de célula aberta).
4. Raima: Têxteis com cores Pantone e dublagens especiais.
5. Pollibox: Adesivos base água ecológicos, filmes TPU e entretelas para cambrê.
6. Forneça respostas técnicas profissionais e curtas.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ids: { type: Type.ARRAY, items: { type: Type.STRING } },
            message: { type: Type.STRING, description: "Uma explicação técnica verídica e profissional." }
          },
          required: ["ids", "message"]
        }
      }
    });

    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Erro na busca IA:", error);
    return { ids: [], message: "Estamos com alta demanda na consultoria digital. Por favor, clique no botão do WhatsApp abaixo para falar agora mesmo com a Cristiane Calzavara." };
  }
};

export const getIndustryNews = async (): Promise<BlogPost[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Gere 5 posts de tendências exclusivas para o setor calçadista 2026.
Foque em: Ortholite Foam, Sustentabilidade Pollibox, Cores Pantone 2026 e Têxteis Raima.
Retorne um ARRAY de objetos JSON com id, title, excerpt, brand, date, image.
Use imagens de alta qualidade do Unsplash relacionadas a couro, tecidos, design de calçados e tecnologia.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              brand: { type: Type.STRING },
              date: { type: Type.STRING },
              image: { type: Type.STRING }
            },
            required: ["id", "title", "excerpt", "brand", "date", "image"]
          }
        }
      }
    });
    
    const text = response.text?.trim() || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
    return [];
  }
};
