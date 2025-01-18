import React from 'react';
import { ResumeEntry } from '../../types/resume';
import { TimelineEntryTooltip } from './TimelineEntryTooltip';
import { useTimelinePosition } from '../../hooks/useTimelinePosition';
import { getEntryColor } from '../../utils/timeline';

interface TimelineEntryProps {
  entry: ResumeEntry;
  startYear: number;
  years: number[];
  onHover: (entry: ResumeEntry | null) => void;
  hoveredEntry: ResumeEntry | null;
}

export function TimelineEntry({
  entry,
  startYear,
  years,
  onHover,
  hoveredEntry
}: TimelineEntryProps) {
  const { left, width } = useTimelinePosition(
    entry.startDate,
    entry.endDate,
    startYear,
    years
  );

  return (
    <div
      className="relative h-6"
      onMouseEnter={() => onHover(entry)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        style={{ left, width }}
        className={`absolute h-full rounded-md ${getEntryColor(entry.type)} 
          opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
      />
      
      {hoveredEntry?.id === entry.id && (
        <TimelineEntryTooltip entry={entry} />
      )}
    </div>
  );
}