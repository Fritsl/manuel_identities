import React from 'react';
import { FormPage } from '../types';
import { CheckCircle, Circle } from 'lucide-react';
import { MatchQualityIndicator } from './MatchQualityIndicator';

interface NavigationProps {
  pages: FormPage[];
  currentPageId: string;
  onPageSelect: (pageId: string) => void;
  matchQuality: number;
  remainingPages: number;
}

export function Navigation({ pages, currentPageId, onPageSelect, matchQuality, remainingPages }: NavigationProps) {
  return (
    <div className="h-full flex flex-col p-4 space-y-6 overflow-y-auto">
      {/* Desktop Match Quality Indicator */}
      <div className="hidden md:block">
        <MatchQualityIndicator
          matchQuality={matchQuality}
          remainingPages={remainingPages}
        />
      </div>

      {/* Navigation Items */}
      <div className="space-y-1 pb-4">
        {pages.map(page => (
          <button
            key={page.id}
            onClick={() => onPageSelect(page.id)}
            className={`w-full flex items-center p-2 rounded-lg text-left space-x-2 transition-colors
              ${currentPageId === page.id 
                ? 'bg-primary text-primary-foreground' 
                : 'text-foreground hover:bg-secondary hover:text-secondary-foreground'}`}
          >
            {page.isCompleted ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm">{page.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}