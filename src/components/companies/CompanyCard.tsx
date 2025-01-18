import React from 'react';
import { Company } from '../../types/companies';
import { CompanyCardHeader } from './CompanyCardHeader';
import { CompanyCardDescription } from './CompanyCardDescription';
import { CompanyCardHighlights } from './CompanyCardHighlights';
import { CompanyCardLinks } from './CompanyCardLinks';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/30 transition-colors">
      <div className="p-4 md:p-6">
        <CompanyCardHeader
          name={company.name}
          industry={company.industry}
          location={company.location}
          size={company.size}
          matchScore={company.matchScore}
        />

        <CompanyCardDescription description={company.description} />
        
        <CompanyCardHighlights
          highlights={company.highlights}
          culture={company.culture}
        />
        
        <CompanyCardLinks
          website={company.website}
          careerPage={company.careerPage}
          onViewDetails={() => company.onViewDetails(company.id)}
        />
      </div>
    </div>
  );
}