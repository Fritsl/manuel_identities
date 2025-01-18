import React from 'react';
import { TimelineGap } from './TimelineGap';
import { Gap } from '../../types/resume';

interface TimelineGapsProps {
  gaps: Gap[];
  startYear: number;
  years: number[];
  onGapHover: (gap: Gap | null) => void;
  hoveredGap: Gap | null;
}

export function TimelineGaps({
  gaps,
  startYear,
  years,
  onGapHover,
  hoveredGap
}: TimelineGapsProps) {
  return (
    <>
      {gaps.map((gap, index) => (
        <TimelineGap
          key={`gap-${index}`}
          gap={gap}
          startYear={startYear}
          years={years}
          onHover={onGapHover}
          hoveredGap={hoveredGap}
        />
      ))}
    </>
  );
}