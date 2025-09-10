import { GoogleGenAI } from "@google/genai";
import type { SignLanguage } from "../types";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}
  
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const handleApiError = (error: any): Error => {
    console.error("Error calling Gemini API:", error);
    if (error.message) {
        const lowerCaseMessage = error.message.toLowerCase();
        if (lowerCaseMessage.includes('quota')) {
            return new Error("DAILY_QUOTA_EXCEEDED");
        }
        if (lowerCaseMessage.includes('resource_exhausted')) {
            return new Error("RATE_LIMIT_EXCEEDED");
        }
    }
    return new Error("Failed to get response from Gemini API.");
};


export const detectSign = async (base64Image: string, language: SignLanguage): Promise<string> => {
    const languageFullName = language === 'ASL' 
        ? 'American Sign Language (ASL)' 
        : 'Ghanaian Sign Language (GSL)';

    const systemInstruction = `You are an expert in ${languageFullName}. 
Your task is to identify the sign being performed in the provided image. 
Respond with only the single most likely word or short phrase for the sign. 
If no clear sign is detected or the image is ambiguous, respond with "No sign detected".
Do not add any extra text or explanation.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            mimeType: 'image/jpeg',
                            data: base64Image,
                        },
                    },
                ],
            },
            config: {
                systemInstruction: systemInstruction,
                // Disable thinking for lower latency
                thinkingConfig: { thinkingBudget: 0 }
            }
        });

        const text = response.text.trim();
        return text || "No sign detected";

    } catch (error: any) {
        throw handleApiError(error);
    }
};
