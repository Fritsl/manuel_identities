import { useMemo } from 'react';
import { ResumeEntry, Gap } from '../types/resume';

export function useTimelineCalculations(entries: ResumeEntry[]) {
  return useMemo(() => {
    // Calculate year range
    const start = Math.min(...entries.map(e => new Date(e.startDate).getFullYear()));
    const end = Math.max(...entries.map(e => 
      e.endDate === 'Present' 
        ? new Date().getFullYear() 
        : new Date(e.endDate).getFullYear()
    ));

    // Generate years array
    const years = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );

    // Sort entries
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    // Find gaps
    const gaps: Gap[] = [];
    for (let i = 0; i < sortedEntries.length - 1; i++) {
      const currentEnd = sortedEntries[i].endDate === 'Present' 
        ? new Date() 
        : new Date(sortedEntries[i].endDate);
      const nextStart = new Date(sortedEntries[i + 1].startDate);
      
      if (currentEnd < nextStart) {
        const durationMonths = Math.round(
          (nextStart.getTime() - currentEnd.getTime()) / (1000 * 60 * 60 * 24 * 30)
        );
        
        if (durationMonths > 1) {
          gaps.push({
            start: currentEnd,
            end: nextStart,
            durationMonths
          });
        }
      }
    }

    return {
      startYear: start,
      endYear: end,
      years,
      gaps,
      sortedEntries
    };
  }, [entries]);
}