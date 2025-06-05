import { BarChart3, Database } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-black/90 border-b border-green-500/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500 rounded-lg shadow-lg shadow-green-500/25">
              <BarChart3 className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DataChat AI</h1>
              <p className="text-sm text-gray-400">Intelligent Data Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
              <Database className="h-4 w-4 text-green-400" />
              <span>Powered by Microsoft Phi-3</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;