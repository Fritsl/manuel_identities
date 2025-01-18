import React from 'react';
import { JobMatch } from '../../types/jobs';
import { JobCardHeader } from './JobCardHeader';
import { JobCardDescription } from './JobCardDescription';
import { JobCardProsAndCons } from './JobCardProsAndCons';
import { JobCardAction } from './JobCardAction';

interface JobCardProps {
  job: JobMatch;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/30 transition-colors">
      <div className="p-4 md:p-6 space-y-4">
        <JobCardHeader
          title={job.title}
          company={job.company}
          location={job.location}
          salary={job.salary}
          type={job.type}
          matchScore={job.matchScore}
        />

        <JobCardDescription description={job.description} />
        
        <JobCardProsAndCons pros={job.pros} cons={job.cons} />
        
        <JobCardAction
          onViewDetails={() => job.onViewDetails(job.id)}
          credits={job.credits}
        />
      </div>
    </div>
  );
}