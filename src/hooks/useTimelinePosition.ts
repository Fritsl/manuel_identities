import { useMemo } from 'react';

export function useTimelinePosition(
  startDate: string,
  endDate: string,
  startYear: number,
  years: number[]
) {
  return useMemo(() => {
    const start = new Date(startDate);
    const end = endDate === 'Present' ? new Date() : new Date(endDate);
    
    const totalMonths = years.length * 12;
    const startOffset = ((start.getFullYear() - startYear) * 12 + start.getMonth());
    const duration = ((end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth());
    
    const left = `${(startOffset / totalMonths) * 100}%`;
    const width = `${(duration / totalMonths) * 100}%`;
    
    return { left, width };
  }, [startDate, endDate, startYear, years.length]);
}