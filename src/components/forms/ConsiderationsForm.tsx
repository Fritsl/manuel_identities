import React from 'react';
import { CompleteButton } from '../CompleteButton';
import { useProfile } from '../../contexts/ProfileContext';

interface ConsiderationsFormData {
  dealBreakers: string;
  challengesNeeds: string;
}

interface ConsiderationsFormProps {
  data: ConsiderationsFormData;
  onChange: (data: ConsiderationsFormData) => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

export function ConsiderationsForm({ data, onChange, onComplete, isCompleted }: ConsiderationsFormProps) {
  const { handleComplete } = useProfile();

  const handleSave = async () => {
    await handleComplete('considerations', onComplete);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border space-y-6">
        {/* Optional Fields Notice */}
        <div className="text-sm text-muted italic">
          These fields are optional. Feel free to share any concerns or special needs, or skip if none apply.
        </div>

        {/* Deal Breakers */}
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Deal Breakers (Optional)
          </label>
          <textarea
            value={data.dealBreakers}
            onChange={(e) => onChange({ ...data, dealBreakers: e.target.value })}
            placeholder="What would make you decline a job opportunity?"
            className="w-full h-32 px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-foreground placeholder-muted resize-none"
          />
        </div>

        {/* Challenges and Needs */}
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Challenges and special needs? (Optional)
          </label>
          <textarea
            value={data.challengesNeeds}
            onChange={(e) => onChange({ ...data, challengesNeeds: e.target.value })}
            placeholder="Share any challenges you face or special accommodations you need in the workplace..."
            className="w-full h-32 px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-foreground placeholder-muted resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <CompleteButton
          onComplete={handleSave}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
}