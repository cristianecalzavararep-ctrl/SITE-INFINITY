
import { GoogleGenAI, Type } from "@google/genai";
import { Product, BlogPost } from "../types";

// Always use process.env.API_KEY directly as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AISearchResult {
  ids: string[];
  message: string;
}

export const searchProductsWithAI = async (query: string, products: Product[]): Promise<AISearchResult> => {
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
3. Espugum: Fabricante Oficial Ortholite no Brasil.
4. Raima: Têxteis com cores Pantone e dublagens especiais.
5. Pollibox: Adesivos base água ecológicos, filmes TPU e entretelas para cambrê.
6. Forneça respostas técnicas baseadas apenas nestas informações.`,
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

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Erro na busca IA:", error);
    return { ids: [], message: "" };
  }
};

export const getIndustryNews = async (): Promise<BlogPost[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Gere 6 posts informativos de ALTO NÍVEL focados em TENDÊNCIAS 2025/2026 e notícias atuais baseadas nos perfis oficiais:
- Pantone (@pantone) -> Antecipação da Cor do Ano 2026 e paletas para o verão 25/26.
- Abicalçados (@abicalcadosoficial) -> Projeções de exportação e feiras internacionais 2026.
- Arezzo, Adidas, Ferracini, Klin, Pampilli, Carmen Steffens e Mazuque.

REGRAS:
1. USE GOOGLE SEARCH para encontrar posts reais, lançamentos de coleções 2026 e anúncios de tendências recentes.
2. O conteúdo deve ser "Forward-looking" (olhando para o futuro da indústria).
3. Títulos devem evocar exclusividade e elitismo (ex: "O Futuro Cromático: Projeções Pantone 2026").
4. Use imagens do Unsplash que representem design futurista, luxo e tecnologia de ponta.
5. Retorne obrigatoriamente um ARRAY de objetos JSON.`,
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
    
    const text = response.text || "[]";
    const posts: BlogPost[] = JSON.parse(text);

    // Extrair links de grounding se disponíveis para dar mais veracidade
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && Array.isArray(chunks)) {
      posts.forEach((post, index) => {
        const chunk = chunks[index % chunks.length];
        if (chunk?.web?.uri) {
          post.sourceUrl = chunk.web.uri;
        }
      });
    }

    return posts;
  } catch (error) {
    console.error("Erro ao carregar notícias 2026:", error);
    return [];
  }
};
