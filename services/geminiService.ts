import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateServerNews = async (): Promise<string> => {
  const client = getClient();
  if (!client) return "Não foi possível carregar as notícias do servidor. Verifique a chave de API.";

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      Escreva uma notícia curta, emocionante e engajadora para a página inicial de um servidor de Minecraft brasileiro chamado 'BrazinoMC'.
      A notícia deve ser sobre um 'Torneio de BedWars' acontecendo neste fim de semana.
      Use emojis temáticos de Minecraft e do Brasil (Bandeira do Brasil, etc). Mantenha o texto com no máximo 3 parágrafos curtos.
      Tom de voz: Entusiasmado, Patriota, Gamer.
      Língua: Português Brasileiro.
    `;

    const response = await client.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Sem notícias no momento.";
  } catch (error) {
    console.error("Error generating news:", error);
    return "Erro ao conectar com o oráculo de notícias do servidor.";
  }
};