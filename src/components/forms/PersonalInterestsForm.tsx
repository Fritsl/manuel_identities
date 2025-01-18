import React, { useState } from 'react';
import { CompleteButton } from '../CompleteButton';
import { useProfile } from '../../contexts/ProfileContext';
import { Loader2 } from 'lucide-react';

interface PersonalInterestsFormData {
  hobbies: string;
  communities: string;
}

interface PersonalInterestsFormProps {
  data: PersonalInterestsFormData;
  onChange: (data: PersonalInterestsFormData) => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

export function PersonalInterestsForm({ data, onChange, onComplete, isCompleted }: PersonalInterestsFormProps) {
  const { handleComplete } = useProfile();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await handleComplete('personal-interests', onComplete);
    } catch (error) {
      console.error('Error saving personal interests:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const isValid = data.hobbies.trim() || data.communities.trim();

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border space-y-6">
        {/* Optional Fields Notice */}
        <div className="text-sm text-muted italic">
          These fields are optional. Feel free to share your interests and experiences, or skip if you prefer not to.
        </div>

        {/* Hobbies Section */}
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Hobbies & Passions (Optional)
          </label>
          <textarea
            value={data.hobbies}
            onChange={(e) => onChange({ ...data, hobbies: e.target.value })}
            placeholder="Photography, cooking exotic dishes, urban gardening..."
            className="w-full h-32 px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-foreground placeholder-muted resize-none"
          />
        </div>

        {/* Communities Section */}
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Community Involvement (Optional)
          </label>
          <textarea
            value={data.communities}
            onChange={(e) => onChange({ ...data, communities: e.target.value })}
            placeholder="Local sports team, book club, volunteer group..."
            className="w-full h-32 px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-foreground placeholder-muted resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <CompleteButton
          onComplete={handleSave}
          isCompleted={isCompleted}
          isDisabled={isSaving || !isValid}
        />
      </div>
    </div>
  );
}