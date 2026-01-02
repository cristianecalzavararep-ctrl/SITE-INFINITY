
import { GoogleGenAI, Type } from "@google/genai";
import { Product, BlogPost } from "../types";

export interface AISearchResult {
  ids: string[];
  message: string;
}

// Função auxiliar para limpar markdown da resposta da IA
const cleanAIResponse = (text: string) => {
  return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const searchProductsWithAI = async (query: string, products: Product[]): Promise<AISearchResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return { ids: [], message: "Configuração de IA pendente no servidor. Por favor, contate a Cristiane via WhatsApp para suporte técnico." };
  }

  const ai = new GoogleGenAI({ apiKey });
  
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
6. Forneça respostas técnicas profissionais, curtas e em português.`,
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

    const text = cleanAIResponse(response.text || "{}");
    return JSON.parse(text);
  } catch (error) {
    console.error("Erro na busca IA:", error);
    return { ids: [], message: "No momento estamos operando em modo manual. Clique no botão abaixo para falar diretamente com nossa equipe." };
  }
};

export const getIndustryNews = async (): Promise<BlogPost[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return [];

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Gere exatamente 5 posts de tendências reais do setor calçadista para 2026.
Foque em: Tecnologias de palminhas Ortholite, adesivos ecológicos Pollibox e cores Pantone 2026.
Retorne um ARRAY de objetos JSON com: id, title, excerpt, brand, date, image (links reais do Unsplash).`,
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
    
    const text = cleanAIResponse(response.text || "[]");
    return JSON.parse(text);
  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
    return [];
  }
};
