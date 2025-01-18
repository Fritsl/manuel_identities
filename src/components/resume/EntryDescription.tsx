import React from 'react';
import { ResumeEntry } from '../../types/resume';

interface EntryDescriptionProps {
  description: string[];
  onChange: (entry: ResumeEntry) => void;
  entry: ResumeEntry;
}

export function EntryDescription({ description, onChange, entry }: EntryDescriptionProps) {
  const handleDescriptionChange = (index: number, value: string) => {
    const newDescription = [...description];
    newDescription[index] = value;
    onChange({ ...entry, description: newDescription });
  };

  const addDescriptionField = () => {
    onChange({ ...entry, description: [...description, ''] });
  };

  const removeDescriptionField = (index: number) => {
    const newDescription = description.filter((_, i) => i !== index);
    onChange({ ...entry, description: newDescription });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <button
          type="button"
          onClick={addDescriptionField}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          + Add Point
        </button>
      </div>
      <div className="space-y-2">
        {description.map((desc, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={desc}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              placeholder={`Achievement or responsibility ${index + 1}`}
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {description.length > 1 && (
              <button
                type="button"
                onClick={() => removeDescriptionField(index)}
                className="px-2 py-1 text-red-600 hover:text-red-700"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}