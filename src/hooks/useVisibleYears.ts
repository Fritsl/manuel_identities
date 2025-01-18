import { useState, useEffect, RefObject } from 'react';

export function useVisibleYears(
  containerRef: RefObject<HTMLDivElement>,
  years: number[],
  startYear: number,
  endYear: number
) {
  const [visibleYears, setVisibleYears] = useState<number[]>([]);

  useEffect(() => {
    const calculateVisibleYears = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const minWidthPerYear = 60; // Minimum width in pixels needed to show a year
      const totalYears = years.length;
      const maxVisibleYears = Math.floor(containerWidth / minWidthPerYear);
      
      if (maxVisibleYears >= totalYears) {
        setVisibleYears(years);
      } else {
        const step = Math.ceil(totalYears / maxVisibleYears);
        const filtered = years.filter((_, index) => index % step === 0);
        
        if (!filtered.includes(startYear)) {
          filtered.unshift(startYear);
        }
        if (!filtered.includes(endYear)) {
          filtered.push(endYear);
        }
        
        setVisibleYears(filtered);
      }
    };

    calculateVisibleYears();
    
    const resizeObserver = new ResizeObserver(calculateVisibleYears);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [years, startYear, endYear]);

  return visibleYears;
}