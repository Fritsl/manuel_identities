import React from 'react';
import { JobCard } from './JobCard';
import { JobMatch } from '../../types/jobs';
import { SearchResults } from '../search/SearchResults';

interface JobSearchResultsProps {
  jobs: JobMatch[];
}

export function JobSearchResults({ jobs }: JobSearchResultsProps) {
  const handleFilter = () => {
    // Implement job filtering
    console.log('Filter jobs');
  };

  const handleNewSearch = () => {
    // Implement new job search
    console.log('New job search');
  };

  return (
    <SearchResults
      title="Job Matches"
      subtitle="Found matches based on your profile:"
      results={jobs}
      renderItem={(job) => <JobCard key={job.id} job={job} />}
      onFilter={handleFilter}
      onNewSearch={handleNewSearch}
    />
  );
}