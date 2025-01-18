import React from 'react';
import { ResumeEntry } from '../../types/resume';
import { ResumeTimelineEntry } from './ResumeTimelineEntry';

interface ResumeTimelineProps {
  entries: ResumeEntry[];
  onEdit: (entry: ResumeEntry) => void;
  onDelete: (entryId: string) => void;
}

export function ResumeTimeline({ entries, onEdit, onDelete }: ResumeTimelineProps) {
  return (
    <div className="space-y-8">
      {entries.map((entry, index) => (
        <ResumeTimelineEntry
          key={entry.id}
          entry={entry}
          onEdit={onEdit}
          onDelete={onDelete}
          isLast={index === entries.length - 1}
        />
      ))}
    </div>
  );
}