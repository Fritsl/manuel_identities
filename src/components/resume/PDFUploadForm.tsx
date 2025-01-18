import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface PDFUploadFormProps {
  onDataExtracted: (data: ResumeData) => void;
}

export function PDFUploadForm({ onDataExtracted }: PDFUploadFormProps) {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Here we would normally process the PDF and extract data
    // For now, we'll just show a message that this is a placeholder
    alert('PDF processing would happen here. This is a placeholder for the actual PDF parsing functionality.');
  }, []);

  return (
    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-indigo-50 rounded-full">
          <Upload className="w-8 h-8 text-indigo-600" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium text-gray-900">Upload your Resume PDF</h3>
          <p className="text-sm text-gray-500">
            Drag and drop your resume PDF here, or click to select a file
          </p>
        </div>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
        />
      </div>
    </div>
  );
}