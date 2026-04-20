import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  Image as ImageIcon, 
  Settings2, 
  Sparkles, 
  RefreshCw, 
  Download,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  THEMES, 
  ThemeName, 
  AspectRatio, 
  generateMarketingPoster 
} from './services/geminiService';

export default function App() {
  const [productImage, setProductImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>("Tropical Zen");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
  const [customOverride, setCustomOverride] = useState("");
  const [customTextOverlay, setCustomTextOverlay] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);

  const productInputRef = useRef<HTMLInputElement>(null);
  const referenceInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'reference') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'product') setProductImage(reader.result as string);
        else setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!productImage) {
      setError("Please upload a product image first.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImages([]);
    setGenerationProgress(0);

    const newImages: string[] = [];
    
    try {
      // Generate 2 posters
      for (let i = 0; i < 2; i++) {
        const img = await generateMarketingPoster({
          productImage,
          referenceImage: referenceImage || undefined,
          theme: referenceImage ? undefined : selectedTheme,
          aspectRatio,
          customOverride,
          customTextOverlay
        }, i);
        newImages.push(img);
        setGeneratedImages([...newImages]);
        setGenerationProgress(((i + 1) / 2) * 100);
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate assets. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = (base64: string, index: number) => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = `luxe-shot-asset-${index + 1}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen pb-20 bg-brand-dark text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center text-black">
            <Camera size={20} />
          </div>
          <div>
            <h1 className="display text-xl font-bold tracking-tight uppercase text-white">Lumina Studio</h1>
            <p className="serif italic text-sm opacity-60">High-End Product Photography</p>
          </div>
        </div>
        <div className="hidden md:flex gap-8 items-center text-[11px] uppercase tracking-[0.2em] font-bold text-white/60">
          <span className="cursor-pointer hover:text-brand-accent transition-colors">Studio</span>
          <span className="cursor-pointer hover:text-brand-accent transition-colors">Gallery</span>
          <span className="cursor-pointer hover:text-brand-accent transition-colors">Settings</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Controls Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="display text-[10px] uppercase tracking-widest font-bold text-brand-accent">01</span>
                <h2 className="display text-xs uppercase tracking-widest font-bold text-white">Product Input</h2>
              </div>
              
              <div 
                onClick={() => productInputRef.current?.click()}
                className={`relative aspect-square rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden
                  ${productImage ? 'border-brand-accent/40' : 'border-white/10 hover:border-brand-accent/40 bg-brand-surface'}`}
              >
                {productImage ? (
                  <>
                    <img src={productImage} alt="Product" className="w-full h-full object-contain p-4" />
                    <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs uppercase tracking-widest font-bold">
                      Change Product
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <Upload className="mx-auto mb-3 text-brand-accent opacity-40" size={32} />
                    <p className="text-[11px] uppercase tracking-widest font-bold opacity-40">Upload Product Image</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={productInputRef} 
                  onChange={(e) => handleImageUpload(e, 'product')} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="display text-[10px] uppercase tracking-widest font-bold text-brand-accent">02</span>
                <h2 className="display text-xs uppercase tracking-widest font-bold text-white">Aesthetic Direction</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Brand Themes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(THEMES) as ThemeName[]).map((theme) => (
                      <button
                        key={theme}
                        onClick={() => {
                          setSelectedTheme(theme);
                          setReferenceImage(null);
                        }}
                        className={`px-3 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all rounded-lg
                          ${selectedTheme === theme && !referenceImage 
                            ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                            : 'bg-brand-surface text-white border-white/10 hover:border-brand-accent/50'}`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                    <span className="bg-brand-dark px-2 opacity-50">Or Style Reference</span>
                  </div>
                </div>

                <div 
                  onClick={() => referenceInputRef.current?.click()}
                  className={`relative aspect-[16/6] rounded-xl border border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden
                    ${referenceImage ? 'border-brand-accent/40' : 'border-white/10 hover:border-brand-accent/40 bg-brand-surface'}`}
                >
                  {referenceImage ? (
                    <>
                      <img src={referenceImage} alt="Reference" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] uppercase tracking-widest font-bold">
                        Change Style
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-3 opacity-40">
                      <ImageIcon size={18} />
                      <p className="text-[10px] uppercase tracking-widest font-bold">Upload Style Reference</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={referenceInputRef} 
                    onChange={(e) => handleImageUpload(e, 'reference')} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="display text-[10px] uppercase tracking-widest font-bold text-brand-accent">03</span>
                <h2 className="display text-xs uppercase tracking-widest font-bold text-white">Campaign Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Aspect Ratio</label>
                  <div className="flex gap-2">
                    {["1:1", "4:5", "9:16", "16:9"].map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio as AspectRatio)}
                        className={`flex-1 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all rounded-lg
                          ${aspectRatio === ratio 
                            ? 'bg-brand-accent text-brand-dark border-brand-accent' 
                            : 'bg-brand-surface text-white border-white/10 hover:border-brand-accent/50'}`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Custom Text Overlay</label>
                  <input
                    type="text"
                    value={customTextOverlay}
                    onChange={(e) => setCustomTextOverlay(e.target.value)}
                    placeholder="e.g. Premium Quality, Special Offer"
                    className="w-full bg-brand-surface border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-brand-accent transition-all mb-4 text-white placeholder-white/30"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">Custom Override</label>
                  <textarea
                    value={customOverride}
                    onChange={(e) => setCustomOverride(e.target.value)}
                    placeholder="e.g. Add dramatic lighting, reflections..."
                    className="w-full bg-brand-surface border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-brand-accent transition-all min-h-[80px] resize-none text-white placeholder-white/30"
                  />
                </div>
              </div>
            </section>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !productImage}
              className={`w-full py-4 rounded-xl display text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-3
                ${isGenerating || !productImage 
                  ? 'bg-brand-surface text-white/30 border-white/5 cursor-not-allowed border' 
                  : 'bg-brand-accent text-brand-dark hover:bg-brand-accent/90 shadow-lg shadow-brand-accent/20'}`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  Crafting Posters...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate 2 Posters
                </>
              )}
            </button>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-[10px] uppercase tracking-widest font-bold bg-red-900/30 border border-red-900/50 p-3 rounded-lg">
                <AlertCircle size={14} />
                {error}
              </div>
            )}
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8">
            <div className="bg-brand-surface/50 rounded-3xl border border-white/5 p-8 min-h-[600px] relative">
              {!isGenerating && generatedImages.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 opacity-20">
                  <ImageIcon size={64} className="mb-6" />
                  <h3 className="serif text-3xl mb-2 text-white">Your Studio is Ready</h3>
                  <p className="text-sm max-w-xs mx-auto">Upload your product and select a theme to generate high-end marketing posters with taglines.</p>
                </div>
              )}

              {isGenerating && (
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="animate-spin text-brand-accent" size={18} />
                      <h3 className="display text-xs uppercase tracking-widest font-bold text-brand-accent">Developing Posters...</h3>
                    </div>
                    <span className="display text-[10px] font-bold text-brand-accent">{Math.round(generationProgress)}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-brand-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${generationProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-12">
                <AnimatePresence mode="popLayout">
                  {generatedImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-sm border border-white/10 max-w-2xl mx-auto w-full"
                    >
                      <div className={`relative w-full ${aspectRatio === '1:1' ? 'aspect-square' : aspectRatio === '4:5' ? 'aspect-[4/5]' : aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-[16/9]'}`}>
                        <img src={img} alt={`Poster ${idx + 1}`} className="w-full h-full object-cover" />
                        
                        <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-4">
                          <button 
                            onClick={() => downloadImage(img, idx)}
                            className="bg-brand-accent text-[#0a0a0a] px-4 py-2 rounded-full display text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                          >
                            <Download size={14} />
                            Download Poster
                          </button>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center border-t border-white/10 bg-brand-surface/50">
                        <span className="display text-[9px] uppercase tracking-widest font-bold text-white/50">Poster #{idx + 1}</span>
                        <span className="display text-[9px] uppercase tracking-widest font-bold text-brand-accent">{aspectRatio}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isGenerating && generatedImages.length < 2 && (
                  <div className={`bg-brand-surface rounded-2xl animate-pulse flex items-center justify-center max-w-2xl mx-auto w-full border border-white/5
                    ${aspectRatio === '1:1' ? 'aspect-square' : aspectRatio === '4:5' ? 'aspect-[4/5]' : aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-[16/9]'}`}>
                    <ImageIcon className="opacity-10" size={32} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
        <div className="flex items-center gap-4">
          <span className="display text-[10px] uppercase tracking-widest font-bold">Lumina Studio v1.2</span>
          <span className="w-1 h-1 bg-white rounded-full"></span>
          <span className="display text-[10px] uppercase tracking-widest font-bold">Powered by Gemini Flash</span>
        </div>
        <div className="flex gap-8">
          <span className="display text-[10px] uppercase tracking-widest font-bold cursor-pointer hover:underline">Privacy</span>
          <span className="display text-[10px] uppercase tracking-widest font-bold cursor-pointer hover:underline">Terms</span>
          <span className="display text-[10px] uppercase tracking-widest font-bold cursor-pointer hover:underline">Support</span>
        </div>
      </footer>
    </div>
  );
}
