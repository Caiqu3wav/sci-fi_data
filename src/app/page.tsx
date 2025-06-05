'use client'
import { useState } from "react";
import UploadArea from "@/app/components/UploadArea";
import ChatInterface from "@/app/components/ChatInterface";
import ChartViewer from "@/app/components/ChartViewer";
import SidebarTips from "@/app/components/SidebarTips";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import HowItWorks from "@/app/components/HowItWorks";
import Features from "@/app/components/Features";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    chartData?: any;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChart, setCurrentChart] = useState<any>(null);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsLoading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setDatasetId(`dataset_${Date.now()}`);
      setIsLoading(false);
      
      // Add welcome message
      const welcomeMessage = {
        id: `msg_${Date.now()}`,
        text: `Great! I've processed your dataset "${file.name}". You can now ask me questions about your data, and I'll provide insights and visualizations. Try asking about trends, distributions, or specific metrics in your data.`,
        sender: 'ai' as const,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }, 2000);
  };

  const handleSendMessage = async (text: string) => {
    if (!datasetId) return;

    const userMessage = {
      id: `msg_${Date.now()}`,
      text,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response with chart data
    setTimeout(() => {
      const mockChartData = {
        type: Math.random() > 0.5 ? 'bar' : 'line',
        data: Array.from({ length: 6 }, (_, i) => ({
          name: `Category ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 20
        }))
      };

      const aiResponse = {
        id: `msg_${Date.now() + 1}`,
        text: `Based on your data analysis request, I've generated a visualization showing the key trends. The chart reveals interesting patterns in your dataset that highlight significant variations across different categories.`,
        sender: 'ai' as const,
        timestamp: new Date(),
        chartData: mockChartData
      };

      setMessages(prev => [...prev, aiResponse]);
      setCurrentChart(mockChartData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {!uploadedFile ? (
        <div>
          <Hero onGetStarted={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })} />
          <Features />
          <HowItWorks />
          
          <section id="upload-section" className="py-20 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Start Your Data Journey
                </h2>
                <p className="text-xl text-gray-300">
                  Upload your dataset and begin exploring with AI
                </p>
              </div>
              <UploadArea onFileUpload={handleFileUpload} isLoading={isLoading} />
            </div>
          </section>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
            {/* Sidebar Tips */}
            <div className="lg:col-span-1">
              <SidebarTips 
                onSuggestedPrompt={handleSendMessage}
                fileName={uploadedFile.name}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 flex flex-col">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                disabled={!datasetId}
              />
            </div>

            {/* Chart Viewer */}
            <div className="lg:col-span-1">
              <ChartViewer chartData={currentChart} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;