
import { GoogleGenAI, Type, Modality } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getReorderRecommendation = async (item: any, context: any) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a supply chain expert for Shahjahan Enterprise in Koyra Bazar, Khulna. 
      Item: ${item.brand} ${item.type}. Current Stock: ${item.quantity} ${item.unit}.
      Business Context: Total Sales ৳${context.sales}, Pending Baki ৳${context.baki}.
      
      Task: Suggest a specific reorder quantity for this item to avoid stockout. 
      Provide a brief reasoning in Banglish focusing on market demand in Koyra and neighboring areas of Khulna.`,
    });
    return response.text;
  } catch (error) {
    return "পুনরায় অর্ডার করার পরামর্শ এই মুহূর্তে পাওয়া যাচ্ছে না।";
  }
};

export const getBusinessOracleAdvice = async (data: any) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Act as a Master Business Strategist for a new building materials shop in Koyra Bazar, Khulna, Bangladesh.
      Current Business Data: ${JSON.stringify(data)}
      
      Task: Perform a deep-thinking analysis. Identify:
      1. Potential Cashflow Risks in the next 30 days.
      2. Hidden growth opportunities in the Khulna coastal market.
      3. A specific 'Magic Strategy' to beat older competitors in Koyra.
      
      Language: Banglish. Provide high-impact, actionable insights.`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Oracle Error:", error);
    return "ওরাকল এই মুহূর্তে আপনার ডেটা প্রসেস করতে পারছে না। কিছুক্ষণ পর চেষ্টা করুন।";
  }
};

export const findLocalConstructionLeads = async () => {
  const ai = getAI();
  try {
    const response = await callWithRetry(() => ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "5 construction projects in Khulna district, specifically near Koyra and Paikgachha.",
      config: { 
        tools: [{ googleMaps: {} }], 
        toolConfig: { 
          retrievalConfig: { 
            latLng: { latitude: 22.3414, longitude: 89.3175 } // Centered near Koyra Bazar
          } 
        } 
      }
    }));
    return { text: response.text, sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => c.maps?.uri).filter(Boolean) || [] };
  } catch (error) { return { text: "লিড পাওয়া যাচ্ছে না।", sources: [] }; }
};

// Analyze image for inventory tracking
export const analyzeInventoryImage = async (base64Image: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/jpeg' } },
          { text: "Estimate the number of cement bags or quantity of steel rods in this image. Also, identify the brand if visible. Answer in Banglish as a helpful shop assistant in Khulna." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    return "ছবিটি পরিষ্কার নয়। দয়া করে আবার চেষ্টা করুন।";
  }
};

export const generateRadioAd = async (topic: string) => {
  const ai = getAI();
  try {
    const prompt = `Create a 30-second radio conversation advertisement in Banglish for 'Shahjahan Enterprise' based in Koyra Bazar.
      Speaker 1 (Karim): A worried house builder in Khulna.
      Speaker 2 (Rahim): A satisfied customer of Shahjahan Enterprise.
      Topic: ${topic}.
      Make it funny, engaging, and trustworthy.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          multiSpeakerVoiceConfig: {
            speakerVoiceConfigs: [
              { speaker: 'Karim', voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
              { speaker: 'Rahim', voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } }
            ]
          }
        }
      }
    });
    
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio;
  } catch (error) {
    console.error("Radio Ad Error:", error);
    return null;
  }
};

export const generateDigitalInvoice = async (clientName: string, items: any[], total: number) => {
  const ai = getAI();
  try {
    const response = await callWithRetry(() => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a professional and celebratory digital money receipt/invoice for a purchase at 'Shahjahan Enterprise, Koyra'. 
      Customer: ${clientName}. Items: ${JSON.stringify(items)}. Total: ৳${total}. Language: Banglish.`,
    }));
    return response.text;
  } catch (error) { return `Shahjahan Enterprise - Invoice: ৳${total}`; }
};

