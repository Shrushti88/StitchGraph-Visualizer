
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function parsePatternWithAI(rawText: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Parse this crochet pattern into a structured JSON format. 
    Standardize the abbreviations to: ch, sc, dc, hdc, tr, slst, inc, dec.
    Output a list of rows, where each row contains an array of stitch types.
    
    Pattern: "${rawText}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rows: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                rowNumber: { type: Type.NUMBER },
                stitches: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                },
                isRound: { type: Type.BOOLEAN }
              },
              required: ["rowNumber", "stitches"]
            }
          }
        },
        required: ["rows"]
      }
    }
  });

  return JSON.parse(response.text);
}
