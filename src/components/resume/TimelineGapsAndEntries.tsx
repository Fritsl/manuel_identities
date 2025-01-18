import React from 'react';
import { TimelineGaps } from './TimelineGaps';
import { TimelineEntries } from './TimelineEntries';
import { Gap, ResumeEntry } from '../../types/resume';

interface TimelineGapsAndEntriesProps {
  gaps: Gap[];
  entries: ResumeEntry[];
  startYear: number;
  years: number[];
  hoveredEntry: ResumeEntry | null;
  hoveredGap: Gap | null;
  onEntryHover: (entry: ResumeEntry | null) => void;
  onGapHover: (gap: Gap | null) => void;
}

export function TimelineGapsAndEntries({
  gaps,
  entries,
  startYear,
  years,
  hoveredEntry,
  hoveredGap,
  onEntryHover,
  onGapHover
}: TimelineGapsAndEntriesProps) {
  return (
    <div className="relative space-y-2">
      <TimelineGaps
        gaps={gaps}
        startYear={startYear}
        years={years}
        onGapHover={onGapHover}
        hoveredGap={hoveredGap}
      />
      <TimelineEntries
        entries={entries}
        startYear={startYear}
        years={years}
        onEntryHover={onEntryHover}
        hoveredEntry={hoveredEntry}
      />
    </div>
  );
}