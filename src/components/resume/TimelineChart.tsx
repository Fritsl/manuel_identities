import React, { useState, useRef } from 'react';
import { ResumeEntry, Gap } from '../../types/resume';
import { TimelineYearMarkers } from './TimelineYearMarkers';
import { TimelineContainer } from './TimelineContainer';
import { TimelineLegend } from './TimelineLegend';
import { useTimelineCalculations } from '../../hooks/useTimelineCalculations';
import { useVisibleYears } from '../../hooks/useVisibleYears';

interface TimelineChartProps {
  entries: ResumeEntry[];
}

export function TimelineChart({ entries }: TimelineChartProps) {
  const [hoveredEntry, setHoveredEntry] = useState<ResumeEntry | null>(null);
  const [hoveredGap, setHoveredGap] = useState<Gap | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { startYear, endYear, years, gaps, sortedEntries } = useTimelineCalculations(entries);
  const visibleYears = useVisibleYears(containerRef, years, startYear, endYear);

  return (
    <div className="relative" ref={containerRef}>
      <TimelineYearMarkers years={years} visibleYears={visibleYears} />

      <TimelineContainer
        years={years}
        visibleYears={visibleYears}
        gaps={gaps}
        entries={sortedEntries}
        startYear={startYear}
        hoveredEntry={hoveredEntry}
        hoveredGap={hoveredGap}
        onEntryHover={setHoveredEntry}
        onGapHover={setHoveredGap}
      />

      <TimelineLegend />
    </div>
  );
}