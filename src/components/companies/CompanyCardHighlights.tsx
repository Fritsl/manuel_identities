import React from 'react';

interface CompanyCardHighlightsProps {
  highlights: string[];
  culture: string[];
}

export function CompanyCardHighlights({ highlights, culture }: CompanyCardHighlightsProps) {
  return (
    <div className="mt-6 grid md:grid-cols-2 gap-4 md:gap-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Company Highlights</h3>
        <ul className="space-y-1">
          {highlights.map((highlight, index) => (
            <li key={index} className="text-sm text-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-foreground">Company Culture</h3>
        <ul className="space-y-1">
          {culture.map((item, index) => (
            <li key={index} className="text-sm text-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}