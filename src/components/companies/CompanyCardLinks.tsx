import React from 'react';
import { Globe, Building, ExternalLink } from 'lucide-react';

interface CompanyCardLinksProps {
  website: string;
  careerPage: string;
  onViewDetails: () => void;
}

export function CompanyCardLinks({ website, careerPage, onViewDetails }: CompanyCardLinksProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/90"
      >
        <Globe className="w-4 h-4" />
        Website
        <ExternalLink className="w-3 h-3" />
      </a>
      <a
        href={careerPage}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/90"
      >
        <Building className="w-4 h-4" />
        Careers
        <ExternalLink className="w-3 h-3" />
      </a>
      <button
        onClick={onViewDetails}
        className="flex-1 md:flex-none bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-sm"
      >
        View full details
      </button>
    </div>
  );
}