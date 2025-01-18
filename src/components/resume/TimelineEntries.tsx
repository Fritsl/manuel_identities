import React from 'react';
import { TimelineEntry } from './TimelineEntry';
import { ResumeEntry } from '../../types/resume';

interface TimelineEntriesProps {
  entries: ResumeEntry[];
  startYear: number;
  years: number[];
  onEntryHover: (entry: ResumeEntry | null) => void;
  hoveredEntry: ResumeEntry | null;
}

export function TimelineEntries({
  entries,
  startYear,
  years,
  onEntryHover,
  hoveredEntry
}: TimelineEntriesProps) {
  return (
    <>
      {entries.map((entry) => (
        <TimelineEntry
          key={entry.id}
          entry={entry}
          startYear={startYear}
          years={years}
          onHover={onEntryHover}
          hoveredEntry={hoveredEntry}
        />
      ))}
    </>
  );
}