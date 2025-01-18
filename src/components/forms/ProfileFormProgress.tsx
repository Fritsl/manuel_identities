import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ProgressBar } from '../ProgressBar';

interface ProfileFormProgressProps {
  progress: number;
  matchQuality: number;
  onRefresh: () => void;
  isRefreshing: boolean;
  completedPages: Set<string>;
}

export function ProfileFormProgress({
  progress,
  matchQuality,
  onRefresh,
  isRefreshing,
  completedPages
}: ProfileFormProgressProps) {
  return (
    <div className="flex items-center justify-between">
      <ProgressBar
        progress={progress}
        matchQuality={matchQuality}
      />
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        title={`Debug: Completed Pages (${completedPages.size}): ${Array.from(completedPages).join(', ')}`}
      >
        <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        <span>
          {`Debug: ${completedPages.size} completed`}
        </span>
      </button>
    </div>
  );
}