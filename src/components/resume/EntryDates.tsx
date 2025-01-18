import React, { useState } from 'react';
import { ResumeEntry } from '../../types/resume';
import { DateSelector } from './DateSelector';

interface EntryDatesProps {
  startDate: string;
  endDate: string;
  onChange: (entry: ResumeEntry) => void;
  entry: ResumeEntry;
}

export function EntryDates({ startDate, endDate, onChange, entry }: EntryDatesProps) {
  const [dateError, setDateError] = useState<string | null>(null);

  const handleStartDateChange = (value: string) => {
    if (endDate !== 'Present' && value > endDate) {
      setDateError('Start date cannot be after end date');
      return;
    }
    setDateError(null);
    onChange({ ...entry, startDate: value });
  };

  const handleEndDateChange = (value: string) => {
    if (value < startDate) {
      setDateError('End date cannot be before start date');
      return;
    }
    setDateError(null);
    onChange({ ...entry, endDate: value });
  };

  const handlePresentToggle = (checked: boolean) => {
    onChange({ ...entry, endDate: checked ? 'Present' : '' });
    setDateError(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <DateSelector
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          max={endDate === 'Present' ? undefined : endDate}
        />
        
        <DateSelector
          label="End Date"
          value={endDate === 'Present' ? '' : endDate}
          onChange={handleEndDateChange}
          isEndDate
          onPresentToggle={handlePresentToggle}
          isPresent={endDate === 'Present'}
        />
      </div>
      
      {dateError && (
        <p className="text-sm text-red-600">{dateError}</p>
      )}
    </div>
  );
}