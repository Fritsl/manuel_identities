import React from 'react';
import { CompanySearchResults } from '../components/companies/CompanySearchResults';
import { mockCompanies } from '../types/companies';
import { ProgressBar } from '../components/ProgressBar';
import { useProfile } from '../contexts/ProfileContext';

export function CompanySearch() {
  const { progress, matchQuality } = useProfile();

  return (
    <div className="flex-1 flex justify-center">
      <div className="w-full max-w-3xl p-2 md:p-8 space-y-4 md:space-y-6 pt-2 md:pt-4">
        <ProgressBar progress={progress} matchQuality={matchQuality} />
        <CompanySearchResults companies={mockCompanies} />
      </div>
    </div>
  );
}