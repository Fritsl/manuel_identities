import React from 'react';
import { PenTool, FileText } from 'lucide-react';

interface ResumeFormTabsProps {
  activeTab: 'manual' | 'upload';
  onTabChange: (tab: 'manual' | 'upload') => void;
}

export function ResumeFormTabs({ activeTab, onTabChange }: ResumeFormTabsProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onTabChange('manual')}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg border-2 transition-all
          ${activeTab === 'manual'
            ? 'border-primary bg-primary/5 text-primary'
            : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'}`}
      >
        <PenTool className="w-5 h-5" />
        <div className="text-left">
          <div className="font-medium">Manual Entry</div>
          <div className="text-sm opacity-75">Add entries one by one</div>
        </div>
      </button>
      <button
        onClick={() => onTabChange('upload')}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-lg border-2 transition-all
          ${activeTab === 'upload'
            ? 'border-primary bg-primary/5 text-primary'
            : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'}`}
      >
        <FileText className="w-5 h-5" />
        <div className="text-left">
          <div className="font-medium">Upload PDF</div>
          <div className="text-sm opacity-75">Import from your resume</div>
        </div>
      </button>
    </div>
  );
}