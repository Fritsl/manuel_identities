import React from 'react';
import { ResumeEntry } from '../../types/resume';
import { formatDate } from '../../utils/date';

interface TimelineEntryTooltipProps {
  entry: ResumeEntry;
}

export function TimelineEntryTooltip({ entry }: TimelineEntryTooltipProps) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 -top-12 bg-white p-2 rounded-md 
      shadow-lg border border-gray-200 z-10 w-48">
      <div className="text-xs font-medium text-gray-900 truncate">{entry.title}</div>
      <div className="text-xs text-gray-600 truncate">{entry.organization}</div>
      <div className="text-xs text-gray-500">
        {formatDate(entry.startDate)} - {formatDate(entry.endDate)}
      </div>
    </div>
  );
}