import React from 'react';
import { ResumeEntry } from '../../types/resume';

interface EntrySkillsProps {
  skills?: string[];
  onChange: (entry: ResumeEntry) => void;
  entry: ResumeEntry;
}

export function EntrySkills({ skills, onChange, entry }: EntrySkillsProps) {
  const handleSkillsChange = (skillsString: string) => {
    const newSkills = skillsString.split(',').map(s => s.trim()).filter(Boolean);
    onChange({ ...entry, skills: newSkills });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Skills (comma-separated)
      </label>
      <input
        type="text"
        value={skills?.join(', ') || ''}
        onChange={(e) => handleSkillsChange(e.target.value)}
        placeholder="React, TypeScript, Node.js"
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );
}