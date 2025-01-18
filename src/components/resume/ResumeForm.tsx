import React, { useState } from 'react';
import { CompleteButton } from '../CompleteButton';
import { ResumeFormHeader } from './ResumeFormHeader';
import { ResumeFormTabs } from './ResumeFormTabs';
import { ResumeFormContent } from './ResumeFormContent';
import { ResumeEntryForm } from './ResumeEntryForm';
import { ResumeEntry, ResumeData, initialResumeData } from '../../types/resume';
import { useProfile } from '../../contexts/ProfileContext';

interface ResumeFormProps {
  data: { resume: string };
  onChange: (data: { resume: string }) => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

export function ResumeForm({ onComplete, isCompleted }: ResumeFormProps) {
  const { handleComplete } = useProfile();
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [editingEntry, setEditingEntry] = useState<ResumeEntry | null>(null);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'upload'>('manual');

  const handleEditEntry = (entry: ResumeEntry) => {
    setEditingEntry(entry);
    setIsNewEntry(false);
  };

  const handleUpdateEntry = (updatedEntry: ResumeEntry) => {
    setResumeData(prev => ({
      ...prev,
      entries: isNewEntry 
        ? [...prev.entries, updatedEntry]
        : prev.entries.map(entry =>
            entry.id === updatedEntry.id ? updatedEntry : entry
          )
    }));
  };

  const handleSaveEntry = () => {
    setEditingEntry(null);
    setIsNewEntry(false);
  };

  const handleDeleteEntry = (entryId: string) => {
    setResumeData(prev => ({
      ...prev,
      entries: prev.entries.filter(entry => entry.id !== entryId)
    }));
  };

  const handleSave = async () => {
    await handleComplete('resume', onComplete);
  };

  return (
    <div className="space-y-8">
      <ResumeFormHeader entries={resumeData.entries} />
      <ResumeFormTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <ResumeFormContent
        activeTab={activeTab}
        resumeData={resumeData}
        setResumeData={setResumeData}
        onEditEntry={handleEditEntry}
        onDeleteEntry={handleDeleteEntry}
      />

      {editingEntry && (
        <ResumeEntryForm
          entry={editingEntry}
          onChange={handleUpdateEntry}
          onCancel={() => {
            setEditingEntry(null);
            setIsNewEntry(false);
          }}
          onSave={handleSaveEntry}
          isNew={isNewEntry}
        />
      )}

      <div className="flex justify-end pt-2 md:pt-4">
        <CompleteButton
          onComplete={handleSave}
          isCompleted={isCompleted}
          isDisabled={resumeData.entries.length === 0}
        />
      </div>
    </div>
  );
}