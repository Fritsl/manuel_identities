import React from 'react';
import { Plus } from 'lucide-react';

interface NewResumeEntryButtonProps {
  onClick: () => void;
}

export function NewResumeEntryButton({ onClick }: NewResumeEntryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
    >
      <div className="flex flex-col items-center gap-2">
        <Plus className="w-6 h-6 text-gray-400 group-hover:text-indigo-500" />
        <span className="text-sm font-medium text-gray-600 group-hover:text-indigo-600">
          Add New Entry
        </span>
      </div>
    </button>
  );
}