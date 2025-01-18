import React from 'react';
import { MapPin, Building, DollarSign, Clock } from 'lucide-react';

interface JobCardHeaderProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  matchScore: number;
}

export function JobCardHeader({ title, company, location, salary, type, matchScore }: JobCardHeaderProps) {
  return (
    <div className="flex justify-between items-start gap-4">
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-semibold text-foreground">{title}</h2>
        <div className="flex flex-wrap gap-3 text-sm text-muted">
          <div className="flex items-center gap-1">
            <Building className="w-4 h-4" />
            <span>{company}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{salary}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{type}</span>
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