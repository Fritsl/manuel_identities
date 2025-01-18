import React from 'react';

interface ProgressBarProps {
  progress: number;
  matchQuality: number;
}

export function ProgressBar({ progress, matchQuality }: ProgressBarProps) {
  // Don't render anything if progress is 100%
  if (progress === 100) {
    return null;
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex md:hidden justify-between text-sm text-foreground">
        <span>Profile Completion: {Math.round(progress)}%</span>
      </div>
      <div className="hidden md:flex md:justify-between text-sm text-foreground">
        <span>Profile Completion: {Math.round(progress)}%</span>
        <span>Match Quality: {Math.round(matchQuality)}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}