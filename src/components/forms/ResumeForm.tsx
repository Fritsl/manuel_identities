import React, { useState } from 'react';
import { CompleteButton } from '../CompleteButton';
import { ResumeTimeline } from '../resume/ResumeTimeline';
import { TimelineChart } from '../resume/TimelineChart';
import { ResumeEntryForm } from '../resume/ResumeEntryForm';
import { ResumeEntry, ResumeData, initialResumeData } from '../../types/resume';
import { Clock, ListTodo } from 'lucide-react';

interface ResumeFormProps {
  data: { resume: string };
  onChange: (data: { resume: string }) => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

export function ResumeForm({ onComplete, isCompleted }: ResumeFormProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [editingEntry, setEditingEntry] = useState<ResumeEntry | null>(null);

  const handleEditEntry = (entry: ResumeEntry) => {
    setEditingEntry(entry);
  };

  const handleUpdateEntry = (updatedEntry: ResumeEntry) => {
    setResumeData(prev => ({
      ...prev,
      entries: prev.entries.map(entry =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    }));
  };

  const handleSaveEntry = () => {
    setEditingEntry(null);
  };

  return (
    <div className="space-y-8">
      {/* Visual Timeline Section */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 px-1">
          <Clock className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Career Timeline</h2>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
          <div className="min-w-[800px]">
            <TimelineChart entries={resumeData.entries} />
          </div>
        </div>
      </section>

      {/* Detailed Entries Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center space-x-2">
            <ListTodo className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Detailed Experience</h2>
          </div>
          <span className="text-sm text-gray-500">
            {resumeData.entries.length} {resumeData.entries.length === 1 ? 'Entry' : 'Entries'}
          </span>
        </div>
        <div className="bg-white rounded-lg border border-gray-200">
          <ResumeTimeline
            entries={resumeData.entries}
            onEdit={handleEditEntry}
          />
        </div>
      </section>

      {/* Edit Modal */}
      {editingEntry && (
        <ResumeEntryForm
          entry={editingEntry}
          onChange={handleUpdateEntry}
          onCancel={() => setEditingEntry(null)}
          onSave={handleSaveEntry}
        />
      )}

      {/* Complete Button */}
      <div className="flex justify-end pt-4">
        <CompleteButton
          onComplete={onComplete}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
}