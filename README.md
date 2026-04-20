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
