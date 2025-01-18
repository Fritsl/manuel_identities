import React from 'react';
import { TimelineGrid } from './TimelineGrid';
import { TimelineGapsAndEntries } from './TimelineGapsAndEntries';
import { Gap, ResumeEntry } from '../../types/resume';

interface TimelineContainerProps {
  years: number[];
  visibleYears: number[];
  gaps: Gap[];
  entries: ResumeEntry[];
  startYear: number;
  hoveredEntry: ResumeEntry | null;
  hoveredGap: Gap | null;
  onEntryHover: (entry: ResumeEntry | null) => void;
  onGapHover: (gap: Gap | null) => void;
}

export function TimelineContainer({
  years,
  visibleYears,
  gaps,
  entries,
  startYear,
  hoveredEntry,
  hoveredGap,
  onEntryHover,
  onGapHover
}: TimelineContainerProps) {
  return (
    <div className="relative border-t border-b border-gray-200 py-3 min-h-[120px]">
      <TimelineGrid years={years} visibleYears={visibleYears} />
      <TimelineGapsAndEntries
        gaps={gaps}
        entries={entries}
        startYear={startYear}
        years={years}
        hoveredEntry={hoveredEntry}
        hoveredGap={hoveredGap}
        onEntryHover={onEntryHover}
        onGapHover={onGapHover}
      />
    </div>
  );
}