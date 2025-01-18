import React from 'react';
import { SearchHeader } from './SearchHeader';

interface SearchResultsProps<T> {
  title: string;
  subtitle: string;
  results: T[];
  renderItem: (item: T) => React.ReactNode;
  onFilter: () => void;
  onNewSearch: () => void;
}

export function SearchResults<T>({ 
  title,
  subtitle,
  results,
  renderItem,
  onFilter,
  onNewSearch
}: SearchResultsProps<T>) {
  return (
    <div className="space-y-6">
      <SearchHeader
        title={title}
        subtitle={subtitle}
        count={results.length}
        onFilter={onFilter}
        onNewSearch={onNewSearch}
      />
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index}>
            {renderItem(result)}
          </div>
        ))}
      </div>
    </div>
  );
}