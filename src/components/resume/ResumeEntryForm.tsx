import React from 'react';
import { ResumeEntry } from '../../types/resume';
import { ResumeEntryFormHeader } from './ResumeEntryFormHeader';
import { ResumeEntryFormFields } from './ResumeEntryFormFields';
import { ResumeEntryFormActions } from './ResumeEntryFormActions';

interface ResumeEntryFormProps {
  entry: ResumeEntry;
  onChange: (entry: ResumeEntry) => void;
  onCancel: () => void;
  onSave: () => void;
  isNew?: boolean;
}

export function ResumeEntryForm({ entry, onChange, onCancel, onSave, isNew }: ResumeEntryFormProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
        <ResumeEntryFormHeader isNew={isNew} />
        <ResumeEntryFormFields entry={entry} onChange={onChange} />
        <ResumeEntryFormActions onCancel={onCancel} onSave={onSave} isNew={isNew} />
      </div>
    </div>
  );
}