export const getProfitLossAdvice = async (sales: number, expenses: number, baki: number) => {
  const ai = getAI();
  try {
    const response = await callWithRetry(() => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Business Report Analysis for Khulna branch: Sales ৳${sales}, Expenses ৳${expenses}, Baki ৳${baki}. Growth strategies in Banglish.`,
    }));
    return response.text;
  } catch (error) { return "ব্যবসা ভালো চলছে।"; }
};

export const generateActualVideo = async (prompt: string, startingImageBase64?: string | null, onProgress?: (msg: string) => void) => {
  // Always create a new GoogleGenAI instance right before the call as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    if (onProgress) onProgress("Initializing Video Engine...");
    const config = {
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic ad for 'Shahjahan Enterprise' in Khulna. Theme: ${prompt}`,
      config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
    };
    let operation = await ai.models.generateVideos(config);
    while (!operation.done) {
      if (onProgress) onProgress("Rendering Scene Frames...");
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    // Must append the API key when fetching from the download link
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) { throw error; }
};

async function callWithRetry(fn: () => Promise<any>, retries = 3, delay = 1000): Promise<any> {
  try { return await fn(); } catch (error: any) {
    if (retries > 0 && (error.status === 429 || error.message.includes('quota'))) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return callWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export const generateWhatsAppReminder = async (clientName: string, amount: number) => {
  const ai = getAI();
  try {
    const response = await callWithRetry(() => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `WhatsApp payment reminder for ${clientName}, balance ৳${amount}. Tone: Professional Banglish for a business in Koyra.`,
    }));
    return response.text;
  } catch (error) { return `Reminder: ৳${amount} baki ache.`; }
};

export const generateMarketingPoster = async (description: string) => {
  const ai = getAI();
  try {
    const response = await callWithRetry(() => ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `Marketing poster for 'Shahjahan Enterprise, Khulna'. Theme: ${description}.` }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    }));
    for (const part of response.candidates[0].content.parts) { if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`; }
    return null;
  } catch (error) { return null; }
};

export const getLiveMarketPrices = async () => {
  const ai = getAI();
  try {
    const response = await callWithRetry(() => ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Current retail prices of Premier Cement and BSRM Rod in Khulna, Bangladesh today.",
      config: { tools: [{ googleSearch: {} }] },
    }));
    return { text: response.text, links: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => c.web?.uri).filter(Boolean) || [] };
  } catch (error) { return { text: "মার্কেট প্রাইস পাওয়া যাচ্ছে না।", links: [] }; }
};

export const generateAutonomousVideoScript = async (topic: string) => {
  const ai = getAI();
  try {
    const response = await callWithRetry(() => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `6-scene viral video script for Shahjahan Enterprise, Khulna about ${topic}.`,
    }));
    return response.text;
  } catch (error) { return "স্ক্রিপ্ট তৈরি করা যায়নি।"; }
};

export const generateSocialCaption = async (topic: string) => {
  const ai = getAI();
  try {
    const response = await callWithRetry(() => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Viral Banglish Facebook caption for Shahjahan Enterprise in Khulna about: ${topic}.`,
    }));
    return response.text;
  } catch (error) { return "Caption failed."; }
};

export const getDailyAutonomousTip = async (inventory: any[], ledger: any[]) => {
  const ai = getAI();
  try {
    const response = await callWithRetry(() => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Business tip for Shahjahan Saheb in Khulna based on data. Banglish.`,
    }));
    return response.text;
  } catch (error) { return "কাস্টমারদের সাথে সুসম্পর্ক বজায় রাখুন।"; }
};

export const getConstructionAdvice = async (area: number, floors: number, bags: number, rodTons: string) => {
  const ai = getAI();
  try {
    const response = await callWithRetry(() => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Civil Engineering report for ${area} sqft, ${floors} floors in Khulna coastal climate. Banglish.`,
    }));
    return response.text;
  } catch (error) { return "ইঞ্জিনিয়ারের পরামর্শ নিন।"; }
};
