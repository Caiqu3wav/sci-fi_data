
import { ArrowRight, Sparkles, Brain } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black"></div>
      
      {/* Neon grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-8">
          <Sparkles className="h-4 w-4 text-green-400" />
          <span className="text-green-400 text-sm font-medium">Powered by Microsoft Phi-3</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
          DataChat AI
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
          Transform your data into insights with natural language
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Upload your CSV or Excel files and start asking questions. Our AI will analyze your data and create beautiful visualizations in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            onClick={onGetStarted}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-6 text-lg rounded-lg shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-green-500/40"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2 text-gray-400">
            <Brain className="h-5 w-5 text-green-400" />
            <span>No coding required</span>
          </div>
        </div>

        {/* Sample prompts showcase */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-6">Ask questions like:</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Show me sales trends over time",
              "What are the top performing products?",
              "Create a pie chart of customer segments"
            ].map((prompt, index) => (
              <div 
                key={index} 
                className="bg-gray-900/50 border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-colors duration-300"
              >
                <p className="text-gray-300 italic">&quot;{prompt}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;