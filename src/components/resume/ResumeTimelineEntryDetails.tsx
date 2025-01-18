import React from 'react';
import { ResumeEntry } from '../../types/resume';
import { formatDate } from '../../utils/date';

interface ResumeTimelineEntryDetailsProps {
  entry: ResumeEntry;
}

export function ResumeTimelineEntryDetails({ entry }: ResumeTimelineEntryDetailsProps) {
  return (
    <div className="flex-grow space-y-3">
      <div className="text-lg font-semibold text-gray-900">{entry.title}</div>
      <p className="text-gray-600">{entry.organization}</p>
      
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>{entry.location}</span>
        <span>•</span>
        <span>{formatDate(entry.startDate)} - {formatDate(entry.endDate)}</span>
      </div>

      <ul className="list-disc list-inside space-y-1 text-gray-600">
        {entry.description.map((desc, i) => (
          <li key={i}>{desc}</li>
        ))}
      </ul>

      {entry.skills && entry.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {entry.skills.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}