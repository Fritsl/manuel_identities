import React from 'react';
import { ResumeEntry } from '../../types/resume';

interface EntryTypeAndTitleProps {
  type: ResumeEntry['type'];
  title: string;
  onChange: (entry: ResumeEntry) => void;
  entry: ResumeEntry;
}

export function EntryTypeAndTitle({ type, title, onChange, entry }: EntryTypeAndTitleProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => onChange({ ...entry, type: e.target.value as ResumeEntry['type'] })}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="Work">Work</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChange({ ...entry, title: e.target.value })}
          placeholder="Position or Certification Title"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}