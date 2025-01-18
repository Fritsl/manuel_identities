import React from 'react';
import { CompleteButton } from '../CompleteButton';
import { useProfile } from '../../contexts/ProfileContext';

interface LocationFormData {
  preferredLocations: string;
  remotePreference: 'remote' | 'hybrid' | 'office';
  relocationWillingness: boolean;
  travelPreference: 'none' | 'minimal' | 'moderate' | 'frequent';
  additionalNotes: string;
}

interface LocationFormProps {
  data: LocationFormData;
  onChange: (data: LocationFormData) => void;
  onComplete: () => void;
  isCompleted?: boolean;
}

export function LocationForm({ data, onChange, onComplete, isCompleted }: LocationFormProps) {
  const { handleComplete } = useProfile();

  const handleSave = async () => {
    await handleComplete('location', onComplete);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border space-y-6">
        {/* Preferred Locations */}
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Preferred Locations
          </label>
          <textarea
            value={data.preferredLocations}
            onChange={(e) => onChange({ ...data, preferredLocations: e.target.value })}
            placeholder="List your preferred cities, regions, or countries..."
            className="w-full h-32 px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-shadow text-foreground placeholder-muted resize-none"
          />
        </div>

        {/* Remote Work Preference */}
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Remote Work Preference
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {['remote', 'hybrid', 'office'].map(option => (
              <button
                key={option}
                onClick={() => onChange({ ...data, remotePreference: option as LocationFormData['remotePreference'] })}
                className={`px-4 py-2 rounded-lg border ${
                  data.remotePreference === option
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-border hover:border-primary'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Relocation Willingness */}
        <div className="space-y-3">
          <label className="block text-foreground flex items-center space-x-2">
            <input
              type="checkbox"
              checked={data.relocationWillingness}
              onChange={(e) => onChange({ ...data, relocationWillingness: e.target.checked })}
              className="rounded border-input text-primary focus:ring-primary"
            />
            <span>Willing to relocate for the right opportunity</span>
          </label>
        </div>

        {/* Travel Preference */}
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Travel Preference
          </label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {['none', 'minimal', 'moderate', 'frequent'].map(option => (
              <button
                key={option}
                onClick={() => onChange({ ...data, travelPreference: option as LocationFormData['travelPreference'] })}
                className={`px-4 py-2 rounded-lg border ${
                  data.travelPreference === option
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-border hover:border-primary'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-3">
          <label className="block text-foreground font-medium">
            Additional Location Preferences
          </label>
          <textarea
            value={data.additionalNotes}
            onChange={(e) => onChange({ ...data, additionalNotes: e.target.value })}
            placeholder="Any other location-related preferences or requirements..."
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