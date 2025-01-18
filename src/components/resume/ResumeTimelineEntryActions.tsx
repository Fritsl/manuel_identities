import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface ResumeTimelineEntryActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function ResumeTimelineEntryActions({ onEdit, onDelete }: ResumeTimelineEntryActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onEdit}
        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        title="Edit entry"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={onDelete}
        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete entry"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}