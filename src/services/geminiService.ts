import { GoogleGenAI, Modality } from "@google/genai";

export const THEMES = {
  "Tropical Zen": {
    prompt: "Light wood surface, soft-focus palm fronds, dappled sunlight, turquoise water accents. Aesthetic: Bright and refreshing.",
    aesthetic: "Bright and refreshing"
  },
  "Urban Minimalist": {
    prompt: "Grey concrete or marble slab, clean white walls, sharp architectural shadows, single monstera leaf. Aesthetic: Sophisticated and modern.",
    aesthetic: "Sophisticated and modern"
  },
  "Sunrise Wellness": {
    prompt: "Yoga mat or linen cloth, soft golden hour glow, glass of lemon water, blurred gym background. Aesthetic: Energetic and healthy.",
    aesthetic: "Energetic and healthy"
  },
  "Rustic Kitchen": {
    prompt: "Dark wooden cutting board, scattered raw ingredients (berries, mint, avocado), blurred kitchen backsplash. Aesthetic: Organic and earthy.",
    aesthetic: "Organic and earthy"
  },
  "Neon Pulse": {
    prompt: "Reflective black glass surface, vibrant purple/blue rim lighting, stylized motion blur. Aesthetic: High-energy and fitness-focused.",
    aesthetic: "High-energy and fitness-focused"
  },
  "Scandi Clean": {
    prompt: "Light oak furniture, neutral beige tones, ceramic textures, dried pampas grass. Aesthetic: Calm and premium.",
    aesthetic: "Calm and premium"
  }
};

export type ThemeName = keyof typeof THEMES;
export type AspectRatio = "1:1" | "4:5" | "9:16" | "16:9";

export interface GenerationParams {
  productImage: string; // base64
  referenceImage?: string; // base64
  theme?: ThemeName;
  aspectRatio: AspectRatio;
  customOverride?: string;
  customTextOverlay?: string;
}

export async function generateMarketingPoster(params: GenerationParams, index: number) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const themeInfo = params.theme ? THEMES[params.theme] : null;
  
  const displayText = params.customTextOverlay || "Premium Quality";

  let prompt = `You are a High-End Product Photographer and Graphic Designer. 
Your goal is to take a product image and generate exactly 2 unique, distinct marketing posters.
Poster #${index + 1} of 2.

STRICT DESIGN RULES:
1. PRODUCT CONSISTENCY: The product from the input must remain identical in shape, labeling, and color.
2. DISSIMILARITY: Image 1 and Image 2 must have different backgrounds, camera angles, and compositions. Ensure this variation is highly distinct.
3. CUSTOM TEXT INTEGRATION: You must incorporate the exact text: "${displayText}".
4. TYPOGRAPHY: 
   - Typography should be elegant, sophisticated, and professional.
   - Prefer sans-serif fonts like Poppins, Montserrat, or fonts matching the product label.
   - Use generous letter spacing (tracking) for a premium feel.
5. TEXT PLACEMENT: Place text in the "negative space" using a balanced, editorial composition. Do not cover the main product.
6. COLOR PALETTE: The text color and environmental accents MUST align with the product's natural color palette. Match the text color to the prominent colors found in the product label or contents.

EXECUTION STEPS:
1. Analyze the product for its primary colors and theme.
2. Generate a distinct image based on the '${params.referenceImage ? "Reference Style" : (params.theme || "Theme")}' while maintaining a high-end, sophisticated feel.
3. Overlay the exact text: "${displayText}" utilizing a complementary color scheme.
4. Render in ${params.aspectRatio} aspect ratio.

ENVIRONMENT:
${params.referenceImage ? "Replicate the lighting, color palette, and environment of the provided reference style image." : (themeInfo ? themeInfo.prompt : "A clean, professional studio background.")}

${params.customOverride ? `CUSTOM OVERRIDE: ${params.customOverride}` : ""}

Output the marketing poster now.`;

  const parts: any[] = [
    {
      inlineData: {
        data: params.productImage.split(',')[1],
        mimeType: "image/png"
      }
    },
    { text: prompt }
  ];

  if (params.referenceImage) {
    parts.push({
      inlineData: {
        data: params.referenceImage.split(',')[1],
        mimeType: "image/png"
      }
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: { parts },
    config: {
      imageConfig: {
        aspectRatio: params.aspectRatio
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image generated in response");
}
