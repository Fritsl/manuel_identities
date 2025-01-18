import React from 'react';
import { CompleteButton } from '../CompleteButton';
import { useProfile } from '../../contexts/ProfileContext';

interface LifeGoalsFormData {
  shortTerm: string;
  longTerm: string;
  impact: string;
}

interface LifeGoalsFormProps {
  data: LifeGoalsFormData;
  onChange: (data: LifeGoalsFormData) => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

export function LifeGoalsForm({ data, onChange, onComplete, isCompleted }: LifeGoalsFormProps) {
  const { handleComplete } = useProfile();

  const handleSave = async () => {
    await handleComplete('life-goals', onComplete);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border space-y-6">
        {/* Optional Fields Notice */}
        <div className="text-sm text-muted italic">
          These fields are optional. Feel free to share your career goals and aspirations, or skip if you prefer not to.
        </div>

        {/* Short-term Goals */}
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Short-term Career Goals (Optional)
          </label>
          <textarea
            value={data.shortTerm}
            onChange={(e) => onChange({ ...data, shortTerm: e.target.value })}
            placeholder="What do you want to achieve in the next few years?"
            className="w-full h-32 px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-foreground placeholder-muted resize-none"
          />
        </div>

        {/* Long-term Goals */}
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Long-term Career Goals (Optional)
          </label>
          <textarea
            value={data.longTerm}
            onChange={(e) => onChange({ ...data, longTerm: e.target.value })}
            placeholder="Where do you see yourself in 5+ years?"
            className="w-full h-32 px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-foreground placeholder-muted resize-none"
          />
        </div>

        {/* Desired Impact */}
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Desired Impact (Optional)
          </label>
          <textarea
            value={data.impact}
            onChange={(e) => onChange({ ...data, impact: e.target.value })}
            placeholder="What kind of impact do you want to make in your career?"
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