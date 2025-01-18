import React from 'react';
import { NewResumeEntryButton } from './NewResumeEntryButton';
import { PDFUploadForm } from './PDFUploadForm';
import { ResumeTimeline } from './ResumeTimeline';
import { ResumeData, ResumeEntry } from '../../types/resume';

interface ResumeFormContentProps {
  activeTab: 'manual' | 'upload';
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  onEditEntry: (entry: ResumeEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

export function ResumeFormContent({
  activeTab,
  resumeData,
  setResumeData,
  onEditEntry,
  onDeleteEntry
}: ResumeFormContentProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 space-y-6">
        <div className="border-t border-gray-200 pt-6 space-y-6">
          {activeTab === 'manual' ? (
            <NewResumeEntryButton onClick={() => {
              const newEntry: ResumeEntry = {
                id: crypto.randomUUID(),
                type: 'Work',
                title: '',
                organization: '',
                location: '',
                startDate: new Date().toISOString().slice(0, 7),
                endDate: 'Present',
                description: [''],
                skills: []
              };
              onEditEntry(newEntry);
            }} />
          ) : (
            <PDFUploadForm onDataExtracted={setResumeData} />
          )}

          {resumeData.entries.length > 0 && (
            <div>
              <div className="mb-4">
                <h3 className="text-base font-medium text-gray-900">Current Entries</h3>
                <p className="text-sm text-gray-500">
                  {activeTab === 'upload' 
                    ? 'These entries will be updated when you upload a PDF'
                    : 'Click an entry to edit or add a new entry above'}
                </p>
              </div>
              <ResumeTimeline
                entries={resumeData.entries}
                onEdit={onEditEntry}
                onDelete={onDeleteEntry}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}