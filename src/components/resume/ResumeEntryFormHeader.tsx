import React from 'react';

interface ResumeEntryFormHeaderProps {
  isNew?: boolean;
}

export function ResumeEntryFormHeader({ isNew }: ResumeEntryFormHeaderProps) {
  return (
    <h2 className="text-xl font-semibold text-gray-900">
      {isNew ? 'Add New Entry' : 'Edit Entry'}
    </h2>
  );
}