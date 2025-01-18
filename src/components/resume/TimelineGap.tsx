import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Gap {
  start: Date;
  end: Date;
  durationMonths: number;
}

interface TimelineGapProps {
  gap: Gap;
  startYear: number;
  years: number[];
  onHover: (gap: Gap | null) => void;
  hoveredGap: Gap | null;
}

export function TimelineGap({
  gap,
  startYear,
  years,
  onHover,
  hoveredGap
}: TimelineGapProps) {
  const calculateTimelinePosition = (start: Date, end: Date) => {
    const totalMonths = (years.length) * 12;
    const startOffset = ((start.getFullYear() - startYear) * 12 + start.getMonth());
    const duration = ((end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth());
    
    const left = `${(startOffset / totalMonths) * 100}%`;
    const width = `${(duration / totalMonths) * 100}%`;
    
    return { left, width };
  };

  const { left, width } = calculateTimelinePosition(gap.start, gap.end);

  return (
    <div
      className="relative h-6"
      onMouseEnter={() => onHover(gap)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        style={{ left, width }}
        className="absolute h-full bg-red-100 border-2 border-dashed border-red-300 
          opacity-80 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
      >
        <AlertCircle className="w-4 h-4 text-red-500" />
      </div>
      
      {hoveredGap === gap && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 bg-white p-2 rounded-md 
          shadow-lg border border-gray-200 z-10 w-48">
          <div className="text-xs font-medium text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Gap in Timeline
          </div>
          <div className="text-xs text-gray-600">
            {gap.start.toLocaleDateString(undefined, { 
              year: 'numeric',
              month: 'short'
            })} - {gap.end.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short'
            })}
          </div>
          <div className="text-xs text-gray-500">
            Duration: {gap.durationMonths} months
          </div>
        </div>
      )}
    </div>
  );
}