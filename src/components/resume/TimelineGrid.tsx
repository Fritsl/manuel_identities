import React from 'react';

interface TimelineGridProps {
  years: number[];
  visibleYears: number[];
}

export function TimelineGrid({ years, visibleYears }: TimelineGridProps) {
  return (
    <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${years.length}, minmax(0, 1fr))` }}>
      {years.map(year => (
        <div key={year} className={`border-l border-gray-200 h-full
          ${visibleYears.includes(year) ? 'border-opacity-100' : 'border-opacity-50'}`} />
      ))}
      <div className="border-l border-gray-200 h-full" />
    </div>
  );
}