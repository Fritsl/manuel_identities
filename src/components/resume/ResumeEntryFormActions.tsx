import React from 'react';

interface ResumeEntryFormActionsProps {
  onCancel: () => void;
  onSave: () => void;
  isNew?: boolean;
}

export function ResumeEntryFormActions({ onCancel, onSave, isNew }: ResumeEntryFormActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSave}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
      >
        {isNew ? 'Add Entry' : 'Save Changes'}
      </button>
    </div>
  );
}