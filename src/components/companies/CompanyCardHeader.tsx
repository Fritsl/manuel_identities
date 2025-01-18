import React from 'react';
import { Building, MapPin, Users } from 'lucide-react';

interface CompanyCardHeaderProps {
  name: string;
  industry: string;
  location: string;
  size: string;
  matchScore: number;
}

export function CompanyCardHeader({ name, industry, location, size, matchScore }: CompanyCardHeaderProps) {
  return (
    <div className="flex justify-between items-start gap-4">
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-semibold text-foreground">{name}</h2>
        <div className="flex flex-wrap gap-3 text-sm text-muted">
          <div className="flex items-center gap-1">
            <Building className="w-4 h-4" />
            <span>{industry}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{size}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-lg font-bold text-foreground">
          {matchScore}%
        </div>
        <div className="text-xs text-muted">Match Score</div>
      </div>
    </div>
  );
}