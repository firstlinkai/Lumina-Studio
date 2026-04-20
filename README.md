# Lumina Studio

Lumina Studio is an AI-powered product photography and marketing poster generation platform. It allows users to upload a single product image (with a transparent background) and instantly generate high-end, stylistically diverse marketing assets with custom text overlays. 

## Features

- **AI Product Photography**: Uses cutting-edge generative AI models (Gemini) to render your product in hyper-realistic environments.
- **Multiple Aesthetic Themes**: Choose from predefined themes such as Tropical Zen, Urban Minimalist, Sunrise Wellness, Rustic Kitchen, Neon Pulse, and Scandi Clean.
- **Style Reference Matching**: Upload a reference image to replicate its lighting, color palette, and environmental vibe.
- **Custom Text Overlays**: Automatically integrates taglines, prices, or marketing copy into the generated image using intelligent negative-space placement.
- **Sophisticated Typography**: Text overlays are styled elegantly utilizing high-end typography rules.
- **Multiple Aspect Ratios**: Supports 1:1, 4:5, 9:16, and 16:9 for seamless social media and ad integration.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4.0, Framer Motion
- **Icons**: Lucide React
- **AI Model**: Google Gemini (via `@google/genai`)
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lumina-studio.git
   cd lumina-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Product Input**: Upload a `.png` of your product with a transparent background.
2. **Aesthetic Direction**: Select a theme (e.g., "Urban Minimalist") OR upload a style reference image.
3. **Campaign Details**:
   - Choose the preferred aspect ratio.
   - Add a custom text overlay (e.g., "$9.99" or "Freshly Crafted").
   - (Optional) Provide a custom override prompt (e.g., "Add dramatic purple rim lighting").
4. **Generate**: Click "Generate 2 Posters" to process.
5. **Download**: Hover over your favorite results and click "Download Poster" to save the high-res images.

## Screenshot and Sample Image
<img width="1871" height="759" alt="image" src="https://github.com/user-attachments/assets/79af41d3-84f4-4abf-9d9d-553853967f9d" />

---
<img width="669" height="680" alt="image" src="https://github.com/user-attachments/assets/16648e49-f91e-4db1-ae37-490bb671b6b7" />


---


<img width="647" height="710" alt="image" src="https://github.com/user-attachments/assets/78e82791-d00c-4c37-9851-0ec601022fa8" />

---


<img width="896" height="1152" alt="luxe-shot-asset-1 (4)" src="https://github.com/user-attachments/assets/f3b2ab91-ffaa-4be0-bf42-9ca132c75abe" />

---
<img width="1344" height="768" alt="Whisk_31ef7bba5653632b6c5421333c1f888fdr" src="https://github.com/user-attachments/assets/1d6fe401-f9a8-49a5-9169-38174167ba42" />

---
<img width="784" height="1360" alt="Gemini_Generated_Image_4vcp9u4vcp9u4vcp" src="https://github.com/user-attachments/assets/14b47ec6-0c24-4280-8d50-344866098562" />
