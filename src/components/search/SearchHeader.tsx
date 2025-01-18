import React from 'react';
import { Search } from 'lucide-react';

interface SearchHeaderProps {
  title: string;
  subtitle: string;
  count: number;
  onFilter: () => void;
  onNewSearch: () => void;
}

export function SearchHeader({ title, subtitle, count, onFilter, onNewSearch }: SearchHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">{title}</h1>
        <p className="text-sm text-muted mt-1">
          {subtitle} {count}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          className="px-4 py-2 text-sm font-medium text-muted bg-card border border-border rounded-lg hover:bg-muted/10"
          onClick={onFilter}
        >
          Filter
        </button>
        <button 
          className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 flex items-center gap-2"
          onClick={onNewSearch}
        >
          <Search className="w-4 h-4" />
          New Search
        </button>
      </div>
    </div>
  );
}