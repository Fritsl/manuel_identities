import React from 'react';
import { ResumeEntry } from '../../types/resume';
import { EntryTypeAndTitle } from './EntryTypeAndTitle';
import { EntryOrganizationAndLocation } from './EntryOrganizationAndLocation';
import { EntryDates } from './EntryDates';
import { EntryDescription } from './EntryDescription';
import { EntrySkills } from './EntrySkills';

interface ResumeEntryFormFieldsProps {
  entry: ResumeEntry;
  onChange: (entry: ResumeEntry) => void;
}

export function ResumeEntryFormFields({ entry, onChange }: ResumeEntryFormFieldsProps) {
  return (
    <div className="space-y-6">
      <EntryTypeAndTitle
        type={entry.type}
        title={entry.title}
        onChange={onChange}
        entry={entry}
      />

      <EntryOrganizationAndLocation
        organization={entry.organization}
        location={entry.location}
        onChange={onChange}
        entry={entry}
      />

      <EntryDates
        startDate={entry.startDate}
        endDate={entry.endDate}
        onChange={onChange}
        entry={entry}
      />

      <EntryDescription
        description={entry.description}
        onChange={onChange}
        entry={entry}
      />

      {entry.type === 'Work' && (
        <EntrySkills
          skills={entry.skills}
          onChange={onChange}
          entry={entry}
        />
      )}
    </div>
  );
}