import React from 'react';
import { CompanyCard } from './CompanyCard';
import { Company } from '../../types/companies';
import { SearchResults } from '../search/SearchResults';

interface CompanySearchResultsProps {
  companies: Company[];
}

export function CompanySearchResults({ companies }: CompanySearchResultsProps) {
  const handleFilter = () => {
    // Implement company filtering
    console.log('Filter companies');
  };

  const handleNewSearch = () => {
    // Implement new company search
    console.log('New company search');
  };

  return (
    <SearchResults
      title="Company Matches"
      subtitle="Found companies that match your profile:"
      results={companies}
      renderItem={(company) => <CompanyCard key={company.id} company={company} />}
      onFilter={handleFilter}
      onNewSearch={handleNewSearch}
    />
  );
}