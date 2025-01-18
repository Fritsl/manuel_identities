import React from 'react';
import { ResumeEntry } from '../../types/resume';

interface TimelineChartEntryProps {
  entry: ResumeEntry;
  startYear: number;
  years: number[];
  onHover: (entry: ResumeEntry | null) => void;
  hoveredEntry: ResumeEntry | null;
}

export function TimelineChartEntry({
  entry,
  startYear,
  years,
  onHover,
  hoveredEntry
}: TimelineChartEntryProps) {
  const calculateTimelinePosition = (start: Date, end: Date) => {
    const totalMonths = (years.length) * 12;
    const startOffset = ((start.getFullYear() - startYear) * 12 + start.getMonth());
    const duration = ((end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth());
    
    const left = `${(startOffset / totalMonths) * 100}%`;
    const width = `${(duration / totalMonths) * 100}%`;
    
    return { left, width };
  };

  const getEntryColor = (type: ResumeEntry['type']) => {
    switch (type) {
      case 'Work':
        return 'bg-blue-500';
      case 'Education':
        return 'bg-green-500';
      case 'Other':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const start = new Date(entry.startDate);
  const end = entry.endDate === 'Present' ? new Date() : new Date(entry.endDate);
  const { left, width } = calculateTimelinePosition(start, end);

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
        <div className="absolute left-1/2 -translate-x-1/2 -top-12 bg-white p-2 rounded-md 
          shadow-lg border border-gray-200 z-10 w-48">
          <div className="text-xs font-medium text-gray-900 truncate">{entry.title}</div>
          <div className="text-xs text-gray-600 truncate">{entry.organization}</div>
          <div className="text-xs text-gray-500">
            {new Date(entry.startDate).toLocaleDateString(undefined, { 
              year: 'numeric',
              month: 'short'
            })} - {
              entry.endDate === 'Present' 
                ? 'Present' 
                : new Date(entry.endDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short'
                  })
            }
          </div>
        </div>
      )}
    </div>
  );
}