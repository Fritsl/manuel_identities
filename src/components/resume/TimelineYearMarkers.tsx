import React from 'react';

interface TimelineYearMarkersProps {
  years: number[];
  visibleYears: number[];
}

export function TimelineYearMarkers({ years, visibleYears }: TimelineYearMarkersProps) {
  return (
    <div className="grid" style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}>
      {years.map(year => (
        <div key={year} className={`text-sm text-gray-600 text-center font-medium
          ${visibleYears.includes(year) ? '' : 'invisible'}`}>
          {year}
        </div>
      ))}
    </div>
  );
}