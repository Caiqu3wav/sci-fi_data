import { useState, useRef } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

interface UploadAreaProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

const UploadArea = ({ onFileUpload, isLoading }: UploadAreaProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFile(file)) {
        onFileUpload(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFile(file)) {
        onFileUpload(file);
      }
    }
  };

  const isValidFile = (file: File) => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    return validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx');
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <Card className="p-12 text-center border-2 border-dashed border-blue-300 bg-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-900">Processing your dataset...</h3>
          <p className="text-gray-600">This may take a few moments</p>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={`p-12 text-center border-2 border-dashed transition-all duration-300 cursor-pointer ${
        isDragOver 
          ? 'border-blue-500 bg-blue-50 scale-105' 
          : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className={`p-4 rounded-full ${isDragOver ? 'bg-blue-100' : 'bg-gray-100'} transition-colors duration-300`}>
          <Upload className={`h-12 w-12 ${isDragOver ? 'text-blue-600' : 'text-gray-600'}`} />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Upload your dataset
          </h3>
          <p className="text-gray-600">
            Drag and drop your CSV or Excel file here, or click to browse
          </p>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>CSV</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Excel</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="mt-4"
          onClick={openFileDialog}
        >
          Choose File
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        className="hidden"
        onChange={handleFileSelect}
      />
    </Card>
  );
};

export default UploadArea;
