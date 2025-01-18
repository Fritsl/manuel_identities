import React from 'react';
import { Clock, ListTodo } from 'lucide-react';
import { ResumeEntry } from '../../types/resume';

interface ResumeFormHeaderProps {
  entries: ResumeEntry[];
}

export function ResumeFormHeader({ entries }: ResumeFormHeaderProps) {
  return (
    <>
      <section className="space-y-4">
        <div className="flex items-center space-x-2 px-1">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Career Timeline</h2>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <div className="min-w-[800px]">
            <TimelineChart entries={entries} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center space-x-2">
            <ListTodo className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">Detailed Experience</h2>
          </div>
          <span className="text-sm text-gray-500">
            {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
          </span>
        </div>
      </section>
    </>
  );
}