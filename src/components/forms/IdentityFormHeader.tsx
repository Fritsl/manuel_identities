import React from 'react';
import { Menu, Search, RefreshCw } from 'lucide-react';

interface ProfileFormHeaderProps {
  title: string;
  onToggleNav: () => void;
  onRefresh: () => void;
  onSearch: () => void;
  isRefreshing: boolean;
  isSearchDisabled: boolean;
  completedPages: Set<string>;
  matchQuality: number;
}

export function ProfileFormHeader({
  title,
  onToggleNav,
  onRefresh,
  onSearch,
  isRefreshing,
  isSearchDisabled,
  completedPages,
  matchQuality
}: ProfileFormHeaderProps) {
  return (
    <div className="md:hidden bg-card border-b border-border px-3 py-2 flex items-center justify-between">
      <button
        onClick={onToggleNav}
        className="p-1.5 hover:bg-muted/10 rounded-lg"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>
      <h1 className="text-base font-semibold text-foreground">
        {title}
      </h1>
      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1.5 rounded-lg text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
          title={`Debug: Completed Pages (${completedPages.size}): ${Array.from(completedPages).join(', ')}`}
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
        <button
          onClick={onSearch}
          disabled={isSearchDisabled}
          className={`p-1.5 rounded-lg flex items-center justify-center
            ${isSearchDisabled
              ? 'text-muted cursor-not-allowed'
              : 'text-primary hover:bg-primary/10'}`}
          title={`Debug: Match Quality ${matchQuality}%`}
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}