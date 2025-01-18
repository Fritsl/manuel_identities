import React from 'react';
import { ResumeEntry } from '../../types/resume';

interface EntryOrganizationAndLocationProps {
  organization: string;
  location: string;
  onChange: (entry: ResumeEntry) => void;
  entry: ResumeEntry;
}

export function EntryOrganizationAndLocation({
  organization,
  location,
  onChange,
  entry
}: EntryOrganizationAndLocationProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
        <input
          type="text"
          value={organization}
          onChange={(e) => onChange({ ...entry, organization: e.target.value })}
          placeholder="Company or Institution Name"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => onChange({ ...entry, location: e.target.value })}
          placeholder="City, State or Remote"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}