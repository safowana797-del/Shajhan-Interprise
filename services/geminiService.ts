
import { GoogleGenAI, Type, Modality } from "@google/genai";

declare var process: {
  env: {
    API_KEY: string;
  };
};

// Global flag to stop all AI requests if quota is hit once
let isQuotaExhaustedGlobal = false;

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Checks if an error is a rate limit/quota error.
 */
const isQuotaError = (error: any): boolean => {
  const errorStr = String(error?.message || error || "");
  if (errorStr.includes("429") || errorStr.includes("RESOURCE_EXHAUSTED") || errorStr.toLowerCase().includes("quota exceeded")) {
    return true;
  }
  // The error might be a JSON string inside the message
  try {
    const parsed = JSON.parse(errorStr);
    if (parsed?.error?.code === 429 || parsed?.error?.status === "RESOURCE_EXHAUSTED") {
      return true;
    }
  } catch (e) {
    // Not valid JSON
  }
  return false;
};

/**
 * Generates a localized product description for the Khulna coastal region.
 */
export const generateDetailedProductDescription = async (brand: string, type: string) => {
  if (isQuotaExhaustedGlobal) return null;

  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a premium, highly engaging, and detailed product description in Banglish for ${brand} (${type}). 
      
      Context: This is for 'Shahjahan Enterprise', the leading dealer in Koyra Bazar, Khulna.
      Specific focus: Explain why this product is perfect for construction in the Khulna coastal climate. 
      Emphasize:
      1. Resistance to salinity (lona pani).
      2. Durability against humidity and heavy rain.
      3. Long-term safety for buildings near the coast.
      
      Keep it around 3-4 sentences. Use an inviting and professional tone. Output ONLY the description text.`,
    });
    return response.text;
  } catch (error: any) {
    if (isQuotaError(error)) {
      isQuotaExhaustedGlobal = true;
      throw new Error("QUOTA_EXHAUSTED");
    }
    console.error("AI Description Error:", error);
    return null;
  }
};

export const getConstructionAdvice = async (area: number, floors: number, bags: number, rodTons: string) => {
  if (isQuotaExhaustedGlobal) return "দুঃখিত, বর্তমানে আমাদের এআই সার্ভারের কোটা পূর্ণ হয়েছে। অনুগ্রহ করে পরে চেষ্টা করুন।";

  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide civil engineering advice in Banglish for a ${floors}-story building on ${area} sqft in the Khulna coastal area. Materials: ${bags} bags of cement and ${rodTons} tons of rod. Focus on foundation safety and salt protection.`,
    });
    return response.text;
  } catch (error: any) {
    if (isQuotaError(error)) {
      isQuotaExhaustedGlobal = true;
      return "দুঃখিত, বর্তমানে আমাদের এআই সার্ভারের কোটা পূর্ণ হয়েছে। অনুগ্রহ করে পরে চেষ্টা করুন।";
    }
    return "ইঞ্জিনিয়ারের পরামর্শ নিন।";
  }
};

export const generateActualVideo = async (prompt: string, startingImageBase64?: string | null, onProgress?: (msg: string) => void) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    if (onProgress) onProgress("Initializing Video Engine...");
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic construction advertisement in Khulna, Bangladesh. ${prompt}`,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    });
    while (!operation.done) {
      if (onProgress) onProgress("Rendering frames...");
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) { throw error; }
};

export const generateRadioAd = async (topic: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Create a funny and engaging radio ad in Banglish for Shahjahan Enterprise. Topic: ${topic}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) { return null; }
};

export const generateMarketingPoster = async (description: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Professional construction marketing poster for Shahjahan Enterprise. Theme: ${description}` }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) { return null; }
};

export const getBusinessOracleAdvice = async (data: any) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analyze this business data for Shahjahan Enterprise in Khulna and provide strategic advice in Banglish: ${JSON.stringify(data)}`,
      config: { thinkingConfig: { thinkingBudget: 10000 } }
    });
    return response.text;
  } catch (error) { return "পরামর্শ পাওয়া যাচ্ছে না।"; }
};

export const checkQuotaStatus = () => isQuotaExhaustedGlobal;
