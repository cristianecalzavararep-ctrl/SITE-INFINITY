
import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost } from "../types";

export const getIndustryNews = async (): Promise<BlogPost[]> => {
  // Fix: Initializing GoogleGenAI client with apiKey from process.env.API_KEY as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Gere 3 notícias Curtas e Visuais sobre tendências de CORES e MODA para calçados 2026 no Brasil. Foque em estilo e mercado, NÃO dê conselhos técnicos de colagem ou química. Retorne JSON: id, title, excerpt, brand, date, image (URL Unsplash de sapatos de luxo ou passarelas).",
      config: {
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
    // Fix: Accessing .text as a property, not a method, as per SDK guidelines.
    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};
