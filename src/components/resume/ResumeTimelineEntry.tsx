import React from 'react';
import { ResumeEntry } from '../../types/resume';
import { ResumeTimelineEntryIcon } from './ResumeTimelineEntryIcon';
import { ResumeTimelineEntryDetails } from './ResumeTimelineEntryDetails';
import { ResumeTimelineEntryActions } from './ResumeTimelineEntryActions';

interface ResumeTimelineEntryProps {
  entry: ResumeEntry;
  onEdit: (entry: ResumeEntry) => void;
  onDelete: (entryId: string) => void;
  isLast: boolean;
}

export function ResumeTimelineEntry({ entry, onEdit, onDelete, isLast }: ResumeTimelineEntryProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200" />
      )}
      
      <div className="flex gap-4">
        <ResumeTimelineEntryIcon type={entry.type} />

        <div className="flex-grow space-y-3">
          <div className="flex items-start justify-between gap-4">
            <ResumeTimelineEntryDetails entry={entry} />
            <ResumeTimelineEntryActions
              onEdit={() => onEdit(entry)}
              onDelete={() => onDelete(entry.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}